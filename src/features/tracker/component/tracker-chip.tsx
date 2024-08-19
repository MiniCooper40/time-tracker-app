import { Card, Circle, XStack } from "tamagui";
import { Body } from "@/src/components/typography/body";
import { Callback } from "@/src/types/callback";

interface TrackerPreviewProps<T extends Tracker> {
  tracker: T;
  selected?: boolean;
  onSelected?: Callback<boolean>;
  selectOnPress?: boolean;
}

export const TrackerChip = <T extends Tracker>({
  tracker,
  selected,
  onSelected,
  selectOnPress,
}: TrackerPreviewProps<T>) => {
  const { color, name } = tracker;
  const select = () => {
    if (!selected || selectOnPress) onSelected?.(true);
  };
  const unselect = () => {
    if (selected || selectOnPress) onSelected?.(false);
  };

  const border = selected
    ? { borderWidth: 1, borderColor: "black", borderStyle: "solid" }
    : {};

  return (
    <Card
      onLongPress={select}
      borderRadius={70}
      onPress={unselect}
      style={{ ...border, boxSizing: "border-box", backgroundColor: "transparent" }}
    >
      <XStack
        justifyContent="center"
        alignItems="center"
        gap="$1"
        paddingVertical="$1"
        paddingHorizontal="$2"
      >
        <Body>{name}</Body>
        <Circle backgroundColor={color} size={14} />
      </XStack>
    </Card>
  );
};
