import {Canvas, Group, Path, Skia, useFont} from "@shopify/react-native-skia";
import {View} from "tamagui";
import {useMemo, useState} from "react";
import {BarChartBar} from "@/src/components/charts/bar-chart/BarChartBar";
import {LayoutChangeEvent} from "react-native";
import {BarChartLabel} from "@/src/components/charts/bar-chart/BarChartLabel";
import {
    Gesture,
    GestureDetector,
    GestureStateChangeEvent,
    GestureTouchEvent,
    LongPressGestureHandlerEventPayload
} from "react-native-gesture-handler";
import {
    GestureStateManagerType
} from "react-native-gesture-handler/lib/typescript/handlers/gestures/gestureStateManager";
import {BarTooltip} from "@/src/components/charts/bar-chart/BarChartTooltip";

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
    loading?: boolean;
}

const BarChart = ({
                      data,
                      ticks,
                      width = 300,
                      height = 300,
                      barSpacing = 30,
                      labelPadding = 4,
                      tickLabelWidth = 40,
                      loading = false
                  }: BarChartProps) => {

    const [pressedBarIndex, setPressedBarIndex] = useState<number | undefined>()

    const maxTick = useMemo(() => Math.max(...ticks.map(({value}) => value)), [ticks])
    const maxValue = useMemo(() => Math.max(...data.map(({value}) => value)), [data])
    const maxY = useMemo(() => Math.max(maxTick, maxValue), [maxTick, maxValue])

    const [layout, setLayout] = useState<{ width: number, height: number }>({width: 0, height: 0})

    const chartWidth = Math.max(layout.width - tickLabelWidth, 0)
    const chartX = tickLabelWidth

    const tooltipTitleFont = useFont(require("../../../../assets/fonts/Raleway/Raleway-Bold.ttf"), 16)
    const labelFont = useFont(require("../../../../assets/fonts/SourceSans/SourceSansPro-Semibold.otf"), 12)
    const tooltipBodyFont = useFont(require("../../../../assets/fonts/SourceSans/SourceSansPro-Light.otf"), 14)

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
        return ticks.map(({value}) => height - (value / maxY * height))
    }, [maxY, height])

    const chartY = height

    const overflowTopCorrection = useMemo(() => {
        const topLabelY = (tickCenters.at(-1) ?? 0) - (labelFont?.measureText("Label").height ?? 0)
        return Math.max(0, -topLabelY)
    }, [tickCenters, labelFont])

    const chartBottom = useMemo(() => height, [overflowTopCorrection, height])

    const barPositions = useMemo(() => {
        return data.map(({value}, index) => ({
            x: chartX + barSpacing * (index + 1) + (barWidth * index),
            y: chartY - (chartY * (value / maxY)) + overflowTopCorrection,
            width: barWidth,
            height: chartY * (value / maxY)
        }))
    }, [barWidth, overflowTopCorrection, maxY])

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
        path.moveTo(chartX + barSpacing / 2, chartBottom)
        path.lineTo(chartX + chartWidth, chartBottom)
        return path
    }, [chartX, barSpacing, chartWidth, chartBottom])

    const yAxisPath = useMemo(() => {
        const path = Skia.Path.Make()
        path.moveTo(chartX + barSpacing / 2, chartBottom)
        path.lineTo(chartX + barSpacing / 2, 0)
        return path
    }, [chartX, barSpacing, chartWidth, chartBottom])

    return (
        <GestureDetector gesture={gesture}>
            <View width="100%" height={chartY + 50}>
                <Canvas style={{flex: 1}} onLayout={updateCanvasDimensions}>
                    {layout.width !== 0 && labelFont && tooltipBodyFont && tooltipTitleFont && (
                        <Group>
                            {!loading && data.map(({value, label}, index) => (
                                <BarChartBar pressed={pressedBarIndex === index} color="grey" key={label}
                                             x={chartX + barSpacing * (index + 1) + (barWidth * index)} y={chartBottom}
                                             width={barWidth} height={chartY * (value / maxY)}/>
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
                                    return <BarChartLabel key={index} x={labelX}
                                                          y={value + labelRect.height / 2 + overflowTopCorrection}
                                                          font={labelFont}
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