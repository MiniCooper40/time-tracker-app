import { ReactNode, useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TimeTrackingContext } from "@/src/contexts/time-tracking-context";
import { trackingKeyForTrackerId } from "@/src/util/storage-keys";

export const TimeTrackingProvider = ({ children }: { children: ReactNode }) => {
  const [activeTrackerIds, setActiveTrackerIds] = useState([] as string[]);
  const updateActiveTrackerIds = () => {
    AsyncStorage.getAllKeys().then((keys) => {
      const ids = keys
        .filter((key) => /^start-time/.test(key))
        .map((key) => key.split("=").at(-1))
        .filter((trackerId): trackerId is string => trackerId !== undefined);
      if (
        JSON.stringify(ids.sort()) === JSON.stringify(activeTrackerIds.sort())
      )
        return;
      setActiveTrackerIds(ids);
    });
  };

  useEffect(updateActiveTrackerIds, []);

  const startTracking = useCallback(
    (trackerId: string): Promise<number> => {
      const startTime = Date.now();
      const trackingKey = trackingKeyForTrackerId(trackerId);
      return new Promise((resolve, reject) => {
        AsyncStorage.getItem(trackingKey)
          .then((value) => {
            if (value !== null) reject();
            AsyncStorage.setItem(trackingKey, startTime.toString())
              .then(() => {
                resolve(startTime);
                setActiveTrackerIds((prev) => [...prev, trackerId]);
              })
              .catch(reject);
          })
          .catch(reject);
      });
    },
    [activeTrackerIds],
  );

  const endTracking = useCallback(
    (trackerId: string): Promise<number> => {
      const endTime = Date.now();
      const trackingKey = trackingKeyForTrackerId(trackerId);
      return new Promise((resolve, reject) => {
        setActiveTrackerIds((prev) => prev.filter((id) => id !== trackerId));
        AsyncStorage.removeItem(trackingKey)
          .then(() => {
            resolve(endTime);
          })
          .catch(reject);
      });
    },
    [activeTrackerIds],
  );

  return (
    <TimeTrackingContext.Provider
      value={{
        startTracking,
        endTracking,
        activeTrackerIds,
      }}
    >
      {children}
    </TimeTrackingContext.Provider>
  );
};
