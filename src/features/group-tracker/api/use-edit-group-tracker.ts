import { api } from "@/src/lib/api";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import * as yup from "yup";
import { groupTrackerCreationInputValidationSchema } from "@/src/features/group-tracker/api/use-create-group-tracker";

export const groupTrackerEditInputValidation =
  groupTrackerCreationInputValidationSchema.shape({
    trackerId: yup.string().required(),
  });

export type GroupTrackerEditInput = yup.InferType<
  typeof groupTrackerEditInputValidation
>;

const editGroupTracker = (
  trackerId: string,
  groupTrackerInput: GroupTrackerEditInput,
): Promise<GroupTracker> => {
  return api.put(`/group-tracker/${trackerId}`, groupTrackerInput);
};

export const useEditGroupTracker = (
  trackerId: string,
  userId: string,
  options?: UseMutationOptions<GroupTracker, AxiosError, GroupTrackerEditInput>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-group-tracker"],
    mutationFn: (values: GroupTrackerEditInput) =>
      editGroupTracker(trackerId, values),
    onSuccess: (...args) => {
      const [timeTracker] = args;
      queryClient.refetchQueries(["get-users-time-trackers"]);
      queryClient.refetchQueries([trackerId, "get-group-tracker"]);
      queryClient.refetchQueries([userId, "get-users-time-trackers"]);
      queryClient.refetchQueries([userId, "get-users-group-trackers"]);
      timeTracker.trackers.forEach(({ trackerId }) =>
        queryClient.refetchQueries([trackerId, "get-time-tracker"]),
      );
      options?.onSuccess?.(...args);
    },
  });
};
