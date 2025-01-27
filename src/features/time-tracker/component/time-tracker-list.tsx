import { YStack } from "tamagui";
import { TimeTrackerCard } from "@/src/features/time-tracker/component/time-tracker-card";

interface TimeTrackerListProps {
  timeTrackers: TimeTracker[];
}

export const TimeTrackerList = ({ timeTrackers }: TimeTrackerListProps) => {
  return (
    <YStack gap="$4">
      {timeTrackers.map((timeTracker) => (
        <TimeTrackerCard
          timeTracker={timeTracker}
          key={timeTracker.trackerId}
        />
      ))}
    </YStack>
  );
};
