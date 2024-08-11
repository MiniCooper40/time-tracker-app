import {api} from "@/src/lib/api";
import {useMutation, UseMutationOptions, useQuery, useQueryClient} from "react-query";
import {AxiosError} from "axios";
import {queryClient} from "@/src/lib/reactQuery";
import * as yup from "yup"


export const timeTrackerCreationInputValidationSchema = yup.object({
    name: yup.string().required("You must provide a name for this time tracker"),
    description: yup.string(),
    color: yup.string().required(),
    groupIds: yup.array().of(yup.string().required()).required()
})

export type TimeTrackerCreationInput = yup.InferType<typeof timeTrackerCreationInputValidationSchema>

const createTimeTracker = (userId: string, timeTrackerInput: TimeTrackerCreationInput): Promise<TimeTracker> => {
    return api.post(`user/${userId}/time-tracker`, timeTrackerInput)
}

export const useCreateTimeTracker = (userId: string, options?: UseMutationOptions<TimeTracker, AxiosError, TimeTrackerCreationInput>) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["create-time-tracker"],
        mutationFn: (timeTrackerInput: TimeTrackerCreationInput) => createTimeTracker(userId, timeTrackerInput),
        onSuccess: (...args) => {
            const [data] = args
            queryClient.refetchQueries([userId, "get-users-time-trackers"])
            options?.onSuccess?.(...args)
        }
    })
}