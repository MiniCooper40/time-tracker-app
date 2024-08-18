import { router, useLocalSearchParams } from "expo-router";
import { Text, YStack } from "tamagui";
import { TrackerPreviewGrid } from "@/src/components/tracker-preview/tracker-preview-grid";
import { useGetGroupTracker } from "@/src/features/group-tracker/api/use-get-group-tracker";
import { GroupTrackerBarChart } from "@/src/features/group-tracker/components/group-tracker-bar-chart";
import { ContentCard } from "@/src/components/cards/content-card";
import { Header } from "@/src/components/header/header";

const Index = () => {
  const { trackerId } = useLocalSearchParams();

  if (typeof trackerId !== "string")
    return <Text>Something went wrong...</Text>;

  const groupTracker = useGetGroupTracker(trackerId);

  if (!groupTracker.data) return <Text>Loading...</Text>;

  return (
    <YStack gap="$4">
      <YStack gap="$3" justifyContent="center">
        <Header
          title={groupTracker.data.name}
          onBack={router.back}
          onEdit={() => router.push(`/group-trackers/${trackerId}/edit`)}
        />
        <Text>{groupTracker.data.description}</Text>
      </YStack>
      {groupTracker.data.trackers.length > 0 && (
        <ContentCard>
          <TrackerPreviewGrid trackers={groupTracker.data.trackers} />
        </ContentCard>
      )}
      <ContentCard>
        <GroupTrackerBarChart groupTracker={groupTracker.data} />
      </ContentCard>
    </YStack>
  );
};

export default Index;
