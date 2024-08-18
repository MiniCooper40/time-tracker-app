import { useSaveTrackedTime } from "@/src/features/time-tracker/api/save-tracked-time";
import { Stopwatch, StopwatchProps } from "@/src/components/timer/stopwatch";
import { asLocalDateTime } from "@/src/util/time";
import { useTimeTracker } from "@/src/features/time-tracker/hooks/use-time-tracker";

type TimeTrackerStopwatchProps = {
  trackerId: string;
} & Partial<StopwatchProps>;

export const TimeTrackerStopwatch = ({
  trackerId,
  ...stopwatchProps
}: TimeTrackerStopwatchProps) => {
  const { startTime, setStartTime, loading } = useTimeTracker(trackerId);

  const saveTrackedTime = useSaveTrackedTime(trackerId, {
    onSuccess: (trackedTime) => {
      setStartTime(undefined);
    },
  });

  const handleSaveTrackedTime = (endTime: number) => {
    if (!startTime) throw Error("failed to save, start time was undefined");
    saveTrackedTime.mutate({
      startTime: asLocalDateTime(startTime),
      endTime: asLocalDateTime(endTime),
    });
  };

  const handleStartTrackedTime = (startTime: number) => {
    setStartTime(JSON.stringify(startTime));
  };

  return (
    <Stopwatch
      {...stopwatchProps}
      startTime={startTime}
      loading={loading || saveTrackedTime.isLoading}
      onStop={handleSaveTrackedTime}
      onStart={handleStartTrackedTime}
    />
  );
};
