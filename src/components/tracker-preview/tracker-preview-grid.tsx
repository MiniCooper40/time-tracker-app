import {XGroup, XStack} from "tamagui";
import {TrackerPreview} from "@/src/components/tracker-preview/tracker-preview";

interface TrackerPreviewGridProps {
    trackers: Tracker[]
}

export const TrackerPreviewGrid = ({trackers}: TrackerPreviewGridProps) => {
    return (
        <XStack
            size="$3"
            gap="$3"
            flexWrap="wrap"
        >
            {trackers.map(tracker => (
                <TrackerPreview tracker={tracker} key={tracker.trackerId} />
            ))}
        </XStack>
    )
}