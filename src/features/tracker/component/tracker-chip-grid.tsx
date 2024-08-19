import { XStack } from "tamagui";
import { TrackerChip } from "@/src/features/tracker/component/tracker-chip";
import { Callback } from "@/src/types/callback";

interface TrackerPreviewGridProps<T extends Tracker> {
  trackers: T[];
  isSelected?: Callback<T, boolean>;
  onSelect?: Callback<T>;
  selectOnPress?: boolean;
}

export const TrackerChipGrid = <T extends Tracker>({
  trackers,
  isSelected,
  onSelect,
  selectOnPress,
}: TrackerPreviewGridProps<T>) => {
  return (
    <XStack rowGap="$1" columnGap="$3" flexWrap="wrap">
      {trackers.map((tracker) => (
        <TrackerChip
          selected={isSelected?.(tracker)}
          onSelected={() => onSelect?.(tracker)}
          tracker={tracker}
          key={tracker.trackerId}
          selectOnPress={selectOnPress}
        />
      ))}
    </XStack>
  );
};
