import { TrackedTime } from "@/src/types/time";
import { api } from "@/src/lib/api";
import { MutationOptions, useMutation } from "react-query";
import { queryClient } from "@/src/lib/react-query";
import {
  currentTrackingDate,
  currentTrackingMonth,
  startOfCurrentTrackingWeek,
} from "@/src/util/time";

export interface TrackedTimeInput {
  startTime: string;
  endTime: string;
}

interface CreateTrackedTimeInput {
  trackedTime: TrackedTimeInput;
  trackerId: string;
}

export const saveTrackedTime = (
  trackerId: string,
  trackedTime: TrackedTimeInput,
): Promise<TrackedTime> => {
  return api.post(`time-tracker/${trackerId}/tracked-time`, trackedTime);
};

type TrackTimeMutationOptions = MutationOptions<
  TrackedTime,
  unknown,
  TrackedTimeInput,
  unknown
>;

export const useSaveTrackedTime = (
  trackerId: string,
  options: TrackTimeMutationOptions = {},
) => {
  return useMutation({
    mutationFn: (trackedTime: TrackedTimeInput) =>
      saveTrackedTime(trackerId, trackedTime),
    ...options,
    onSuccess: (...args) => {
      const currentDay = currentTrackingDate();
      console.log(
        "invalidating keys: ",
        JSON.stringify([
          "analytics",
          trackerId,
          "MONTHLY",
          currentTrackingMonth(),
        ]),
      );
      queryClient.resetQueries({
        queryKey: ["analytics", trackerId, "MONTHLY", currentTrackingMonth()],
        exact: true,
      });
      queryClient.resetQueries({
        queryKey: [
          "analytics",
          trackerId,
          "WEEKLY",
          startOfCurrentTrackingWeek(),
        ],
        exact: true,
      });
      options.onSuccess?.(...args);
    },
  });
};
