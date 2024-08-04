import {Card, Separator, Spacer, Text, YStack} from "tamagui";
import {TrackerCard} from "@/src/components/cards/tracker-card";
import {Label} from "@/src/components/typography/Label"
import {TrackerPreviewGrid} from "@/src/components/tracker-preview/tracker-preview-grid";
import {router} from "expo-router";

interface GroupTrackerCardProps {
    groupTracker: GroupTracker
}

export const GroupTrackerCard = ({groupTracker}: GroupTrackerCardProps) => {

    const {trackers, name, description} = groupTracker

    const routeToGroupTracker = () => {
        router.push(`/group-trackers/${groupTracker.trackerId}`)
    }

    return (
        <TrackerCard>
            <Card.Header onPress={routeToGroupTracker}>
                <Label>{name}</Label>
            </Card.Header>
           <YStack gap="$2">
               <Text>{description}</Text>
               <Separator />
               <TrackerPreviewGrid trackers={trackers} />
           </YStack>
        </TrackerCard>
    )
}