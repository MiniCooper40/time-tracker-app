import { TrackingDate } from "@/src/features/analytics/types/tracking-date";
import { useTimeTrackerGranularWeeklyAnalytics } from "@/src/features/analytics/api/time-tracker-analytics";
import {
  axisTicksForTrackedMillis,
  detailedDayLabelsForWeekStarting,
  millisecondsToCompressedTimestamp,
  plusWeeks,
  shortDayLabelsForWeekStarting,
  startOfCurrentTrackingWeek,
  weekLabel,
} from "@/src/util/time";
import { BarChart } from "@/src/components/charts/bar-chart/bar-chart";
import { ChartNavigation } from "@/src/components/charts/chart-navigation";
import { useState } from "react";

interface TimeTrackerWeeklyAnalyticsChartProps {
  timeTracker: TimeTracker;
  startDate?: TrackingDate;
}

const emptyData = new Array(7).fill(0);

const TimeTrackerWeeklyAnalyticsChart = ({
  timeTracker,
  startDate = startOfCurrentTrackingWeek(),
}: TimeTrackerWeeklyAnalyticsChartProps) => {
  const [week, setWeek] = useState<TrackingDate>(startDate);

  const analytics = useTimeTrackerGranularWeeklyAnalytics(
    timeTracker.trackerId,
    week,
  );
  const dayLabels = shortDayLabelsForWeekStarting(startDate);
  const detailedDayLabels = detailedDayLabelsForWeekStarting(week);
  const dailyAnalytics =
    analytics.data?.dailyAnalytics ??
    emptyData.map(() => ({
      totalDuration: 0,
      numberOfSessions: 0,
    }));
  const weeklyData =
    dailyAnalytics.map((t, i) => ({
      sections: [
        {
          value: t.totalDuration,
          color: timeTracker.color,
        },
      ],
      label: dayLabels[i],
      detailedLabel: detailedDayLabels[i],
      tooltipEntries: [
        `Sessions: ${t.numberOfSessions}`,
        `Tracked: ${millisecondsToCompressedTimestamp(t.totalDuration)}`,
      ],
    })) ?? [];

  const nextWeek = () => setWeek((prev) => plusWeeks(prev, 1));
  const previousWeek = () => setWeek((prev) => plusWeeks(prev, -1));

  const ticks = axisTicksForTrackedMillis(
    Math.max(...weeklyData.map(({ sections }) => sections[0].value)),
  ).map((value) => ({
    value,
    label: millisecondsToCompressedTimestamp(value),
  }));

  return (
    <ChartNavigation
      title={weekLabel(week)}
      onIncrement={nextWeek}
      onDecrement={previousWeek}
    >
      {
        <BarChart
          ticks={ticks}
          data={weeklyData}
          loading={analytics.isLoading}
          barSpacing={28}
          color={timeTracker.color}
        />
      }
    </ChartNavigation>
  );
};
export { TimeTrackerWeeklyAnalyticsChart };
