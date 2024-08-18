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

export const CreateTimeTrackerForm = ({ userId }: { userId: string }) => {
  const createTimeTracker = useCreateTimeTracker(userId);

  const handleCreateTimeTracker = (
    timeTrackerInput: TimeTrackerCreationInput,
  ) => {
    createTimeTracker.mutate(timeTrackerInput, {
      onSuccess: ({ trackerId }) => {
        router.back();
        router.push(`/time-trackers/${trackerId}`);
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
      title="Create time tracker"
      schema={timeTrackerCreationInputValidationSchema}
      initialValues={initialValues}
      onSubmit={handleCreateTimeTracker}
    >
      <YStack gap="$2" style={{ justifyContent: "flex-start" }}>
        <FormikText name="name" label="Name" />
        <FormikParagraph name="description" label="Description" />
        <FormikColorPicker name="color" />
        <FormikGroupTrackerSelect name="groupIds" userId={userId} />
        <FormikActions
          onCancel={() => router.replace("/time-trackers")}
          loading={createTimeTracker.isLoading}
        />
      </YStack>
    </FormikForm>
  );
};
