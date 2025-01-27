import { api } from "@/src/lib/api";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import * as yup from "yup";

export const timeTrackerCreationInputValidationSchema = yup.object({
  name: yup.string().required("You must provide a name for this time tracker"),
  description: yup.string(),
  color: yup.string().required(),
  groupIds: yup.array().of(yup.string().required()).required(),
});

export type TimeTrackerCreationInput = yup.InferType<
  typeof timeTrackerCreationInputValidationSchema
>;

const createTimeTracker = (
  userId: string,
  timeTrackerInput: TimeTrackerCreationInput,
): Promise<TimeTracker> => {
  return api.post(`user/${userId}/time-tracker`, timeTrackerInput);
};

export const useCreateTimeTracker = (
  userId: string,
  options?: UseMutationOptions<
    TimeTracker,
    AxiosError,
    TimeTrackerCreationInput
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-time-tracker"],
    mutationFn: (timeTrackerInput: TimeTrackerCreationInput) =>
      createTimeTracker(userId, timeTrackerInput),
    onSuccess: (...args) => {
      const [timeTracker] = args;
      queryClient.refetchQueries(["get-users-time-trackers"]);
      queryClient.refetchQueries([userId, "get-users-time-trackers"]);
      queryClient.refetchQueries([userId, "get-users-group-trackers"]);
      timeTracker.groups.forEach(({ trackerId }) =>
        queryClient.refetchQueries([trackerId, "get-group-tracker"]),
      );
      options?.onSuccess?.(...args);
    },
  });
};
