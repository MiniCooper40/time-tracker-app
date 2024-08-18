import { useTimeTrackerGranularMonthlyAnalytics } from "@/src/features/analytics/api/time-tracker-analytics";
import { Calender } from "@/src/components/charts/calender/calender";
import { TimeTrackerOverviewDailyAnalytics } from "@/src/features/analytics/types/time-tracker-analytics";
import {
  currentTrackingMonth,
  labelForMonth,
  millisecondsToCompressedTimestamp,
  plusMonths,
} from "@/src/util/time";
import { TrackingMonth } from "@/src/features/analytics/types/tracking-date";
import { useState } from "react";
import { ChartNavigation } from "@/src/components/charts/chart-navigation";

interface TimeTrackerMonthlyHeatmapProps {
  timeTracker: TimeTracker;
  initialMonth?: TrackingMonth;
}

const TimeTrackerMonthlyHeatmap = ({
  timeTracker,
  initialMonth = currentTrackingMonth(),
}: TimeTrackerMonthlyHeatmapProps) => {
  const [currentMonth, setCurrentMonth] = useState<TrackingMonth>(initialMonth);

  const getMonthlyData = useTimeTrackerGranularMonthlyAnalytics(
    timeTracker.trackerId,
    currentMonth,
  );
  const { data: monthlyData } = getMonthlyData;

  const selectWeightForDay = (day: TimeTrackerOverviewDailyAnalytics) =>
    day.totalDuration;
  const selectTooltipEntriesForDay = (
    day: TimeTrackerOverviewDailyAnalytics,
  ) => {
    return [
      `Sessions: ${day.numberOfSessions}`,
      `Tracked: ${millisecondsToCompressedTimestamp(day.totalDuration)}`,
    ];
  };

  const handleIncrementMonth = () =>
    setCurrentMonth((prev) => plusMonths(currentMonth, 1));
  const handleDecrementMonth = () =>
    setCurrentMonth((prev) => plusMonths(currentMonth, -1));

  return (
    <ChartNavigation
      onIncrement={handleIncrementMonth}
      onDecrement={handleDecrementMonth}
      title={labelForMonth(currentMonth)}
    >
      <Calender
        year={currentMonth.year}
        month={currentMonth.month}
        data={
          getMonthlyData.isFetching || !getMonthlyData.data
            ? undefined
            : getMonthlyData.data.dailyAnalytics
        }
        selectWeight={selectWeightForDay}
        selectTooltipEntries={selectTooltipEntriesForDay}
        color={timeTracker.color}
      />
    </ChartNavigation>
  );
};

export { TimeTrackerMonthlyHeatmap };
