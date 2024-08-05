import {useListTimeTrackerGranularWeeklyAnalytics} from "@/src/features/analytics/api/list-time-tracker-analytics";
import {
    axisTicksForTrackedMillis,
    detailedDayLabelsForWeekStarting,
    millisecondsToCompressedTimestamp,
    plusWeeks,
    shortDayLabelsForWeekStarting,
    startOfCurrentTrackingWeek,
    weekLabel
} from "@/src/util/time";
import {YStack} from "tamagui";
import {TrackingDate} from "@/src/features/analytics/types/TrackingDate";
import {BarChart} from "@/src/components/charts/bar-chart/BarChart";
import {useMemo, useState} from "react";
import {ChartNavigation} from "@/src/components/charts/ChartNavigation";
import {sum} from "@/src/util/math";

interface GroupTrackerBarChartProps {
    groupTracker: GroupTracker,
    startDate?: TrackingDate
}

const GroupTrackerBarChart = ({groupTracker, startDate = startOfCurrentTrackingWeek()}: GroupTrackerBarChartProps) => {

    const [currentWeek, setCurrentWeek] = useState(startDate)

    const listTrackerAnalytics = useListTimeTrackerGranularWeeklyAnalytics(
        groupTracker.trackers.map(t => t.trackerId),
        currentWeek
    )

    const dayLabels = shortDayLabelsForWeekStarting(startDate)
    const detailedDayLabels = detailedDayLabelsForWeekStarting(startDate)

    const isLoading = useMemo(() => {
        for (const getAnalytics of listTrackerAnalytics) {
            if (getAnalytics.isFetching) return true
        }
        return false
    }, [listTrackerAnalytics])

    const data = useMemo(() => {
        return new Array(7).fill(0).map((_, dayIndex) => ({
            sections: groupTracker.trackers.map((tracker, trackerIndex) => ({
                value: listTrackerAnalytics[trackerIndex].data?.dailyAnalytics[dayIndex].totalDuration ?? 0,
                color: tracker.color
            })),
            label: dayLabels[dayIndex],
            detailedLabel: detailedDayLabels[dayIndex],
            tooltipEntries: [
                `Sessions: ${sum(...listTrackerAnalytics.map(analytics => analytics.data?.dailyAnalytics[dayIndex].numberOfSessions ?? 0))}`,
                `Tracked: ${millisecondsToCompressedTimestamp(sum(...listTrackerAnalytics.map(analytics => analytics.data?.dailyAnalytics[dayIndex].totalDuration ?? 0)))}`
            ]
        }))
    }, [isLoading, groupTracker, currentWeek])

    const values = data.map(a => sum(...a.sections.map(s => s.value))).flat()
    const ticks = axisTicksForTrackedMillis(Math.max(...values)).map(value => ({
        value,
        label: millisecondsToCompressedTimestamp(value)
    }))

    const nextWeek = () => setCurrentWeek(prev => plusWeeks(prev, 1))
    const previousWeek = () => setCurrentWeek(prev => plusWeeks(prev, -1))

    return (
        <YStack>
            <ChartNavigation onIncrement={nextWeek} onDecrement={previousWeek} title={weekLabel(currentWeek)}>
                <BarChart data={data} ticks={ticks} loading={isLoading} barSpacing={28}/>
            </ChartNavigation>
        </YStack>
    )
}

export {GroupTrackerBarChart}