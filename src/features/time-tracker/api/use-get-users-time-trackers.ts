import { api } from "@/src/lib/api";
import { useQuery } from "react-query";
import { AxiosError } from "axios";

const getUsersTimeTrackers = (userId: string): Promise<TimeTracker[]> => {
  return api.get(`/user/${userId}/time-tracker`);
};
export const useGetUsersTimeTrackers = (userId: string) => {
  return useQuery<TimeTracker[], AxiosError>({
    queryKey: [userId, "get-users-time-trackers"],
    queryFn: () => getUsersTimeTrackers(userId),
  });
};
