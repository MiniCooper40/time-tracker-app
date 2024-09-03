import { CardProps } from "tamagui";
import { TrackerCardContainer } from "@/src/components/cards/tracker-card-container";
import { TimeTrackerPreview } from "@/src/features/time-tracker/component/time-tracker-preview";

type TimeTrackerCardProps = {
  timeTracker: TimeTracker;
  maxLetters?: number;
} & CardProps;

export const TimeTrackerCard = ({
  timeTracker,
  maxLetters = 70,
  ...cardProps
}: TimeTrackerCardProps) => {
  return (
    <TrackerCardContainer {...cardProps}>
      <TimeTrackerPreview padding="$3" timeTracker={timeTracker} />
    </TrackerCardContainer>
  );
};
