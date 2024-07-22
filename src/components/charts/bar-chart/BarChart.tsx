import {Canvas, Group, Path, Rect, Skia, Text, useFont} from "@shopify/react-native-skia";
import {View} from "tamagui";
import Animated, {useDerivedValue, useSharedValue, withTiming} from "react-native-reanimated";
import {useCallback, useEffect, useMemo, useState} from "react";
import {BarChartBar} from "@/src/components/charts/bar-chart/BarChartBar";
import {LayoutChangeEvent} from "react-native";
import {BarChartLabel} from "@/src/components/charts/bar-chart/BarChartLabel";
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView, GestureStateChangeEvent, GestureTouchEvent,
    LongPressGestureHandlerEventPayload
} from "react-native-gesture-handler";
import {
    GestureStateManagerType
} from "react-native-gesture-handler/lib/typescript/handlers/gestures/gestureStateManager";
import {BarTooltip} from "@/src/components/charts/bar-chart/BarChartTooltip";
import {millisecondsToDetailedTimestamp} from "@/src/util/time";
import {cli} from "yaml/dist/cli";

interface BarChartTick {
    value: number;
    label: string | number;
}

interface BarChartEntry {
    value: number;
    label: string | number;
    detailedLabel: string;
    tooltipEntries?: string[]
}

interface BarChartProps {
    data: BarChartEntry[]
    ticks: BarChartTick[];
    height?: number;
    width?: number;
    barSpacing?: number;
    labelPadding?: number;
    tickLabelWidth?: number;
}

