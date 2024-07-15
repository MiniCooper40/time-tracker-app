import {useSaveTrackedTime} from "@/src/features/time-tracker/api/save-tracked-time";
import {Stopwatch, StopwatchEvent} from "@/src/components/timer/stopwatch";
import {asLocalDateTime} from "@/src/util/time";
import {useTimeTracker} from "@/src/features/time-tracker/hooks/useTimeTracker";
import {ViewProps} from "tamagui";
type TimeTrackerStopwatchProps = {
    trackerId: string
} & ViewProps

export const TimeTrackerStopwatch = (props: TimeTrackerStopwatchProps) => {

    const {trackerId} = props

    const {startTime, setStartTime, loading} = useTimeTracker(trackerId)

    const saveTrackedTime = useSaveTrackedTime(trackerId, {
        onSuccess: (trackedTime) => {
            console.log("saved tracked time", JSON.stringify(trackedTime))
            setStartTime(undefined)
        }
    })

    const handleSaveTrackedTime = (endTime: number) => {
        if (!startTime) throw Error("failed to save, start time was undefined")
        saveTrackedTime.mutate({
            startTime: asLocalDateTime(startTime),
            endTime: asLocalDateTime(endTime),
        })
    }

    const handleStartTrackedTime = (startTime: number) => {
        setStartTime(JSON.stringify(startTime))
    }

    return (
        <Stopwatch
            startTime={startTime}
            loading={loading || saveTrackedTime.isLoading}
            onStop={handleSaveTrackedTime}
            onStart={handleStartTrackedTime}
            {...props}
        />
    )
}