import { api } from "@/src/lib/api";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { AxiosError } from "axios";

interface TimeTrackerSearch {
  userId: string;
  query: string;
}

const queryTimeTrackers = ({
  userId,
  query,
}: TimeTrackerSearch): Promise<TimeTracker[]> =>
  api.get(`/user/${userId}/time-tracker?query=${query}`);

export const useQueryTimeTrackers = (
  TimeTrackerSearch: TimeTrackerSearch,
  options?: UseQueryOptions<TimeTracker[], AxiosError>,
): UseQueryResult<TimeTracker[], AxiosError> => {
  return useQuery({
    queryKey: [TimeTrackerSearch.userId, TimeTrackerSearch.query],
    queryFn: () => queryTimeTrackers(TimeTrackerSearch),
    ...options,
  });
};
