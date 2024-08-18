import { api } from "@/src/lib/api";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import * as yup from "yup";

export const groupTrackerCreationInputValidationSchema = yup.object({
  name: yup.string().required("You must provide a name for this time tracker"),
  description: yup.string(),
  color: yup.string().required(),
  trackerIds: yup.array().of(yup.string().required()).required(),
});

export type GroupTrackerCreationInput = yup.InferType<
  typeof groupTrackerCreationInputValidationSchema
>;

const createGroupTracker = (
  userId: string,
  groupTrackerInput: GroupTrackerCreationInput,
): Promise<GroupTracker> => {
  return api.post(`user/${userId}/group-tracker`, groupTrackerInput);
};

export const useCreateGroupTracker = (
  userId: string,
  options?: UseMutationOptions<
    GroupTracker,
    AxiosError,
    GroupTrackerCreationInput
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-group-tracker"],
    mutationFn: (groupTrackerInput: GroupTrackerCreationInput) =>
      createGroupTracker(userId, groupTrackerInput),
    onSuccess: (...args) => {
      const [groupTracker] = args;
      queryClient.refetchQueries(["get-users-time-trackers"]);
      queryClient.refetchQueries([userId, "get-users-time-trackers"]);
      queryClient.refetchQueries([userId, "get-users-group-trackers"]);
      groupTracker.trackers.forEach(({ trackerId }) =>
        queryClient.refetchQueries([trackerId, "get-time-tracker"]),
      );
      options?.onSuccess?.(...args);
    },
  });
};
