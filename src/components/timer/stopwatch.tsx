import {Callback} from "@/src/types/Callback"
import {Text, ViewProps} from "tamagui";
import { FontAwesome } from '@expo/vector-icons';
import {useEffect, useState} from "react";
import {BLANK_TIMESTAMP, millisecondsToTimestamp} from "@/src/util/time";
import {Center} from "@/src/components/layouts/Center";
import {current} from "@react-native-community/cli-tools/build/releaseChecker";

interface StopwatchState {
    startTime: number;
    currentTime: number;
}

export interface StopwatchEvent {
    startTime: number;
    endTime: number;
}

type StopwatchProps = {
    startTime: number|undefined;
    loading: boolean;
    onStop: Callback<number>;
    onStart: Callback<number>;
} & ViewProps

export const Stopwatch = (props: StopwatchProps) => {
    const {startTime, loading, onStop, onStart} = props

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
        <Center {...props}>
            <FontAwesome name={startTime ? "pause" : "play"} size={30} color="black" onPress={handleToggle} />
            {startTime && currentTime && <Text>{millisecondsToTimestamp(Date.now() - startTime)}</Text>}
            {(!startTime || !currentTime) && <Text>{BLANK_TIMESTAMP}</Text>}
        </Center>
    )
}