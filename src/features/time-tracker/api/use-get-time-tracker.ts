import {api} from "@/src/lib/api";
import {useQuery} from "react-query";
import {AxiosError} from "axios";

const getTimeTracker = (trackerId: string): Promise<TimeTracker> => {
    return api.get(`/time-tracker/${trackerId}`)
}

export const useGetTimeTracker = (trackerId: string) => {
    return useQuery<TimeTracker, AxiosError>({
        queryKey: [trackerId, "get-time-tracker"],
        queryFn: () => getTimeTracker(trackerId)
    })
}