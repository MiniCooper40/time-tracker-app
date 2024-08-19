import { useMemo } from "react";
import { FormikText } from "@/src/components/form/formik-text";
import { FormikParagraph } from "@/src/components/form/formik-paragraph";
import { FormikColorPicker } from "@/src/components/form/formik-color-picker";
import { FormikActions } from "@/src/components/form/formik-actions";
import { router } from "expo-router";
import { FormikForm } from "@/src/components/form/formik-form";
import { YStack } from "tamagui";
import { useGetGroupTracker } from "@/src/features/group-tracker/api/use-get-group-tracker";
import {
  GroupTrackerEditInput,
  groupTrackerEditInputValidation,
  useEditGroupTracker,
} from "@/src/features/group-tracker/api/use-edit-group-tracker";
import { FormikTimeTrackerSelect } from "@/src/components/form/formik-time-tracker-select";
import { CurrentToast } from "@/src/components/toasts/Toast";
import { useToastController } from "@tamagui/toast";

export const EditGroupTrackerForm = ({
  trackerId,
  userId,
}: {
  trackerId: string;
  userId: string;
}) => {
  const toast = useToastController();

  const editGroupTracker = useEditGroupTracker(trackerId, userId);
  const groupTracker = useGetGroupTracker(trackerId);

  const handleEdit = (values: GroupTrackerEditInput) => {
    editGroupTracker.mutate(values, {
      onSuccess: (group) => {
        router.back();
        toast.show(`Edited group "${group.name}"`, { native: "mobile" });
      },
    });
  };
  const initialGroupTrackerInput = useMemo(() => {
    if (groupTracker.isFetching || !groupTracker.data) return undefined;
    return {
      name: groupTracker.data.name,
      description: groupTracker.data.description,
      trackerIds: groupTracker.data.trackers.map(({ trackerId }) => trackerId),
      color: groupTracker.data.color,
      trackerId,
    };
  }, [groupTracker.isFetching, groupTracker.data]);

  return (
    <>
      {initialGroupTrackerInput && groupTracker.data && (
        <FormikForm
          initialValues={initialGroupTrackerInput}
          schema={groupTrackerEditInputValidation}
          onSubmit={handleEdit}
          title={groupTracker.data.name}
        >
          <CurrentToast />
          <YStack gap="$2">
            <FormikText name="name" label="Name" />
            <FormikParagraph name="description" label="Description" />
            <FormikColorPicker name="color" />
            <FormikTimeTrackerSelect
              name="trackerIds"
              userId={userId}
              initialTimeTrackers={groupTracker.data.trackers}
            />
            <FormikActions
              onCancel={router.back}
              createLabel="Submit"
              loading={editGroupTracker.isLoading}
            />
          </YStack>
        </FormikForm>
      )}
    </>
  );
};
