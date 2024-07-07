import {YStack} from "tamagui";
import {TimeTrackerCard} from "@/src/features/time-tracker/component/timeTrackerCard";

interface TimeTrackerListProps {
    timeTrackers: TimeTracker[]
}

export const TimeTrackerList = ({timeTrackers}: TimeTrackerListProps) => {
    return (
        <YStack>
            {timeTrackers.map(timeTracker => (
                <TimeTrackerCard timeTracker={timeTracker} key={timeTracker.trackerId} />
            ))}
        </YStack>
    )
}