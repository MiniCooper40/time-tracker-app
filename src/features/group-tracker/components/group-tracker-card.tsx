import { CardProps } from "tamagui";
import { TrackerCardContainer } from "@/src/components/cards/tracker-card-container";
import { GroupTrackerPreview } from "@/src/features/group-tracker/components/group-tracker-preview";

type GroupTrackerCardProps = {
  groupTracker: GroupTracker;
} & CardProps;

export const GroupTrackerCard = ({
  groupTracker,
  ...cardProps
}: GroupTrackerCardProps) => {
  return (
    <TrackerCardContainer {...cardProps}>
      <GroupTrackerPreview groupTracker={groupTracker} padding="$3" />
    </TrackerCardContainer>
  );
};
