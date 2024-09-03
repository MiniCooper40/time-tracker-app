import { Separator, Text, YStack } from "tamagui";
import { useUser } from "@/src/hooks/use-user";
import { detailedLabelForDay } from "@/src/util/time";
import { Header } from "@/src/components/header/header";
import { useBulkGetTimeTrackers } from "@/src/features/time-tracker/api/use-bulk-get-time-trackers";
import { useMemo } from "react";
import { useTimeTracking } from "@/src/features/time-tracker/hooks/use-time-tracking";
import { ContentCard } from "@/src/components/cards/content-card";
import { TimeTrackerPreview } from "@/src/features/time-tracker/component/time-tracker-preview";
import { Body } from "@/src/components/typography/body";
import { IconButton } from "@/src/components/input/icon-button";
import { SettingsIcon } from "@/src/components/icons/icons";
import { useRouter } from "expo-router";

const Page = () => {
  const router = useRouter();

  const labelForToday = detailedLabelForDay();

  const { activeTrackerIds } = useTimeTracking();
  const listActiveTrackers = useBulkGetTimeTrackers(activeTrackerIds);

  const activeTrackers = useMemo(
    () =>
      listActiveTrackers
        .map((tracker) => tracker.data)
        .filter((tracker): tracker is TimeTracker => tracker !== undefined),
    [listActiveTrackers],
  );

  return (
    <YStack gap="$4">
      <Header title={labelForToday}>
        <Header.Right>
          <IconButton
            icon={SettingsIcon}
            onPress={() => router.push("/home/settings")}
          />
        </Header.Right>
      </Header>
      <ContentCard overflow="hidden" padding={0}>
        <YStack>
          <Text padding="$3" fontWeight={400}>Active time trackers</Text>
          <YStack>
            {activeTrackers.map((tracker, index) => (
              <YStack  key={tracker.trackerId}>
                {index > 0 && <Separator />}
                <TimeTrackerPreview padding="$3" timeTracker={tracker} />
              </YStack>
            ))}
            {activeTrackers.length === 0 && (
              <Body padding="$3" paddingTop={0}>There are currently no active time trackers</Body>
            )}
          </YStack>
        </YStack>
      </ContentCard>
    </YStack>
  );
};

export default Page;
