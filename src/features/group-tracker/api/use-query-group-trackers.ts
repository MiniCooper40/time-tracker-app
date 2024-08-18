import { api } from "@/src/lib/api";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { AxiosError } from "axios";

interface GroupTrackerSearch {
  userId: string;
  query: string;
}

const queryGroupTrackers = ({
  userId,
  query,
}: GroupTrackerSearch): Promise<GroupTracker[]> =>
  api.get(`/user/${userId}/group-tracker?query=${query}`);

export const useQueryGroupTrackers = (
  groupTrackerSearch: GroupTrackerSearch,
  options?: UseQueryOptions<GroupTracker[], AxiosError>,
): UseQueryResult<GroupTracker[], AxiosError> => {
  return useQuery({
    queryKey: [groupTrackerSearch.userId, groupTrackerSearch.query],
    queryFn: () => queryGroupTrackers(groupTrackerSearch),
    ...options,
  });
};
