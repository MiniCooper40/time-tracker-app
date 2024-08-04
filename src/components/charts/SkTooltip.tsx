import {RoundedRect, SkFont, SkRect, Text, vec, Vertices} from "@shopify/react-native-skia";
import {useMemo} from "react";

interface SkTooltipProps {
    containerRect: SkRect;
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
                       containerRect,
                       color = "white",
                       entryFont,
                       titleFont,
                       title = "Tooltip",
                       padding = 3,
                       positionHorizontal = "right",
                       positionVertical = "center",
                       distanceFromCenter = 0,
                       arrowHeight = 16,
                       entries = [],
                       entrySpacing = 2,
                   }: SkTooltipProps) => {
    if (!titleFont || !entryFont) return undefined

    const titleRect = useMemo(() => titleFont.measureText(title), [titleFont])
    const entryRects = useMemo(() => entries.map(text => entryFont.measureText(text)), [entries, entryFont])

    const tooltipRect = useMemo(() => {
        const tooltipWidth = Math.max(titleRect.width, ...entryRects.map(({width}) => width)) + padding * 2
        const tooltipHeight = titleRect.height + padding * 2 + entryRects.map(({height}) => height).reduce((prev, cur) => prev + cur, 0) + entryRects.length * entrySpacing
        const tooltipX = (() => {
            switch (positionHorizontal) {
                case "right":
                    return containerRect.x + distanceFromCenter + containerRect.width + arrowHeight;
                case "left":
                    return containerRect.x - tooltipWidth  - distanceFromCenter - arrowHeight;
            }
        })()
        const tooltipY = (() => {
            switch (positionVertical) {
                case "top":
                    return containerRect.y + containerRect.height/2 - tooltipHeight + arrowHeight;
                case "bottom":
                    return containerRect.y + containerRect.height/2 - arrowHeight;
                default:
                    return containerRect.y + containerRect.height/2 - tooltipHeight/2
            }
        })()
        
        return {
            width: tooltipWidth,
            height: tooltipHeight,
            x: tooltipX,
            y: tooltipY
        } as SkRect
    }, [titleRect, positionHorizontal, positionVertical, containerRect.x, containerRect.y, containerRect.width, containerRect.height])

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

    const arrowVertices = useMemo(() => {
        const sideX = tooltipRect.x + tooltipRect.width
        const centerY = containerRect.y + containerRect.height/2
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