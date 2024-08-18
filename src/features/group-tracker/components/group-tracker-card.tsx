import { CardProps, YStack } from "tamagui";
import { TrackerCardContainer } from "@/src/components/cards/tracker-card-container";
import { Label } from "@/src/components/typography/label";
import { TrackerPreviewGrid } from "@/src/components/tracker-preview/tracker-preview-grid";
import { router } from "expo-router";
import { Body } from "@/src/components/typography/body";

type GroupTrackerCardProps = {
  groupTracker: GroupTracker;
} & CardProps;

export const GroupTrackerCard = ({
  groupTracker,
  ...cardProps
}: GroupTrackerCardProps) => {
  const { trackers, name, description } = groupTracker;

  const routeToGroupTracker = () => {
    router.push(`/group-trackers/${groupTracker.trackerId}`);
  };

  return (
    <TrackerCardContainer {...cardProps} onPress={routeToGroupTracker}>
      <YStack gap="$2">
        <Label>{name}</Label>
        <Body>{description}</Body>
        <TrackerPreviewGrid trackers={trackers} />
      </YStack>
    </TrackerCardContainer>
  );
};
