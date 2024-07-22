import {AnimatedProp, RoundedRect} from "@shopify/react-native-skia";
import {Rect} from "@shopify/react-native-skia";
import {SharedValue, useDerivedValue, useSharedValue, withTiming} from "react-native-reanimated";
import {ReactNode, useEffect} from "react";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import GestureHandler from "react-native-gesture-handler/src/web_hammer/GestureHandler";

interface BarChartBarProps {
    x: number;
    y: number;
    width: number;
    height: number;
    color?: string;
    pressed?: boolean;
}

const BarChartBar = ({x, y, width, height, color="purple", pressed}: BarChartBarProps) => {


    const currentHeight = useSharedValue(0)
    useEffect(() => {
        currentHeight.value = withTiming(-height, {
            duration: 500,
        })
    })


    return <RoundedRect r={0} x={x} y={y} width={width} height={currentHeight} color={!pressed ? color : "lightgrey"} />
}

export {BarChartBar}