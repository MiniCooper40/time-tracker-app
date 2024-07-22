import {RoundedRect, SkFont, Text, vec, Vertices} from "@shopify/react-native-skia";
import {useMemo} from "react";
import {pad} from "ansi-fragments";

interface SkTooltipProps {
    x: number;
    y: number;
    color?: string;
    title?: string;
    titleFont: SkFont | null;
    entryFont?: SkFont | null;
    padding?: number;
    positionHorizontal?: "right" | "left";
    distanceFromBar?: number;
    arrowHeight?: number;
    entries?: string[];
    entrySpacing?: number
}

const BarTooltip = ({x, y, color = "white", titleFont, title = "Tooltip", padding = 3, positionHorizontal="right", distanceFromBar = 12, arrowHeight = 11, entries=[], entrySpacing = 2, entryFont = titleFont}: SkTooltipProps) => {

    console.log("top of tooltip", {x, y, color, entries, title} )

    if (!titleFont) return undefined

    const titleRect = titleFont.measureText(title)
    const entryRects = entries.map(text => entryFont?.measureText(text) ?? titleFont.measureText(text))

    const tooltipRect = useMemo(() => {
        const totalWidth = Math.max(titleRect.width, ...entryRects.map(({width}) => width)) + padding*2
        const totalHeight = titleRect.height + padding*2 + entryRects.map(({height}) => height).reduce((prev, cur) => prev + cur, 0) + entryRects.length * entrySpacing
        const adjustedX = positionHorizontal === "right"
            ? x + distanceFromBar
            : x - totalWidth - distanceFromBar

        return {
            width: totalWidth,
            height: totalHeight,
            x: adjustedX,
            y: y - Math.ceil(totalHeight/2)
        }
    }, [titleRect])

    const titlePosition = useMemo(() => {
        return {
            x: tooltipRect.x + padding,
            y: tooltipRect.y + padding + titleRect.height
        }
    }, [tooltipRect])

    const entryPositions = useMemo(() => {
        let lastEntryY = titlePosition.y
        return entryRects.map((rect, index) => {
            const entryY = lastEntryY + entrySpacing + rect.height
            lastEntryY = entryY
            return {
                x: titlePosition.x,
                y: entryY
            }
        })
    }, [titlePosition])

    const arrowPointerVertices = useMemo(() => {
        const arrowBaseX = positionHorizontal === "right"
            ? tooltipRect.x
            : tooltipRect.x + tooltipRect.width

        const arrowEndX = positionHorizontal === "right"
            ? arrowBaseX - distanceFromBar
            : arrowBaseX + distanceFromBar

        return [
            vec(arrowBaseX, y - arrowHeight/2),
            vec(arrowBaseX, y + arrowHeight/2),
            vec(arrowEndX, y)
        ]
    }, [positionHorizontal, tooltipRect])

    console.log("in tooltip", {tooltipRect, entries, title, titlePosition})

    return (
        <>
            <RoundedRect x={tooltipRect.x} y={tooltipRect.y} width={tooltipRect.width} height={tooltipRect.height} r={4} color={color} />
            {entryPositions.map(({x,y}, index) => (
                <Text key={index} font={entryFont} text={entries[index]} x={x} y={y} />
            ))}
            <Vertices vertices={arrowPointerVertices} color={color} />
            <Text x={titlePosition.x} y={titlePosition.y} text={title} font={titleFont} color="black" />
        </>
    )
}

export {BarTooltip}