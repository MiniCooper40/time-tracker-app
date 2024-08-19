import { useGetTimeTracker } from "@/src/features/time-tracker/api/use-get-time-tracker";
import { useMemo } from "react";
import { FormikText } from "@/src/components/form/formik-text";
import { FormikParagraph } from "@/src/components/form/formik-paragraph";
import { FormikColorPicker } from "@/src/components/form/formik-color-picker";
import { FormikGroupTrackerSelect } from "@/src/components/form/formik-group-tracker-select";
import { FormikActions } from "@/src/components/form/formik-actions";
import { router } from "expo-router";
import { FormikForm } from "@/src/components/form/formik-form";
import {
  TimeTrackerEditInput,
  timeTrackerEditInputValidation,
  useEditTimeTracker,
} from "@/src/features/time-tracker/api/use-edit-time-tracker";
import { YStack } from "tamagui";
import { useToastController } from "@tamagui/toast";
import { CurrentToast } from "@/src/components/toasts/Toast";

export const EditTimeTrackerForm = ({
  trackerId,
  userId,
}: {
  trackerId: string;
  userId: string;
}) => {
  const toast = useToastController();

  const editTimeTracker = useEditTimeTracker(trackerId, userId);
  const timeTracker = useGetTimeTracker(trackerId);

  const handleEdit = (values: TimeTrackerEditInput) => {
    editTimeTracker.mutate(values, {
      onSuccess: (tracker) => {
        router.back();
        toast.show(`Edited tracker "${tracker.name}"`, { native: "mobile" });
      },
    });
  };
  const initialTimeTrackerInput = useMemo(() => {
    if (timeTracker.isFetching || !timeTracker.data) return undefined;
    return {
      name: timeTracker.data.name,
      description: timeTracker.data.description,
      groupIds: timeTracker.data.groups.map(({ trackerId }) => trackerId),
      color: timeTracker.data.color,
      trackerId,
    };
  }, [timeTracker.isFetching, timeTracker.data]);

  return (
    <>
      {initialTimeTrackerInput && timeTracker.data && (
        <FormikForm
          initialValues={initialTimeTrackerInput}
          schema={timeTrackerEditInputValidation}
          onSubmit={handleEdit}
          title={timeTracker.data.name}
        >
          <CurrentToast />
          <YStack gap="$2">
            <FormikText name="name" label="Name" />
            <FormikParagraph name="description" label="Description" />
            <FormikColorPicker name="color" />
            <FormikGroupTrackerSelect
              name="groupIds"
              userId={userId}
              initialGroupTrackers={timeTracker.data.groups}
            />
            <FormikActions
              onCancel={router.back}
              createLabel="Submit"
              loading={editTimeTracker.isLoading}
            />
          </YStack>
        </FormikForm>
      )}
    </>
  );
};
