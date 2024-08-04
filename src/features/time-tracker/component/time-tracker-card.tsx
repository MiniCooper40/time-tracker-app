import {Card, CardProps, Separator, Text, XStack, YStack} from "tamagui";
import {TimeTrackerStopwatch} from "@/src/features/time-tracker/component/time-tracker-stopwatch";
import {TrackerCard} from "@/src/components/cards/tracker-card";
import {Label} from "@/src/components/typography/Label";
import {TrackerPreviewGrid} from "@/src/components/tracker-preview/tracker-preview-grid";
import {useRouter} from "expo-router";
import timeTrackers from "@/app/(app)/(root)/time-trackers/(time-trackers)";

type TimeTrackerCardProps = {
    timeTracker: TimeTracker
} & CardProps

export const TimeTrackerCard = (props: TimeTrackerCardProps) => {
    const {timeTracker} = props
    const {name, trackerId, description = "No description", groups} = timeTracker
    const router = useRouter()

    const routeToTimeTracker = () => {
        router.push(`/time-trackers/${timeTracker.trackerId}`)
    }

    return (
        <TrackerCard {...props} onPress={() => console.log("presed tracker card")}>
            <Card.Header onPress={routeToTimeTracker}>
                <Label onPress={routeToTimeTracker}>{name}</Label>
            </Card.Header>
            <XStack width="100%" justifyContent="space-between">
                <YStack gap="$1" maxWidth="80%">
                    <Text>{description ?? "No description"}</Text>
                    <Separator />
                    <TrackerPreviewGrid trackers={groups} />
                    {groups.length === 0 && <Text>This tracker is not a part of any groups</Text>}
                </YStack>
                <TimeTrackerStopwatch width="20%" trackerId={trackerId} />
            </XStack>
        </TrackerCard>
    )
}