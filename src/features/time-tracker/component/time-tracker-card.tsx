import { Text, XStack, YStack} from "tamagui";
import {TimeTrackerStopwatch} from "@/src/features/time-tracker/component/time-tracker-stopwatch";
import {TrackerCard} from "@/src/components/cards/tracker-card";
import { Label } from "@/src/components/typography/Label";

interface TimeTrackerCardProps {
    timeTracker: TimeTracker
}

export const TimeTrackerCard = ({timeTracker}: TimeTrackerCardProps) => {

    const {name, trackerId, description} = timeTracker

    return (
        <TrackerCard>
            <XStack justifyContent="space-between" alignItems="center">
                <YStack>
                    <Label>{name}</Label>
                    <Text>{description}</Text>
                </YStack>
                <TimeTrackerStopwatch trackerId={trackerId} />
            </XStack>
        </TrackerCard>
    )
}