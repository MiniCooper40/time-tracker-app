import { useTimeTracking } from "@/src/features/time-tracker/hooks/use-time-tracking";
import { trackingKeyForTrackerId } from "@/src/util/storage-keys";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

const useTrackerStartTime = (trackerId: string) => {
  const [value, setValue] = useState<string>();

  const updateStartTime = () =>
    AsyncStorage.getItem(trackingKeyForTrackerId(trackerId)).then((val) =>
      setValue(val !== null ? val : undefined),
    );

  useEffect(() => {
    updateStartTime();
  }, [trackerId]);
  useFocusEffect(() => {
    updateStartTime();
  });

  const startTime = value ? parseInt(value) : NaN;
  const setStartTime = (value: number | string | undefined) => {
    setValue(value?.toString());
  };

  return {
    startTime: Number.isInteger(startTime) ? startTime : undefined,
    setStartTime,
  };
};

export const useTrackTime = (trackerId: string) => {
  const { startTime, setStartTime } = useTrackerStartTime(trackerId);
  const { startTracking, endTracking } = useTimeTracking();

  return {
    startTime,
    startTracking: () => startTracking(trackerId).then(setStartTime),
    endTracking: () =>
      endTracking(trackerId).then(() => setStartTime(undefined)),
  };
};
