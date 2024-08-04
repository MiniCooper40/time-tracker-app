import {useListTimeTrackerGranularWeeklyAnalytics} from "@/src/features/analytics/api/list-time-tracker-analytics";
import {
    axisTicksForTrackedMillis,
    currentTrackingDate,
    detailedDayLabelsForWeekStarting,
    millisecondsToCompressedTimestamp, plusWeeks,
    shortDayLabelsForWeekStarting,
    startOfCurrentTrackingWeek, weekLabel
} from "@/src/util/time";
import {Text, YStack} from "tamagui";
import {TrackingDate} from "@/src/features/analytics/types/TrackingDate";
import {BarChart} from "@/src/components/charts/bar-chart/BarChart";
import groupTrackers from "@/app/(app)/(root)/group-trackers/(group-trackers)";
import {useMemo, useState} from "react";
import {ChartNavigation} from "@/src/components/charts/ChartNavigation";

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
                `Sessions: ${dayIndex}`,
                `Time tracked: ${dayIndex}`
            ]
        }))
    }, [isLoading, groupTracker, currentWeek])

    const values = data.map(a => a.sections.map(s => s.value).flat()).flat()
    const ticks = axisTicksForTrackedMillis(Math.max(...values)).map(value => ({
        value,
        label: millisecondsToCompressedTimestamp(value)
    }))

    const nextWeek = () => setCurrentWeek(prev => plusWeeks(prev, 1))
    const previousWeek = () => setCurrentWeek(prev => plusWeeks(prev, -1))

    return (
        <YStack>
            <ChartNavigation onIncrement={nextWeek} onDecrement={previousWeek} title={weekLabel(currentWeek)}>
                <BarChart data={data} ticks={ticks} loading={isLoading}/>
            </ChartNavigation>
        </YStack>
    )
}

export {GroupTrackerBarChart}