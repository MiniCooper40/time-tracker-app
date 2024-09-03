import { api } from "@/src/lib/api";
import { useQuery } from "react-query";
import { AxiosError } from "axios";

export const getTimeTracker = (trackerId: string): Promise<TimeTracker> => {
  return api.get(`/time-tracker/${trackerId}`);
};

export const queryKeyForTrackerId = (trackerId: string) => [
  trackerId,
  "get-time-tracker",
];
export const useGetTimeTracker = (trackerId: string) => {
  return useQuery<TimeTracker, AxiosError>({
    queryKey: queryKeyForTrackerId(trackerId),
    queryFn: () => getTimeTracker(trackerId),
  });
};
