import {YStack} from "tamagui";
import {GroupTrackerCard} from "@/src/features/group-tracker/components/group-tracker-card";

interface GroupTrackerListProps {
    groupTrackers: GroupTracker[]
}

export const GroupTrackerList = ({groupTrackers}: GroupTrackerListProps) => {

    return (
        <YStack>
            {groupTrackers.map(groupTracker => (
                <GroupTrackerCard groupTracker={groupTracker} key={groupTracker.trackerId} />
            ))}
        </YStack>
    )
}