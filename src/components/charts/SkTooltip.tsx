import {RoundedRect, SkFont, Text, vec, Vertices} from "@shopify/react-native-skia";
import {useMemo} from "react";
import {pad} from "ansi-fragments";
import {distance} from "popmotion";

interface SkTooltipProps {
    containerX: number;
    containerY: number;
    containerWidth: number,
    containerHeight: number,
    color?: string;
    title?: string;
    titleFont: SkFont | null;
    entryFont?: SkFont | null;
    padding?: number;
    positionHorizontal?: "right" | "left";
    positionVertical?: "top" | "bottom" | "center";
    distanceFromCenter?: number;
    arrowHeight?: number;
    entries?: string[];
    entrySpacing?: number
}

const SkTooltip = ({
                       containerX,
                       containerY,
                       containerWidth,
                       containerHeight,
                       color = "white",
                       titleFont,
                       title = "Tooltip",
                       padding = 3,
                       positionHorizontal = "right",
                       positionVertical = "center",
                       distanceFromCenter = 0,
                       arrowHeight = 16,
                       entries = [],
                       entrySpacing = 2,
                       entryFont = titleFont
                   }: SkTooltipProps) => {

    console.log("top of tooltip", {containerX: containerX, containerY: containerY, color, entries, title})

    if (!titleFont) return undefined

    const titleRect = titleFont.measureText(title)
    const entryRects = entries.map(text => entryFont?.measureText(text) ?? titleFont.measureText(text))
    const tooltipWidth = useMemo(() => Math.max(titleRect.width, ...entryRects.map(({width}) => width)) + padding * 2, [padding, entryRects, titleRect])
    const tooltipHeight = titleRect.height + padding * 2 + entryRects.map(({height}) => height).reduce((prev, cur) => prev + cur, 0) + entryRects.length * entrySpacing

    const tooltipX = useMemo(() => {
        switch (positionHorizontal) {
            case "right":
                return containerX + distanceFromCenter + containerWidth + arrowHeight;
            case "left":
                return containerX - tooltipWidth  - distanceFromCenter - arrowHeight;
        }
    }, [containerX, tooltipWidth, containerHeight, distanceFromCenter, positionHorizontal])

    const tooltipY = useMemo(() => {
        switch (positionVertical) {
            case "top":
                return containerY + containerHeight/2 - tooltipHeight + arrowHeight;
            case "bottom":
                return containerY + containerHeight/2 - arrowHeight;
            default:
                return containerY + containerHeight/2 - tooltipHeight/2
        }
    }, [positionHorizontal, containerY, tooltipHeight])

    const tooltipRect = useMemo(() => {
        return {
            width: tooltipWidth,
            height: tooltipHeight,
            x: tooltipX,
            y: tooltipY
        }
    }, [titleRect, tooltipHeight, tooltipWidth, tooltipX, tooltipY])

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

    const arrowInset = 6
    //
    // const diffY = useMemo(() => {
    //     // switch(positionVertical) {
    //     //     case "center": return 0
    //     //     case "bottom": return tooltipRect.height / 2
    //     //     case "top": return -tooltipRect.height / 2
    //     // }
    //     return 0
    // }, [positionVertical])

    const arrowVertices = useMemo(() => {
        const sideX = tooltipRect.x + tooltipRect.width
        const centerY = containerY + containerHeight/2 //tooltipRect.y + tooltipRect.height/2
        return [
            vec(sideX, centerY - arrowHeight/2),
            vec(sideX, centerY + arrowHeight/2 ),
            vec(sideX + arrowHeight, centerY )
        ]
    }, [positionVertical, tooltipRect])


    const directionAdjustedArrowVertices = useMemo(() => {
        if (positionHorizontal === "left") return arrowVertices
        else {
            const tooltipCenterX = tooltipRect.x + tooltipRect.width/2
            return arrowVertices.map(({x, y}) => vec(tooltipCenterX - (x - tooltipCenterX), y))
        }
    }, [positionHorizontal, tooltipRect, arrowVertices])

    console.log("in tooltip", {tooltipRect, entries, title, titlePosition})

    return (
        <>
            <RoundedRect x={tooltipRect.x} y={tooltipRect.y} width={tooltipRect.width} height={tooltipRect.height} r={4}
                         color={color}/>
            {entryPositions.map(({x, y}, index) => (
                <Text key={index} font={entryFont} text={entries[index]} x={x} y={y}/>
            ))}
            <Vertices vertices={directionAdjustedArrowVertices} color={color}/>
            <Text x={titlePosition.x} y={titlePosition.y} text={title} font={titleFont} color="black"/>
        </>
    )
}

export {SkTooltip}