import {YStack} from "tamagui";
import {TimeTrackerCard} from "@/src/features/time-tracker/component/time-tracker-card";
import {useRouter} from "expo-router";

interface TimeTrackerListProps {
    timeTrackers: TimeTracker[]
}

export const TimeTrackerList = ({timeTrackers}: TimeTrackerListProps) => {
    return (
        <YStack gap="$2">
            {timeTrackers.map(timeTracker => (
                <TimeTrackerCard timeTracker={timeTracker} key={timeTracker.trackerId} />
            ))}
        </YStack>
    )
}