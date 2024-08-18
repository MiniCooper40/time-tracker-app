import { router, useLocalSearchParams } from "expo-router";
import { Text, YStack } from "tamagui";
import { TimeTrackerWeeklyAnalyticsChart } from "@/src/features/time-tracker/component/time-tracker-weekly-analytics-chart";
import { useGetTimeTracker } from "@/src/features/time-tracker/api/use-get-time-tracker";
import { TrackerPreviewGrid } from "@/src/components/tracker-preview/tracker-preview-grid";
import { TimeTrackerMonthlyHeatmap } from "@/src/features/time-tracker/component/time-tracker-monthly-heatmap";
import { TimeTrackerStopwatch } from "@/src/features/time-tracker/component/time-tracker-stopwatch";
import { Body } from "@/src/components/typography/body";
import { Header } from "@/src/components/header/header";
import { ContentCard } from "@/src/components/cards/content-card";

const Index = () => {
  const { trackerId } = useLocalSearchParams();

  if (typeof trackerId !== "string")
    return <Text>Something went wrong...</Text>;

  const timeTracker = useGetTimeTracker(trackerId);

  if (!timeTracker.data) return <Text>Loading...</Text>;

  return (
    <YStack gap="$4">
      <YStack gap="$3" justifyContent="center">
        <Header
          title={timeTracker.data.name}
          onBack={router.back}
          onEdit={() => router.push(`/time-trackers/${trackerId}/edit`)}
        />
        <TimeTrackerStopwatch
          fontSize="$7"
          iconSize={54}
          trackerId={trackerId}
        />
        <Body>{timeTracker.data.description}</Body>
      </YStack>
      {timeTracker.data.groups.length > 0 && (
        <ContentCard>
          <TrackerPreviewGrid trackers={timeTracker.data.groups} />
        </ContentCard>
      )}
      <ContentCard>
        <TimeTrackerWeeklyAnalyticsChart timeTracker={timeTracker.data} />
      </ContentCard>
      <ContentCard>
        <TimeTrackerMonthlyHeatmap timeTracker={timeTracker.data} />
      </ContentCard>
    </YStack>
  );
};

export default Index;
