import {useLocalSearchParams} from "expo-router";
import {Separator, Text, YStack} from "tamagui";
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

const Index = () => {
    const {trackerId} = useLocalSearchParams()

    if (typeof trackerId !== "string") return <Text>Something went wrong...</Text>

    const getTimeTracker = useGetTimeTracker(trackerId)


    if (!getTimeTracker.data) return <Text>Loading...</Text>

    console.log({data: getTimeTracker.data})



    return (
        <YStack gap="$4">
            <YStack>
                <Title theme="h1">{getTimeTracker.data.name}</Title>
                <Text>{getTimeTracker.data.description}</Text>
            </YStack>
            <Separator />
            <TimeTrackerWeeklyAnalyticsChart timeTracker={getTimeTracker.data} />
            <TimeTrackerMonthlyHeatmap timeTracker={getTimeTracker.data} />
        </YStack>
    )
}

export default Index