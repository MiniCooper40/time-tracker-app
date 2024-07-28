import {useLocalSearchParams} from "expo-router";
import {Separator, Text, YStack} from "tamagui";
import {
    TimeTrackerWeeklyAnalyticsChart
} from "@/src/features/time-tracker/component/time-tracker-weekly-analytics-chart";
import {currentTrackingDate, plusDays,} from "@/src/util/time";
import {useTimeTracker} from "@/src/features/time-tracker/hooks/useTimeTracker";
import {useGetTimeTracker} from "@/src/features/time-tracker/api/use-get-time-tracker";
import {Title} from "@/src/components/typography/Title";
import {TrackerPreviewGrid} from "@/src/components/tracker-preview/tracker-preview-grid";
import {Calender} from "@/src/components/charts/calender/Calender";

const Index = () => {
    const {trackerId} = useLocalSearchParams()

    if (typeof trackerId !== "string") return <Text>Something went wrong...</Text>

    const timeTracker = useGetTimeTracker(trackerId)

    const initialTrackingDate = plusDays(currentTrackingDate(), -6)

    if (!timeTracker.data) return <Text>Loading...</Text>

    console.log({data: timeTracker.data})

    return (
        <YStack gap="$4">
            <YStack>
                <Title theme="h1">{timeTracker.data.name}</Title>
                <Text>{timeTracker.data.description}</Text>
            </YStack>
            <Separator />
            <TrackerPreviewGrid trackers={timeTracker.data.groups} />
            <TimeTrackerWeeklyAnalyticsChart trackerId={trackerId} startDate={initialTrackingDate} />
            <Calender year={2024} month={7} />
        </YStack>
    )
}

export default Index