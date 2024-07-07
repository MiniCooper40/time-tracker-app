import {Callback} from "@/src/types/Callback"
import {Text} from "tamagui";
import { FontAwesome } from '@expo/vector-icons';
import {useEffect, useState} from "react";
import {BLANK_TIMESTAMP, millisecondsToTimestamp} from "@/src/util/time";
import {Center} from "@/src/components/layouts/Center";

interface StopwatchState {
    startTime: number;
    currentTime: number;
}

export interface StopwatchEvent {
    startTime: number;
    endTime: number;
}

interface StopwatchProps {
    startTime: number|undefined;
    loading: boolean;
    onStop: Callback<number>;
    onStart: Callback<number>;
}

export const Stopwatch = ({startTime, loading, onStop, onStart}: StopwatchProps) => {


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
        <Center width="$10">
            <FontAwesome name={startTime ? "pause" : "play"} size={40} color="black" onPress={handleToggle} />
            {startTime && <Text>{millisecondsToTimestamp(currentTime - startTime)}</Text>}
            {!startTime && <Text>{BLANK_TIMESTAMP}</Text>}
        </Center>
    )
}