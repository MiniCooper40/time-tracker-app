import {api} from "@/src/lib/api";
import {useQuery} from "react-query";
import {AxiosError} from "axios";

const getUsersGroupTrackers = (userId: string): Promise<TimeTracker[]> => {
    return api.get(`/user/${userId}/group-tracker`)
}
export const useGetUsersGroupTrackers = (userId: string) => {
    return useQuery<TimeTracker[], AxiosError>({
        queryKey: [userId, "get-users-group-trackers"],
        queryFn: () => getUsersGroupTrackers(userId)
    })
}