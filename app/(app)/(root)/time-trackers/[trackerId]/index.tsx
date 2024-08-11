import {router, useLocalSearchParams} from "expo-router";
import {Card, Separator, Text, YStack} from "tamagui";
import {
    TimeTrackerWeeklyAnalyticsChart
} from "@/src/features/time-tracker/component/time-tracker-weekly-analytics-chart";
import {currentTrackingDate, millisecondsToCompressedTimestamp, plusDays,} from "@/src/util/time";
import {useTimeTracker} from "@/src/features/time-tracker/hooks/useTimeTracker";
import {useGetTimeTracker} from "@/src/features/time-tracker/api/use-get-time-tracker";
import {Title} from "@/src/components/typography/Title";
import {TrackerPreviewGrid} from "@/src/components/tracker-preview/tracker-preview-grid";
import {Calender} from "@/src/components/charts/calender/Calender";
import {useTimeTrackerGranularMonthlyAnalytics} from "@/src/features/analytics/api/time-tracker-analytics";
import {TimeTrackerOverviewDailyAnalytics} from "@/src/features/analytics/types/TimeTrackerAnalytics";
import {TimeTrackerMonthlyHeatmap} from "@/src/features/time-tracker/component/time-tracker-monthly-heatmap";
import {TimeTrackerStopwatch} from "@/src/features/time-tracker/component/time-tracker-stopwatch";
import {Body} from "@/src/components/typography/Body";
import {Header} from "@/src/components/header/Header";
import {ContentCard} from "@/src/components/cards/content-card";

const Index = () => {
    const {trackerId} = useLocalSearchParams()

    if (typeof trackerId !== "string") return <Text>Something went wrong...</Text>

    const getTimeTracker = useGetTimeTracker(trackerId)


    if (!getTimeTracker.data) return <Text>Loading...</Text>

    return (
        <YStack gap="$4">
            <YStack gap="$3" justifyContent="center">
                <Header title={getTimeTracker.data.name} onBack={router.back}
                        onEdit={() => router.push(`/time-trackers/${trackerId}/edit`)}/>
                <TimeTrackerStopwatch fontSize="$7" iconSize={54} trackerId={trackerId}/>
                <Body>{getTimeTracker.data.description}</Body>
            </YStack>
            <ContentCard>
                <TimeTrackerWeeklyAnalyticsChart timeTracker={getTimeTracker.data}/>
            </ContentCard>
            <ContentCard>
                <TimeTrackerMonthlyHeatmap timeTracker={getTimeTracker.data}/>
            </ContentCard>
        </YStack>
    )
}

export default Index