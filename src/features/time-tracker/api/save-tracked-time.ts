import {TrackedTime} from "@/src/types/Time";
import {api} from "@/src/lib/api";
import {MutationOptions, useMutation} from "react-query";

export interface TrackedTimeInput {
    startTime: string;
    endTime: string;
}

interface CreateTrackedTimeInput {
    trackedTime: TrackedTimeInput,
    trackerId: string
}

export const saveTrackedTime = (trackerId: string, trackedTime: TrackedTimeInput): Promise<TrackedTime> => {
    return api.post(`time-tracker/${trackerId}/tracked-time`, trackedTime)
}

type TrackTimeMutationOptions = MutationOptions<TrackedTime, unknown, TrackedTimeInput, unknown>

export const useSaveTrackedTime = (trackerId: string, options: TrackTimeMutationOptions = {}) => {
    return useMutation({
        mutationFn: (trackedTime: TrackedTimeInput) => saveTrackedTime(trackerId, trackedTime),
        ...options
    })
}