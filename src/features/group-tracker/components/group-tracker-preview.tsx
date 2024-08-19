import { StackProps, YStack } from "tamagui";
import { Subtitle } from "@/src/components/typography/subtitle";
import { Body } from "@/src/components/typography/body";
import { TrackerChipGrid } from "@/src/features/tracker/component/tracker-chip-grid";
import { TimeTrackerStopwatch } from "@/src/features/time-tracker/component/time-tracker-stopwatch";
import { useRouter } from "expo-router";
import { TrackerPreviewContainer } from "@/src/components/cards/tracker-preview-container";

type TimeTrackerPreviewProps = {
  groupTracker: GroupTracker;
  maxLetters?: number;
} & StackProps;

export const GroupTrackerPreview = ({
  groupTracker,
  maxLetters = 70,
  ...stackProps
}: TimeTrackerPreviewProps) => {
  const {
    name,
    trackerId,
    description = "No description",
    trackers,
  } = groupTracker;
  const router = useRouter();

  const routeToTimeTracker = () => {
    router.push(`/group-trackers/${groupTracker.trackerId}`);
  };
  return (
    <TrackerPreviewContainer onPress={routeToTimeTracker} {...stackProps}>
      <YStack gap="$2">
        <Subtitle>{name}</Subtitle>
        <Body>{`${description.substring(0, maxLetters)}${description.length > maxLetters ? "..." : ""}`}</Body>
        <TrackerChipGrid trackers={trackers} />
      </YStack>
    </TrackerPreviewContainer>
  );
};
