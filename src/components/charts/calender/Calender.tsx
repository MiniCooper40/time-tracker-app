import {
    Gesture,
    GestureDetector,
    GestureStateChangeEvent,
    LongPressGestureHandlerEventPayload
} from "react-native-gesture-handler";
import {View} from "tamagui";
import {Box, BoxShadow, Canvas, Group, Rect, SkPoint, SkRect, Text, useFont} from "@shopify/react-native-skia";
import {useMemo, useState} from "react";
import {LayoutChangeEvent} from "react-native";
import {daysInMonth, detailedLabelForDay, firstDayOfMonth} from "@/src/util/time";
import {SkTooltip} from "@/src/components/charts/SkTooltip";
import {rectContainsPoint} from "@/src/util/math";
import {rgba} from "color2k";
import {addAlpha} from "@/src/util/color";
import {
    useChartLabelFont,
    useTooltipBodyFont,
    useTooltipTitleFont
} from "@/src/components/typography/hooks/use-sk-fonts";

interface CalenderProps<T> {
    year: number;
    month: number;
    width?: number;
    dayPadding?: number,
    height?: number;
    data?: T[];
    dayHeight?: number;
    startDay?: number;
    labelPadding?: number;
    selectTooltipEntries?: (data: T) => string[];
    selectWeight?: (data: T) => number;
    color?: string;
}

interface CalenderDay {
    tooltipEntries?: string[],
    weight?: number,
    rect: SkRect
    dayOfMonth: number;
}

const labelForDayOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

const Calender = <T, >({
                           year,
                           month,
                           data,
                           dayPadding = 3,
                           width = 300,
                           dayHeight = 40,
                           labelPadding = 6,
                           selectTooltipEntries,
                           selectWeight,
                           color = "#000000"
                       }: CalenderProps<T>) => {

    const tooltipTitleFont = useTooltipTitleFont()
    const labelFont = useChartLabelFont()
    const tooltipBodyFont = useTooltipBodyFont()

    const [layout, setLayout] = useState<{ width: number, height: number }>({width: 0, height: 0})
    const updateCanvasDimensions = (e: LayoutChangeEvent) => {
        const {width, height} = e.nativeEvent.layout
        setLayout({width, height})
    }

    const days = useMemo(() => daysInMonth(year, month), [year, month])
    const firstWeekdayOfMonth = useMemo(() => firstDayOfMonth(year, month), [year, month])
    const weeks = Math.ceil((firstWeekdayOfMonth + days) / 7)
    const dayLabels = labelForDayOfWeek


    const maxCalenderHeight = (6) * (dayPadding + dayHeight)
    const canvasHeight = maxCalenderHeight + labelPadding + 20
    const [selectedDay, setSelectedDay] = useState<CalenderDay>()

    const dayWidth = useMemo(() => {
        return (layout.width - dayPadding * 6) / 7
    }, [layout.width, dayPadding])

    const daysInWeeksOfMonth = useMemo(() => {
        return new Array(days).fill(0).map((_, i) => ({
            day: (firstWeekdayOfMonth + i - 1) % 7,
            week: Math.floor((i + firstWeekdayOfMonth - 1) / 7)
        }))
    }, [month, year])

    const dayRects = useMemo(() => {
        return daysInWeeksOfMonth.map(({day, week}) => ({
            width: dayWidth,
            height: dayHeight,
            x: (dayWidth + dayPadding) * day,
            y: (dayHeight + dayPadding) * (week)
        } as SkRect))
    }, [dayWidth, dayHeight, dayPadding, weeks, daysInWeeksOfMonth])

    const dayWeights = useMemo(() => {
        if (!data || !selectWeight) return []
        return data.map(selectWeight)
    }, [data, selectWeight])

    const dayTooltipEntries = useMemo(() => {
        if (!data || !selectTooltipEntries) return []
        return data.map(selectTooltipEntries)
    }, [data, selectTooltipEntries])

    const calenderDays: CalenderDay[] = useMemo(() => new Array(days).fill(0).map((_, i) => ({
        rect: dayRects[i],
        weight: dayWeights && dayWeights[i],
        tooltipEntries: dayTooltipEntries && dayTooltipEntries[i],
        dayOfMonth: i + 1
    })), [dayRects, dayWeights, dayTooltipEntries, days])

    const verticalPositionForDayRectTooltip = ({rect}: CalenderDay) => {
        if (rect.y > 200) return "top"
        if (rect.y < 100) return "bottom"
        return "center"
    }

    const horizontalPositionForDayRectTooltip = ({rect}: CalenderDay) => rect.x < layout.width / 2 ? "right" : "left"

    const labelPositions = useMemo(() => {
        if (!labelFont) return []
        return dayLabels.map((label, i) => {
            const labelRect = labelFont.measureText(label)
            const dayCenter = (dayPadding + dayWidth) * i + dayWidth/2
            return {
                x: dayCenter - labelRect.width / 2,
                y: maxCalenderHeight + labelPadding + labelRect.height
            } as SkPoint
        })
    }, [dayRects, labelFont])

    const handleTouchEnd = () => setSelectedDay(undefined)
    const handlePress = (event: GestureStateChangeEvent<LongPressGestureHandlerEventPayload>) => {
        if (data && selectTooltipEntries) {
            calenderDays.forEach((day, index) => {
                if (rectContainsPoint(day.rect, event)) setSelectedDay(day);
            })
        }
    }

    const longPressGesture = Gesture.LongPress().minDuration(100).onStart(handlePress).onFinalize(handleTouchEnd)

    const colorForDay = (day: CalenderDay) => {
        if (!day.weight || day.weight === 0) return "lightgrey"
        return addAlpha(color, day.weight / Math.max(...dayWeights))
    }

    return (
        <GestureDetector gesture={longPressGesture}>
            <View width="100%" height={canvasHeight}>
                <Canvas style={{flex: 1}} onLayout={updateCanvasDimensions}>
                    <Group>
                        {calenderDays.map(day => (
                            <Box box={day.rect} key={`${day.rect.x}-${day.rect.y}`} color={colorForDay(day)} opacity={day === selectedDay ? 0.6 : 1}/>
                        ))}
                        {labelPositions.map(({x, y}, i) => (
                            <Text font={labelFont} text={dayLabels[i]} key={dayLabels[i]} x={x} y={y} color="black"/>
                        ))}
                        {selectedDay && (
                            <SkTooltip
                                containerRect={selectedDay.rect}
                                titleFont={tooltipTitleFont}
                                entryFont={tooltipBodyFont}
                                positionVertical={verticalPositionForDayRectTooltip(selectedDay)}
                                positionHorizontal={horizontalPositionForDayRectTooltip(selectedDay)}
                                entries={selectedDay.tooltipEntries}
                                title={detailedLabelForDay({
                                    day: selectedDay.dayOfMonth,
                                    month,
                                    year
                                })}
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