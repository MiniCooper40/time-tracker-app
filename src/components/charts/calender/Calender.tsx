import {
    Gesture,
    GestureDetector,
    GestureStateChangeEvent,
    LongPressGestureHandlerEventPayload
} from "react-native-gesture-handler";
import {View} from "tamagui";
import {Canvas, Group, Rect, Text, useFont} from "@shopify/react-native-skia";
import {useMemo, useState} from "react";
import {LayoutChangeEvent} from "react-native";
import {daysInMonth, firstDayOfMonth, weeksInMonth} from "@/src/util/time";
import star from "react-native-ratings/src/components/Star";
import {SkTooltip} from "@/src/components/charts/SkTooltip";

interface CalenderProps {
    year: number;
    month: number;
    weights?: number[];
    dayPadding?: number,
    height?: number;
    width?: number;
    dayHeight?: number;
    startDay?: number;
    labelPadding?: number;
}

const labelForDayOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

const Calender = ({
                      year,
                      month,
                      weights,
                      dayPadding = 3,
                      width = 300,
                      dayHeight = 40,
                      startDay = 2,
                      labelPadding = 6
                  }: CalenderProps) => {

    const tooltipTitleFont = useFont(require("../../../../assets/fonts/Raleway/Raleway-Bold.ttf"), 16)
    const labelFont = useFont(require("../../../../assets/fonts/SourceSans/SourceSansPro-Semibold.otf"), 12)
    const tooltipBodyFont = useFont(require("../../../../assets/fonts/SourceSans/SourceSansPro-Light.otf"), 14)

    const [layout, setLayout] = useState<{ width: number, height: number }>({width: 0, height: 0})
    const updateCanvasDimensions = (e: LayoutChangeEvent) => {
        const {width, height} = e.nativeEvent.layout
        setLayout({width, height})
    }

    // const weeks = weeksInMonth(year, month)
    const days = daysInMonth(year, month)
    const firstDay = firstDayOfMonth(year, month)
    const startDayOffset = (6 - (startDay - firstDay)) % 7
    const weeks = Math.ceil((startDayOffset + days) / 7)
    const dayLabels = new Array(7).fill(0).map((_, i) => labelForDayOfWeek[(i + startDayOffset) % 7])

    const calenderHeight = (weeks) * (dayPadding + dayHeight)
    const canvasHeight = calenderHeight + labelPadding + 20
    const [selectedDay, setSelectedDay] = useState<{ x: number, y: number, height: number, width: number }>()
    console.log({weeks})


    const dayWidth = useMemo(() => {
        return (layout.width - dayPadding * 6) / 7
    }, [layout.width, dayPadding])

    const daysInWeeksOfMonth = useMemo(() => {
        return new Array(days).fill(0).map((_, i) => ({
            day: (startDayOffset + i) % 7,
            week: Math.floor((i + startDayOffset) / 7)
        }))
    }, [startDay, month, year])

    console.log({daysInWeeksOfMonth})

    const dayPositions = useMemo(() => {
        return daysInWeeksOfMonth.map(({day, week}) => ({
            width: dayWidth,
            height: dayHeight,
            x: (dayWidth + dayPadding) * day,
            y: (dayHeight + dayPadding) * (week),
            key: `${week}-${day}`
        }))
    }, [dayWidth, dayHeight, dayPadding, weeks, daysInWeeksOfMonth])

    const labelPositions = useMemo(() => {
        if (!labelFont) return []
        return dayLabels.map((label, i) => {
            const labelRect = labelFont.measureText(label)
            const dayCenter = dayPositions[i].x + dayPositions[i].width / 2
            return {
                x: dayCenter - labelRect.width / 2,
                y: calenderHeight + labelPadding + labelRect.height
            }
        })
    }, [dayPositions, labelFont])

    console.log({labelPositions})

    console.log({dayPositions})

    const handleTouchEnd = () => setSelectedDay(undefined)
    const handlePress = (event: GestureStateChangeEvent<LongPressGestureHandlerEventPayload>) => {
        const {x: clickX, y: clickY} = event
        dayPositions.forEach((position) => {
            const {x, y, width, height} = position
            if (x <= clickX && x + width >= clickX && y <= clickY && y + height >= clickY) {
                setSelectedDay(position)
            }
        })
    }

    const gesture = Gesture.LongPress().onStart(handlePress).onFinalize(handleTouchEnd)

    const verticalPositionForSelectedTooltip = () => {
        if (!selectedDay) return "center"
        if (selectedDay.y > 200) return "top"
        if (selectedDay.y < 100) return "bottom"
        return "center"
    }

    return (
        <GestureDetector gesture={gesture}>
            <View width="100%" height={canvasHeight}>
                <Canvas style={{flex: 1}} onLayout={updateCanvasDimensions}>
                    <Group>
                        {dayPositions.map(({x, y, width, height, key}) => (
                            <Rect key={key} x={x} y={y} width={width} height={height}
                                  color={x == selectedDay?.x && y == selectedDay?.y && width == selectedDay?.width && height == selectedDay?.height ? "lightgrey" : "grey"}/>
                        ))}
                        {labelPositions.map(({x, y}, i) => (
                            <Text font={labelFont} text={dayLabels[i]} key={dayLabels[i]} x={x} y={y} color="black"/>
                        ))}
                        {selectedDay && (
                            <SkTooltip
                                containerX={selectedDay.x}
                                containerY={selectedDay.y}
                                containerWidth={selectedDay.width}
                                containerHeight={selectedDay.height}
                                titleFont={tooltipTitleFont}
                                entryFont={tooltipBodyFont}
                                positionVertical={verticalPositionForSelectedTooltip()}
                                positionHorizontal={selectedDay.x < layout.width/2 ? "right" : "left"}
                                entries={["Test!!! lol", "Work please!", "Test!!! lol test test! long wide text", "Work please!", "Test!!! lol", "Work please!"]}
                                padding={8}
                                entrySpacing={6}
                            />
                        )}
                    </Group>
                </Canvas>
            </View>
        </GestureDetector>
    )
}

export {Calender}