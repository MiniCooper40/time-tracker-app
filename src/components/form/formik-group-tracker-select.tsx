import { useField } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useQueryGroupTrackers } from "@/src/features/group-tracker/api/use-query-group-trackers";
import {
  Adapt,
  Button,
  ButtonText,
  Dialog,
  Label,
  Sheet,
  Text,
  XStack,
  YStack,
} from "tamagui";
import { TrackerChipGrid } from "@/src/features/tracker/component/tracker-chip-grid";
import { IconButton } from "@/src/components/input/icon-button";
import { AntDesign } from "@expo/vector-icons";
import { Search } from "@/src/components/input/search";

interface FormikGroupSelectProps {
  name: string;
  userId: string;
  initialGroupTrackers?: GroupTracker[];
}

export const FormikGroupTrackerSelect = ({
  name,
  userId,
  initialGroupTrackers = [],
}: FormikGroupSelectProps) => {
  const [field, meta, helpers] = useField<string[]>(name);
  const [query, setQuery] = useState("");
  const [selectedTrackers, setSelectedTrackers] =
    useState<GroupTracker[]>(initialGroupTrackers);
  const groupTrackerQuery = useQueryGroupTrackers(
    { query, userId },
    {
      enabled: query.length >= 0,
    },
  );

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    if (initialGroupTrackers) {
      helpers.setValue(selectedTrackers.map(({ trackerId }) => trackerId));
    }
  }, [selectedTrackers]);

  const isGroupSelected = useCallback(
    (group: GroupTracker) => {
      return selectedTrackers.some((g) => g.trackerId === group.trackerId);
    },
    [selectedTrackers],
  );

  const toggleSelected = useCallback(
    (group: GroupTracker) => {
      if (isGroupSelected(group))
        setSelectedTrackers((prev) =>
          prev.filter((t) => t.trackerId !== group.trackerId),
        );
      else setSelectedTrackers((prev) => [...prev, group]);
    },
    [isGroupSelected],
  );

  const [selectedForDeletion, setSelectedForDeletion] = useState(
    [] as GroupTracker[],
  );
  const isGroupSelectedForDeletion = useCallback(
    (group: GroupTracker) => {
      return selectedForDeletion.some((g) => g.trackerId === group.trackerId);
    },
    [selectedForDeletion],
  );
  const toggleSelectedForDeletion = useCallback(
    (group: GroupTracker) => {
      if (isGroupSelectedForDeletion(group))
        setSelectedForDeletion((prev) =>
          prev.filter((t) => t.trackerId !== group.trackerId),
        );
      else setSelectedForDeletion((prev) => [group, ...prev]);
    },
    [isGroupSelectedForDeletion],
  );

  const deleteSelectedTrackers = () => {
    setSelectedTrackers((prev) =>
      prev.filter(
        (group) =>
          !selectedForDeletion.some((g) => g.trackerId === group.trackerId),
      ),
    );
    setSelectedForDeletion([]);
  };

  return (
    <YStack>
      <XStack width="100%" justifyContent="space-between">
        <XStack alignItems="center" gap="$2">
          <Label>Group trackers</Label>
          <IconButton
            onPress={() => setIsSearchModalOpen(true)}
            icon={<AntDesign name="plus" size={18} color="black" />}
          />
        </XStack>
        {selectedForDeletion.length > 0 && (
          <XStack alignItems="center">
            <Button color="error" onPress={deleteSelectedTrackers}>
              <Text>Remove {selectedForDeletion.length} trackers</Text>
            </Button>
          </XStack>
        )}
      </XStack>
      <TrackerChipGrid
        trackers={selectedTrackers}
        onSelect={toggleSelectedForDeletion}
        isSelected={isGroupSelectedForDeletion}
        selectOnPress={selectedForDeletion.length > 0}
      />
      <Dialog open={isSearchModalOpen} onOpenChange={setIsSearchModalOpen}>
        <Adapt when="sm" platform="touch">
          <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
            <Sheet.Frame padding="$4" gap="$4">
              <Adapt.Contents />
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>
        <Dialog.Portal>
          <Dialog.Overlay key="overlay" />
          <Dialog.Content key="content" style={{ width: "90%", height: "70%" }}>
            <Search
              queryText={query}
              onChangeQueryText={setQuery}
              query={groupTrackerQuery}
              extractKey={(group) => group.trackerId}
              extractLabel={(group) => group.name}
              isSelected={isGroupSelected}
              toggleSelected={toggleSelected}
            />
            <Dialog.Close asChild>
              <ButtonText>Close</ButtonText>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </YStack>
  );
};
