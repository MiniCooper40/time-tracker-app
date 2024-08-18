import { useAsyncStorage } from "@/src/hooks/use-async-storage";
import { Callback } from "@/src/types/callback";

export interface TimeTrackingState {
  startTime: number | undefined,
  loading: boolean;
  setStartTime: Callback<string | undefined>
}

export const useTimeTracker = (trackerId: string): TimeTrackingState => {
  console.log(`in useTimeTracker w/ trackerId  ${trackerId}`)
  const { value, setValue, loading } = useAsyncStorage(
      `start-time-${trackerId}`,
  );

  return {
    startTime: value && parseInt(value) ? parseInt(value) : undefined,
    loading,
    setStartTime: setValue,
  };
};
