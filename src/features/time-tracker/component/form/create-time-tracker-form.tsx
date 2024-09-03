import {
  TimeTrackerCreationInput,
  timeTrackerCreationInputValidationSchema,
  useCreateTimeTracker,
} from "@/src/features/time-tracker/api/use-create-time-tracker";
import { FormikForm } from "@/src/components/form/formik-form";
import { FormikText } from "@/src/components/form/formik-text";
import { YStack } from "tamagui";
import { FormikColorPicker } from "@/src/components/form/formik-color-picker";
import { FormikParagraph } from "@/src/components/form/formik-paragraph";
import { FormikGroupTrackerSelect } from "@/src/components/form/formik-group-tracker-select";
import { FormikActions } from "@/src/components/form/formik-actions";
import { router } from "expo-router";
import { CurrentToast } from "@/src/components/toasts/Toast";
import { useToastController } from "@tamagui/toast";

export const CreateTimeTrackerForm = ({ userId }: { userId: string }) => {
  const toast = useToastController();

  const createTimeTracker = useCreateTimeTracker(userId);

  const handleCreateTimeTracker = (
    timeTrackerInput: TimeTrackerCreationInput,
  ) => {
    createTimeTracker.mutate(timeTrackerInput, {
      onSuccess: (tracker) => {
        router.back();
        router.push(`/time-trackers/${tracker.trackerId}`);
        toast.show(`Created tracker "${tracker.name}"`, { native: "mobile" });
      },
    });
  };

  const initialValues: TimeTrackerCreationInput = {
    name: "",
    description: undefined,
    groupIds: [],
    color: "#FFFFFF",
  };

  return (
    <FormikForm
      schema={timeTrackerCreationInputValidationSchema}
      initialValues={initialValues}
      onSubmit={handleCreateTimeTracker}
    >
      <CurrentToast />
      <YStack gap="$2" style={{ justifyContent: "flex-start" }}>
        <FormikText name="name" label="Name" />
        <FormikParagraph name="description" label="Description" />
        <FormikColorPicker name="color" />
        <FormikGroupTrackerSelect name="groupIds" userId={userId} />
        <FormikActions
          onCancel={router.back}
          loading={createTimeTracker.isLoading}
        />
      </YStack>
    </FormikForm>
  );
};
