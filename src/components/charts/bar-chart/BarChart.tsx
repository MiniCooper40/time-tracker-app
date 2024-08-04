import {Canvas, Group, Path, Skia, SkRect, useFont} from "@shopify/react-native-skia";
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
import {SkTooltip} from "@/src/components/charts/SkTooltip";
import {sum} from "@/src/util/math";

interface BarChartTick {
    value: number;
    label: string | number;
}

interface BarChartEntry {
    sections: {
        value: number,
        color: string
    }[];
    label: string | number;
    detailedLabel: string;
    tooltipEntries?: string[]
}

type CalculatedBarChartEntry = {
    totalValue: number;
} & BarChartEntry

interface BarChartProps {
    data: BarChartEntry[]
    ticks: BarChartTick[];
    height?: number;
    width?: number;
    barSpacing?: number;
    labelPadding?: number;
    tickLabelWidth?: number;
    loading?: boolean;
    color?: string;
}

const BarChart = ({
                      data: initialData,
                      ticks,
                      width = 300,
                      height = 300,
                      barSpacing = 30,
                      labelPadding = 4,
                      tickLabelWidth = 40,
                      loading = false,
                      color
                  }: BarChartProps) => {

    const calculatedData: CalculatedBarChartEntry[] = useMemo(() => initialData.map(data => ({
        ...data,
        totalValue: sum(...data.sections.map(({value}) => value))
    })), [initialData])

    const [pressedBarIndex, setPressedBarIndex] = useState<number | undefined>()

    const maxTick = useMemo(() => Math.max(...ticks.map(({value}) => value)), [ticks])
    const maxValue = useMemo(() => Math.max(...calculatedData.map(({totalValue}) => totalValue)), [calculatedData])
    const maxY = useMemo(() => Math.max(maxTick, maxValue), [maxTick, maxValue])

    const [layout, setLayout] = useState<{ width: number, height: number }>({width: 0, height: 0})

    const chartWidth = Math.max(layout.width - tickLabelWidth, 0)
    const chartX = tickLabelWidth

    const tooltipTitleFont = useFont(require("../../../../assets/fonts/Raleway/Raleway-Bold.ttf"), 16)
    const labelFont = useFont(require("../../../../assets/fonts/SourceSans/SourceSansPro-Semibold.otf"), 12)
    const tooltipBodyFont = useFont(require("../../../../assets/fonts/SourceSans/SourceSansPro-Light.otf"), 14)

    const barWidth = useMemo(() => {
        if (chartWidth === 0) return 0
        const totalSpacing = barSpacing * (calculatedData.length + 1)
        return Math.floor((chartWidth - totalSpacing) / calculatedData.length)
    }, [layout.width, calculatedData, barSpacing])

    const barCenters = useMemo(() => {
        return Array(calculatedData.length).fill(0).map((_, i) => {
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
        return calculatedData.map(({totalValue}, index) => ({
            x: chartX + barSpacing * (index + 1) + (barWidth * index),
            y: chartBottom - (height * (totalValue / maxY)),
            width: barWidth,
            height: height * (totalValue / maxY)
        } as SkRect))
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

    const longPressGesture = Gesture.LongPress().minDuration(100).onStart(handleStartLongPress).onTouchesMove(handleTouchMove).onFinalize(handleTouchEnd)

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
        <GestureDetector gesture={longPressGesture}>
            <View width="100%" height={chartY + 50}>
                <Canvas style={{flex: 1}} onLayout={updateCanvasDimensions}>
                    {layout.width !== 0 && labelFont && tooltipBodyFont && tooltipTitleFont && (
                        <Group>
                            {!loading && barPositions.map((position, barIndex) => (
                                <BarChartBar  key={`${barIndex}`}
                                             x={position.x} y={position.y}
                                             width={position.width} height={position.height}
                                              sections={calculatedData[barIndex].sections}
                                             opacity={barIndex === pressedBarIndex ? 0.6 : 1}/>
                            ))}
                            {labelFont && calculatedData.map(({label}, i) => {
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
                                <SkTooltip
                                    positionHorizontal={pressedBarIndex > calculatedData.length / 2 ? "left" : "right"}
                                    positionVertical={"center"}
                                    titleFont={tooltipTitleFont}
                                    entryFont={tooltipBodyFont}
                                    containerRect={barPositions[pressedBarIndex]}
                                    title={calculatedData[pressedBarIndex].detailedLabel}
                                    padding={6}
                                    entries={calculatedData[pressedBarIndex].tooltipEntries}
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