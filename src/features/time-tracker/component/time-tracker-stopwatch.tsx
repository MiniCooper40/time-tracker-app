import {useSaveTrackedTime} from "@/src/features/time-tracker/api/save-tracked-time";
import {Stopwatch, StopwatchEvent} from "@/src/components/timer/stopwatch";
import {asLocalDateTime} from "@/src/util/time";
import {useTimeTracker} from "@/src/features/time-tracker/hooks/useTimeTracker";
interface TimeTrackerStopwatchProps {
    trackerId: string
}

export const TimeTrackerStopwatch = ({trackerId}: TimeTrackerStopwatchProps) => {

    const {startTime, setStartTime, loading} = useTimeTracker(trackerId)

    const saveTrackedTime = useSaveTrackedTime(trackerId, {
        onSuccess: (trackedTime) => {
            console.log("saved tracked time", JSON.stringify(trackedTime))
            setStartTime(undefined)
        }
    })

    const handleSaveTrackedTime = (endTime: number) => {
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
        />
    )
}