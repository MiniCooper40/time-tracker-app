import {api} from "@/src/lib/api";
import {useMutation, UseMutationOptions, useQueryClient} from "react-query";
import {AxiosError} from "axios";
import {TimeTrackerCreationInput, timeTrackerCreationInputValidationSchema} from "./use-create-time-tracker";
import * as yup from "yup"

export const timeTrackerEditInputValidation = timeTrackerCreationInputValidationSchema.shape({
    trackerId: yup.string().required()
})

export type TimeTrackerEditInput = yup.InferType<typeof timeTrackerEditInputValidation>

const editTimeTracker = (trackerId: string, timeTrackerInput: TimeTrackerEditInput): Promise<TimeTracker> => {
    return api.put(`/time-tracker/${trackerId}`, timeTrackerInput)
}

export const useEditTimeTracker = (trackerId: string, userId: string, options?: UseMutationOptions<TimeTracker, AxiosError, TimeTrackerEditInput>) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["edit-time-tracker"],
        mutationFn: (values: TimeTrackerEditInput) => editTimeTracker(trackerId, values),
        onSuccess: (...args) => {
            const [data] = args
            queryClient.refetchQueries(["get-users-time-trackers"])
            queryClient.refetchQueries([trackerId, "get-time-tracker"])
            queryClient.refetchQueries([userId, "get-users-time-trackers"])
            options?.onSuccess?.(...args)
        }
    })
}