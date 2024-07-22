import {Text, View} from "tamagui";
import {TrackingDate} from "@/src/features/analytics/types/TrackingDate";
import {useTimeTrackerGranularWeeklyAnalytics} from "@/src/features/analytics/api/time-tracker-analytics";
import {
    axisTicksForTrackedMillis,
    shortDayLabelsForWeekStarting,
    millisecondsToCompressedTimestamp,
    millisecondsToTimestamp,
    ONE_DAY_MILLIS, ONE_HOUR_MILLIS, detailedDayLabelsForWeekStarting
} from "@/src/util/time";
import {BarChart} from "@/src/components/charts/bar-chart/BarChart";

interface TimeTrackerWeeklyAnalyticsChartProps {
    trackerId: string;
    startDate: TrackingDate
}

const TimeTrackerWeeklyAnalyticsChart = ({trackerId, startDate}: TimeTrackerWeeklyAnalyticsChartProps) => {

    const analytics = useTimeTrackerGranularWeeklyAnalytics(trackerId, startDate)
    const dayLabels = shortDayLabelsForWeekStarting(startDate)
    const detailedDayLabels = detailedDayLabelsForWeekStarting(startDate)
    const weeklyData = analytics.data?.dailyAnalytics
        .map((t, i) => ({
            value: t.totalDuration,
            label: dayLabels[i],
            detailedLabel: detailedDayLabels[i],
            tooltipEntries: [
                `Sessions: ${t.numberOfSessions}`,
                `Time tracked: ${millisecondsToCompressedTimestamp(t.totalDuration)}`
            ]
        })) ?? []

    console.log(dayLabels)

    const ticks = axisTicksForTrackedMillis(Math.max(...weeklyData.map(({value}) => value))).map(value => ({value, label: millisecondsToCompressedTimestamp(value)}))

    return (
        <>
            {!analytics.data && <Text>Have not received</Text>}
            {analytics.isFetched && <BarChart ticks={ticks} data={weeklyData} />}
        </>
    )
}
export {TimeTrackerWeeklyAnalyticsChart}