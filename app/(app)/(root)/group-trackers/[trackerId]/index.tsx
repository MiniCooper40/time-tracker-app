import { router, useLocalSearchParams } from "expo-router";
import { Text, YStack } from "tamagui";
import { TrackerChipGrid } from "@/src/features/tracker/component/tracker-chip-grid";
import { useGetGroupTracker } from "@/src/features/group-tracker/api/use-get-group-tracker";
import { GroupTrackerBarChart } from "@/src/features/group-tracker/components/group-tracker-bar-chart";
import { ContentCard } from "@/src/components/cards/content-card";
import { Header } from "@/src/components/header/header";
import { Body } from "@/src/components/typography/body";
import { IconButton } from "@/src/components/input/icon-button";
import { BackArrowIcon, EditIcon } from "@/src/components/icons/icons";

const Index = () => {
  const { trackerId } = useLocalSearchParams();

  if (typeof trackerId !== "string")
    return <Text>Something went wrong...</Text>;

  const groupTracker = useGetGroupTracker(trackerId);

  if (!groupTracker.data) return <Text>Loading...</Text>;

  return (
    <YStack gap="$4">
      <YStack gap="$3" justifyContent="center">
        <Header title={groupTracker.data.name}>
          <Header.Left>
            <IconButton icon={BackArrowIcon} onPress={router.back} />
          </Header.Left>
          <Header.Right>
            <IconButton
              icon={EditIcon}
              onPress={() => router.push(`/group-trackers/${trackerId}/edit`)}
            />
          </Header.Right>
        </Header>
        <Text>{groupTracker.data.description}</Text>
      </YStack>
      <ContentCard>
        <YStack gap="$2">
          <Text fontWeight={400}>Time trackers</Text>
          {groupTracker.data.trackers.length > 0 && (
            <TrackerChipGrid trackers={groupTracker.data.trackers} />
          )}
          {groupTracker.data.trackers.length === 0 && (
            <Body>This group does not have any time trackers</Body>
          )}
        </YStack>
      </ContentCard>
      <ContentCard>
        <GroupTrackerBarChart groupTracker={groupTracker.data} />
      </ContentCard>
    </YStack>
  );
};

export default Index;
