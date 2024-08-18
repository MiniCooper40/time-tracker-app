import { useField } from "formik";
import { useCallback, useEffect, useState } from "react";
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
import { TrackerPreviewGrid } from "@/src/components/tracker-preview/tracker-preview-grid";
import { IconButton } from "@/src/components/input/icon-button";
import { AntDesign } from "@expo/vector-icons";
import { Search } from "@/src/components/input/search";
import { useQueryTimeTrackers } from "@/src/features/time-tracker/api/use-query-time-trackers";

interface FormikGroupSelectProps {
  name: string;
  userId: string;
  initialTimeTrackers?: TimeTracker[];
}

export const FormikTimeTrackerSelect = ({
  name,
  userId,
  initialTimeTrackers = [],
}: FormikGroupSelectProps) => {
  const [field, meta, helpers] = useField<string[]>(name);
  const [query, setQuery] = useState("");
  const [selectedTrackers, setSelectedTrackers] = useState(initialTimeTrackers);
  const TimeTrackerQuery = useQueryTimeTrackers(
    { query, userId },
    {
      enabled: query.length >= 0,
    },
  );

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    if (initialTimeTrackers) {
      helpers.setValue(selectedTrackers.map(({ trackerId }) => trackerId));
    }
  }, [selectedTrackers]);

  const isGroupSelected = useCallback(
    (group: TimeTracker) => {
      return selectedTrackers.some((g) => g.trackerId === group.trackerId);
    },
    [selectedTrackers],
  );

  const toggleSelected = useCallback(
    (group: TimeTracker) => {
      if (isGroupSelected(group))
        setSelectedTrackers((prev) =>
          prev.filter((t) => t.trackerId !== group.trackerId),
        );
      else setSelectedTrackers((prev) => [...prev, group]);
    },
    [isGroupSelected],
  );

  const [selectedForDeletion, setSelectedForDeletion] = useState(
    [] as TimeTracker[],
  );
  const isGroupSelectedForDeletion = useCallback(
    (group: TimeTracker) => {
      return selectedForDeletion.some((g) => g.trackerId === group.trackerId);
    },
    [selectedForDeletion],
  );
  const toggleSelectedForDeletion = useCallback(
    (group: TimeTracker) => {
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
          <Label>Time trackers</Label>
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
      <TrackerPreviewGrid
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
              query={TimeTrackerQuery}
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
