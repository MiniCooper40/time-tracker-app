import {StackProps, Text, YStack} from "tamagui";
import { Subtitle } from "@/src/components/typography/subtitle";
import { Body } from "@/src/components/typography/body";
import { TrackerChipGrid } from "@/src/features/tracker/component/tracker-chip-grid";
import { TimeTrackerStopwatch } from "@/src/features/time-tracker/component/time-tracker-stopwatch";
import { useRouter } from "expo-router";
import { TrackerPreviewContainer } from "@/src/components/cards/tracker-preview-container";

type TimeTrackerPreviewProps = {
  timeTracker: TimeTracker;
  maxLetters?: number;
} & StackProps;

export const TimeTrackerPreview = ({
  timeTracker,
  maxLetters = 70,
  ...stackProps
}: TimeTrackerPreviewProps) => {
  const { name, description, trackerId, groups } = timeTracker;
  const router = useRouter();

  const routeToTimeTracker = () => {
    router.push(`/time-trackers/${timeTracker.trackerId}`);
  };
  return (
    <TrackerPreviewContainer onPress={routeToTimeTracker} {...stackProps}>
      <YStack gap="$2" maxWidth="80%">
        <Subtitle>{name}</Subtitle>
        {description ? (
          <Body>{`${description.substring(0, maxLetters)}${description.length > maxLetters ? "..." : ""}`}</Body>
        ) : (
          <Body>No description</Body>
        )}
        <TrackerChipGrid trackers={groups} />
      </YStack>
      <TimeTrackerStopwatch width="20%" trackerId={trackerId} />
    </TrackerPreviewContainer>
  );
};
