import { CardProps, XStack, YStack } from "tamagui";
import { TimeTrackerStopwatch } from "@/src/features/time-tracker/component/time-tracker-stopwatch";
import { TrackerCardContainer } from "@/src/components/cards/tracker-card-container";
import { Label } from "@/src/components/typography/label";
import { TrackerPreviewGrid } from "@/src/components/tracker-preview/tracker-preview-grid";
import { useRouter } from "expo-router";
import { Body } from "@/src/components/typography/body";

type TimeTrackerCardProps = {
  timeTracker: TimeTracker;
  maxLetters?: number;
} & CardProps;

export const TimeTrackerCard = ({
  timeTracker,
  maxLetters = 70,
  ...cardProps
}: TimeTrackerCardProps) => {
  const {
    name,
    trackerId,
    description = "No description",
    groups,
  } = timeTracker;
  const router = useRouter();

  const routeToTimeTracker = () => {
    router.push(`/time-trackers/${timeTracker.trackerId}`);
  };

  return (
    <TrackerCardContainer {...cardProps} onPress={routeToTimeTracker}>
      <XStack width="100%" justifyContent="space-between">
        <YStack gap="$2" maxWidth="80%">
          <Label>{name}</Label>
          <Body>{`${description.substring(0, maxLetters)}${description.length > maxLetters ? "..." : ""}`}</Body>
          <TrackerPreviewGrid trackers={groups} />
        </YStack>
        <TimeTrackerStopwatch width="20%" trackerId={trackerId} />
      </XStack>
    </TrackerCardContainer>
  );
};