const f1 = require("../../../../assets/fonts/Raleway/Raleway-Bold.ttf")
const f2 = require("../../../../assets/fonts/SourceSans/SourceSansPro-Semibold.otf")
const f3 = require("../../../../assets/fonts/SourceSans/SourceSansPro-Light.otf")
const BarChart = ({
                      data,
                      ticks,
                      width = 300,
                      height = 300,
                      barSpacing = 30,
                      labelPadding = 4,
                      tickLabelWidth = 40
                  }: BarChartProps) => {

    const [pressedBarIndex, setPressedBarIndex] = useState<number | undefined>()

    const maxTick = useMemo(() => Math.max(...ticks.map(({value}) => value)), [ticks])
    const maxValue = useMemo(() => Math.max(...data.map(({value}) => value)), [data])
    const maxY = useMemo(() => Math.max(maxTick, maxValue), [maxTick, maxValue])

    const [layout, setLayout] = useState<{ width: number, height: number }>({width: 0, height: 0})

    const chartWidth = Math.max(layout.width - tickLabelWidth, 0)
    const chartX = tickLabelWidth
    const chartY = height

    const tooltipTitleFont = useFont(f1, 16)
    const labelFont = useFont(f2, 12)
    const tooltipBodyFont = useFont(f3, 14)

    const barWidth = useMemo(() => {
        if (chartWidth === 0) return 0
        const totalSpacing = barSpacing * (data.length + 1)
        return Math.floor((chartWidth - totalSpacing) / data.length)
    }, [layout.width, data, barSpacing])

    const barCenters = useMemo(() => {
        return Array(data.length).fill(0).map((_, i) => {
            const totalSpacingWidths = barSpacing * (i + 1)
            const totalBarWidths = (barWidth * i) + Math.ceil(barWidth / 2)
            return totalSpacingWidths + totalBarWidths
        })
    }, [barWidth])

    const tickCenters = useMemo(() => {
        return ticks.map(({value}) => chartY - (value / maxY * chartY))
    }, [maxY, chartY])

    const barPositions = useMemo(() => {
        return data.map(({value}, index) => ({
            x: chartX + barSpacing * (index + 1) + (barWidth * index),
            y: height - (chartY * (value / maxValue)),
            width: barWidth,
            height: chartY * (value / maxValue)
        }))
    }, [barWidth])

    const updateCanvasDimensions = (e: LayoutChangeEvent) => {
        const {width, height} = e.nativeEvent.layout
        setLayout({width, height})
    }

    const labelY = useMemo(() => chartY + labelPadding + 20, [chartY, tooltipTitleFont])
    const handlePress = (clickX: number, clickY: number) => {
        const clickBuffer = 3
        barPositions.forEach(({width, height, x, y}, index) => {
            if (clickX + clickBuffer >= x && clickX - clickBuffer <= x + width && clickY + clickBuffer >= y && clickY - clickBuffer <= y + height) {
                setPressedBarIndex(index)
            }
        })
    }

    const handleStartLongPress = (event: GestureStateChangeEvent<LongPressGestureHandlerEventPayload>) => {
        handlePress(event.x, event.y)
    }
    const handleTouchMove = (event: GestureTouchEvent, stateManager: GestureStateManagerType) => {
        const recentTouch = event.allTouches[event.allTouches.length - 1]
        handlePress(recentTouch.x, recentTouch.y)
    }
    const handleTouchEnd = () => setPressedBarIndex(undefined)

    const gesture = Gesture.LongPress().minDuration(50).onStart(handleStartLongPress).onTouchesMove(handleTouchMove).onFinalize(handleTouchEnd)

    const xAxisPath = useMemo(() => {
        const path = Skia.Path.Make()
        path.moveTo(chartX + barSpacing / 2, chartY)
        path.lineTo(chartX + chartWidth, chartY)
        return path
    }, [chartX, barSpacing, chartWidth, chartY])

    const yAxisPath = useMemo(() => {
        const path = Skia.Path.Make()
        path.moveTo(chartX + barSpacing / 2, chartY)
        path.lineTo(chartX + barSpacing / 2, chartY - height)
        return path
    }, [chartX, barSpacing, chartWidth, chartY])

    return (
        <GestureDetector gesture={gesture}>
            <View width="100%" height={chartY + 50}>
                <Canvas style={{flex: 1}} onLayout={updateCanvasDimensions}>
                    {layout.width !== 0 && labelFont && tooltipBodyFont && tooltipTitleFont && (
                        <Group>
                            {data.map(({value, label}, index) => (
                                <BarChartBar pressed={pressedBarIndex === index} color="grey" key={label}
                                             x={chartX + barSpacing * (index + 1) + (barWidth * index)} y={chartY}
                                             width={barWidth} height={chartY * (value / maxValue)}/>
                            ))}
                            {labelFont && data.map(({value, label}, i) => {
                                const barCenter = barCenters[i]
                                const labelRect = labelFont.measureText(label.toString())
                                const labelX = chartX + barCenter - Math.floor(labelRect.width / 2)
                                return <BarChartLabel key={i} x={labelX} y={labelY} font={labelFont} text={label}
                                                      color="black"/>
                            })}
                            {labelFont && (
                                tickCenters.map((value, index) => {

                                    const labelRect = labelFont.measureText(ticks[index].label.toString())
                                    const labelX = tickLabelWidth - labelRect.width
                                    // console.log(`ylablelx`, labelX)
                                    return <BarChartLabel key={index} x={labelX} y={value} font={labelFont}
                                                          text={ticks[index].label} color="black"/>
                                }))
                            }
                            {pressedBarIndex !== undefined && (
                                <BarTooltip
                                    positionHorizontal={pressedBarIndex > data.length / 2 ? "left" : "right"}
                                    titleFont={tooltipTitleFont}
                                    entryFont={tooltipBodyFont}
                                    x={barPositions[pressedBarIndex].x + barPositions[pressedBarIndex].width / 2}
                                    y={barPositions[pressedBarIndex].y + (barPositions[pressedBarIndex].height > 100 ? barPositions[pressedBarIndex].height / 2 : 0)}
                                    title={data[pressedBarIndex].detailedLabel}
                                    padding={6}
                                    entries={data[pressedBarIndex].tooltipEntries}
                                    entrySpacing={6}
                                />
                            )}
                            <Path path={xAxisPath} color="grey" style="stroke"/>
                            <Path path={yAxisPath} color="grey" style="stroke"/>
                        </Group>
                    )}
                </Canvas>
            </View>
        </GestureDetector>
    )
}

export {BarChart}