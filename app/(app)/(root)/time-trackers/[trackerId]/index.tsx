import {useLocalSearchParams} from "expo-router";
import {Text} from "tamagui";
import {TrackingDate} from "@/src/features/analytics/types/TrackingDate";
import {
    TimeTrackerWeeklyAnalyticsChart
} from "@/src/features/time-tracker/component/time-tracker-weekly-analytics-chart";
import {ONE_HOUR_MILLIS, ONE_WEEK_MILLIS} from "@/src/util/time";

const Index = () => {
    const {trackerId} = useLocalSearchParams()

    if (typeof trackerId !== "string") return <Text>Something went wrong...</Text>

    const weekStartMillis = Date.now() - ONE_WEEK_MILLIS - ONE_HOUR_MILLIS

    const weekStartDate = new Date(weekStartMillis)
    const trackingDate: TrackingDate = {
        year: weekStartDate.getFullYear(),
        month: weekStartDate.getMonth()+1,
        day: weekStartDate.getDate()
    }
    console.log("week start date: ", trackingDate)

    return (
        <TimeTrackerWeeklyAnalyticsChart trackerId={trackerId} startDate={trackingDate} />
    )
}

export default Index