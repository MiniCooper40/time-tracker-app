import {Text, View} from "tamagui";
import {TrackingDate} from "@/src/features/analytics/types/TrackingDate";
import {useTimeTrackerGranularWeeklyAnalytics} from "@/src/features/analytics/api/time-tracker-analytics";
import {
    axisTicksForTrackedMillis,
    shortDayLabelsForWeekStarting,
    millisecondsToCompressedTimestamp,
    millisecondsToTimestamp,
    ONE_DAY_MILLIS,
    ONE_HOUR_MILLIS,
    detailedDayLabelsForWeekStarting,
    plusWeeks,
    weekLabel,
    plusDays,
    currentTrackingDate, startOfCurrentTrackingWeek
} from "@/src/util/time";
import {BarChart} from "@/src/components/charts/bar-chart/BarChart";
import {ChartNavigation} from "@/src/components/charts/ChartNavigation";
import {useState} from "react";
import TimeTrackers from "@/app/(app)/(root)/time-trackers/(time-trackers)";

interface TimeTrackerWeeklyAnalyticsChartProps {
    timeTracker: TimeTracker;
    startDate?: TrackingDate
}

const emptyData = new Array(7).fill(0);

const TimeTrackerWeeklyAnalyticsChart = ({
                                             timeTracker,
                                             startDate = startOfCurrentTrackingWeek()
                                         }: TimeTrackerWeeklyAnalyticsChartProps) => {

    const [week, setWeek] = useState<TrackingDate>(startDate)

    const analytics = useTimeTrackerGranularWeeklyAnalytics(timeTracker.trackerId, week)
    const dayLabels = shortDayLabelsForWeekStarting(startDate)
    const detailedDayLabels = detailedDayLabelsForWeekStarting(week)
    const dailyAnalytics = analytics.data?.dailyAnalytics ?? emptyData.map(() => ({
        totalDuration: 0,
        numberOfSessions: 0
    }))
    const weeklyData = dailyAnalytics
        .map((t, i) => ({
            value: t.totalDuration,
            label: dayLabels[i],
            detailedLabel: detailedDayLabels[i],
            tooltipEntries: [
                `Sessions: ${t.numberOfSessions}`,
                `Time tracked: ${millisecondsToCompressedTimestamp(t.totalDuration)}`
            ]
        })) ?? []

    const nextWeek = () => setWeek(prev => plusWeeks(prev, 1))
    const previousWeek = () => setWeek(prev => plusWeeks(prev, -1))

    const ticks = axisTicksForTrackedMillis(Math.max(...weeklyData.map(({value}) => value))).map(value => ({
        value,
        label: millisecondsToCompressedTimestamp(value)
    }))

    return (
        <ChartNavigation title={weekLabel(week)} onIncrement={nextWeek} onDecrement={previousWeek}>
            {<BarChart ticks={ticks} data={weeklyData} loading={analytics.isLoading} color={timeTracker.color}/>}
        </ChartNavigation>
    )
}
export {TimeTrackerWeeklyAnalyticsChart}