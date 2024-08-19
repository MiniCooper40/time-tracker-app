import { useSaveTrackedTime } from "@/src/features/time-tracker/api/save-tracked-time";
import { Stopwatch, StopwatchProps } from "@/src/components/timer/stopwatch";
import { asLocalDateTime, timestampForTrackedTime } from "@/src/util/time";
import { useTrackTime } from "@/src/features/time-tracker/hooks/use-track-time";
import { useToastController } from "@tamagui/toast";
import { CurrentToast } from "@/src/components/toasts/Toast";

type TimeTrackerStopwatchProps = {
  trackerId: string;
} & Partial<StopwatchProps>;

export const TimeTrackerStopwatch = ({
  trackerId,
  ...stopwatchProps
}: TimeTrackerStopwatchProps) => {
  const toast = useToastController();
  const { startTime, startTracking, endTracking } = useTrackTime(trackerId);

  const saveTrackedTime = useSaveTrackedTime(trackerId, {
    onSuccess: (trackedTime) => endTracking(),
  });

  const handleSaveTrackedTime = (endTime: number) => {
    if (!startTime) throw Error("failed to save, start time was undefined");
    saveTrackedTime.mutate(
      {
        startTime: asLocalDateTime(startTime),
        endTime: asLocalDateTime(endTime),
      },
      {
        onSuccess: (trackedTime) => {
          toast.show(`Tracked ${timestampForTrackedTime(trackedTime)}`, {
            native: "mobile",
          });
        },
      },
    );
  };

  return (
    <>
      <CurrentToast />
      <Stopwatch
        {...stopwatchProps}
        startTime={startTime}
        loading={saveTrackedTime.isLoading}
        onStop={handleSaveTrackedTime}
        onStart={startTracking}
      />
    </>
  );
};
