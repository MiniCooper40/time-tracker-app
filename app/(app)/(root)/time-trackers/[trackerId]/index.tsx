import {useLocalSearchParams} from "expo-router";
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

const Index = () => {
    const {trackerId} = useLocalSearchParams()

    if (typeof trackerId !== "string") return <Text>Something went wrong...</Text>

    const getTimeTracker = useGetTimeTracker(trackerId)


    if (!getTimeTracker.data) return <Text>Loading...</Text>

    return (
        <YStack gap="$4">
            <YStack gap="$2">
                <Title>{getTimeTracker.data.name}</Title>
                <TimeTrackerStopwatch fontSize="$7" iconSize={70} trackerId={trackerId} />
                <Text>{getTimeTracker.data.description}</Text>
            </YStack>
            <Separator />
            <Card padding="$3">
                <TimeTrackerWeeklyAnalyticsChart timeTracker={getTimeTracker.data} />
            </Card>
            <Card padding="$3">
                <TimeTrackerMonthlyHeatmap timeTracker={getTimeTracker.data} />
            </Card>
        </YStack>
    )
}

export default Index