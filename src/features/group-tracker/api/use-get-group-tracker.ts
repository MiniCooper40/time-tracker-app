import { api } from "@/src/lib/api";
import { useQuery } from "react-query";
import { AxiosError } from "axios";

const getGroupTracker = (trackerId: string): Promise<GroupTracker> =>
  api.get(`/group-tracker/${trackerId}`);

export const useGetGroupTracker = (trackerId: string) => {
  return useQuery<GroupTracker, AxiosError>({
    queryFn: () => getGroupTracker(trackerId),
    queryKey: [trackerId, "get-group-tracker"],
  });
};
