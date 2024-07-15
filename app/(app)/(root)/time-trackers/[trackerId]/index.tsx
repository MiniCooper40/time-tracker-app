import {useLocalSearchParams} from "expo-router";
import {Text, View} from "tamagui";
import {
    useTimeTrackerGranularDailyAnalytics,
    useTimeTrackerGranularWeeklyAnalytics
} from "@/src/features/analytics/api/time-tracker-analytics";
import {TrackingDate} from "@/src/features/analytics/types/TrackingDate";
import {VictoryBar} from "victory-native";

const ONE_WEEK_MILLIS = 1000 * 60 * 60 * 24 * 6
const Index = () => {
    const {trackerId} = useLocalSearchParams()

    if (typeof trackerId !== "string") return <Text>Something went wrong...</Text>

    const now = new Date(Date.now() - ONE_WEEK_MILLIS)
    const trackingDate:TrackingDate = {
        year: now.getFullYear(),
        month: now.getMonth()+1,
        day: now.getDate()
    }

    const analytics = useTimeTrackerGranularWeeklyAnalytics(trackerId, trackingDate)

    return (
        <>
            {!analytics.data && <Text>Have not received</Text>}
            {analytics.data && Array.from(Object.entries(analytics.data)).map(([name, value]) => {
                return <Text key={name}>{name}: {JSON.stringify(value)}</Text>
            })}
            {analytics.data && (
                <VictoryBar width={200} x="day" y="duration" data={analytics.data.dailyAnalytics.map((t, i) => ({duration: t.totalDuration, day: i}))} />
            )}
        </>
    )
}

export default Index