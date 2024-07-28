import {RoundedRect, SkFont, Text, vec, Vertices} from "@shopify/react-native-skia";
import {useMemo} from "react";
import {pad} from "ansi-fragments";
import {distance} from "popmotion";

interface SkTooltipProps {
    x: number;
    y: number;
    color?: string;
    title?: string;
    titleFont: SkFont | null;
    entryFont?: SkFont | null;
    padding?: number;
    positionHorizontal?: "right" | "left";
    positionVertical?: "top" | "bottom" | "center";
    distanceFromBar?: number;
    arrowHeight?: number;
    entries?: string[];
    entrySpacing?: number
}

const BarTooltip = ({
                        x,
                        y,
                        color = "white",
                        titleFont,
                        title = "Tooltip",
                        padding = 3,
                        positionHorizontal = "right",
                        positionVertical = "center",
                        distanceFromBar = 12,
                        arrowHeight = 11,
                        entries = [],
                        entrySpacing = 2,
                        entryFont = titleFont
                    }: SkTooltipProps) => {

    console.log("top of tooltip", {x, y, color, entries, title})

    if (!titleFont) return undefined

    const titleRect = titleFont.measureText(title)
    const entryRects = entries.map(text => entryFont?.measureText(text) ?? titleFont.measureText(text))
    const totalWidth = useMemo(() => Math.max(titleRect.width, ...entryRects.map(({width}) => width)) + padding * 2, [padding, entryRects, titleRect])
    const totalHeight = titleRect.height + padding * 2 + entryRects.map(({height}) => height).reduce((prev, cur) => prev + cur, 0) + entryRects.length * entrySpacing
    const tooltipX = () => {
        switch (positionHorizontal) {
            case "right":
                return x + distanceFromBar;
            case "left":
                return x - totalWidth - distanceFromBar;
            default:
                return x - (totalWidth / 2)
        }
    }

    const tooltipY = () => {
        switch (positionVertical) {
            case "top":
                return y + Math.ceil(totalHeight / 2);
            case "bottom":
                return y - totalHeight;
            default:
                return y - Math.ceil(totalHeight / 2)
        }
    }

    const tooltipRect = useMemo(() => {
        return {
            width: totalWidth,
            height: totalHeight,
            x: tooltipX(),
            y: tooltipY()
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

    const arrowInset = 6

    const arrowPointerVertices = useMemo(() => {
        switch (positionHorizontal) {
            case "right": {
                if (positionVertical === "center") {
                    return [
                        vec(tooltipRect.x, y + arrowHeight / 2),
                        vec(tooltipRect.x, y - arrowHeight / 2),
                        vec(tooltipRect.x - arrowHeight, y),
                    ]
                }
                else if (positionVertical === "top") {
                    return [
                        vec(tooltipRect.x + arrowInset, y + Math.ceil(tooltipRect.height/2)),
                        vec(tooltipRect.x + arrowHeight + arrowInset, y + Math.ceil(tooltipRect.height/2) ),
                        vec(tooltipRect.x + arrowHeight/2 + arrowInset, y + Math.ceil(tooltipRect.height/2) - arrowHeight),
                    ]
                }
                else {
                    return [
                        vec(tooltipRect.x + arrowInset, y ),
                        vec(tooltipRect.x + arrowHeight  + arrowInset, y),
                        vec(tooltipRect.x + arrowHeight/2  + arrowInset, y +  arrowHeight),
                    ]
                }
            }
            case "left": {
                if (positionVertical === "center") {
                    return [
                        vec(tooltipRect.x + tooltipRect.width, y + arrowHeight / 2),
                        vec(tooltipRect.x + tooltipRect.width, y - arrowHeight / 2),
                        vec(tooltipRect.x + tooltipRect.width + arrowHeight, y),
                    ]
                }
                else if (positionVertical === "top") {
                    return [
                        vec(tooltipRect.x + tooltipRect.width - arrowHeight - arrowInset, y + Math.ceil(tooltipRect.height/2)),
                        vec(tooltipRect.x + tooltipRect.width - arrowInset, y + Math.ceil(tooltipRect.height/2)),
                        vec(tooltipRect.x + tooltipRect.width - arrowHeight/2 - arrowInset, y + Math.ceil(tooltipRect.height/2) - arrowHeight),
                    ]
                }
                else {
                    return [
                        vec(tooltipRect.x + tooltipRect.width - arrowHeight - arrowInset, y),
                        vec(tooltipRect.x + tooltipRect.width - arrowInset, y),
                        vec(tooltipRect.x + tooltipRect.width - arrowHeight/2 - arrowInset, y  + arrowHeight),
                    ]
                }
            }
        }
    }, [positionHorizontal, tooltipRect])

    console.log("in tooltip", {tooltipRect, entries, title, titlePosition})

    return (
        <>
            <RoundedRect x={tooltipRect.x} y={tooltipRect.y} width={tooltipRect.width} height={tooltipRect.height} r={4}
                         color={color}/>
            {entryPositions.map(({x, y}, index) => (
                <Text key={index} font={entryFont} text={entries[index]} x={x} y={y}/>
            ))}
            <Vertices vertices={arrowPointerVertices} color={color}/>
            <Text x={titlePosition.x} y={titlePosition.y} text={title} font={titleFont} color="black"/>
        </>
    )
}

export {BarTooltip}