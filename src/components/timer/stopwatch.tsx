import {Callback} from "@/src/types/Callback"
import {GetThemeValueForKey, Text, ViewProps} from "tamagui";
import { FontAwesome } from '@expo/vector-icons';
import {useEffect, useState} from "react";
import {BLANK_TIMESTAMP, millisecondsToTimestamp} from "@/src/util/time";
import {Center} from "@/src/components/layouts/Center";
import {current} from "@react-native-community/cli-tools/build/releaseChecker";
import {TextProps} from "react-native";


export interface StopwatchEvent {
    startTime: number;
    endTime: number;
}

export type StopwatchProps = {
    startTime: number|undefined;
    loading: boolean;
    onStop: Callback<number>;
    onStart: Callback<number>;
    iconSize?: number;
    fontSize?: "unset" | GetThemeValueForKey<"fontSize"> | undefined;
} & ViewProps & TextProps

export const Stopwatch = ({
    startTime,
    loading,
    onStop,
    onStart,
    iconSize = 30,
    fontSize = "$6",
    ...viewProps
                          }: StopwatchProps) => {

    const [currentTime, setCurrentTime] = useState(Date.now())

    useEffect(() => {
        setTimeout(() => {
            if (startTime) setCurrentTime(Date.now())
        }, 25)
    })

    const handleToggle = () => {
        const now = Date.now()
        if (startTime) onStop(now)
        else onStart(now)
    }

    return (
        <Center {...viewProps}>
            <FontAwesome name={startTime ? "pause" : "play"} size={iconSize} color="black" onPress={handleToggle} />
            {startTime && currentTime && <Text fontSize={fontSize}>{millisecondsToTimestamp(Date.now() - startTime)}</Text>}
            {(!startTime || !currentTime) && <Text fontSize={fontSize}>{BLANK_TIMESTAMP}</Text>}
        </Center>
    )
}