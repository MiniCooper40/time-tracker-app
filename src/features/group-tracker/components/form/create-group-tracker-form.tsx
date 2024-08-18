import {
  GroupTrackerCreationInput,
  groupTrackerCreationInputValidationSchema,
  useCreateGroupTracker,
} from "@/src/features/group-tracker/api/use-create-group-tracker";
import { FormikForm } from "@/src/components/form/formik-form";
import { FormikText } from "@/src/components/form/formik-text";
import { FormikParagraph } from "@/src/components/form/formik-paragraph";
import { FormikColorPicker } from "@/src/components/form/formik-color-picker";
import { FormikTimeTrackerSelect } from "@/src/components/form/formik-time-tracker-select";
import { FormikActions } from "@/src/components/form/formik-actions";
import { router } from "expo-router";
import {YStack} from "tamagui";

export const CreateGroupTrackerForm = ({ userId }: { userId: string }) => {
  const createGroupTracker = useCreateGroupTracker(userId);
  const initialGroupTrackerInput = {
    name: "",
    description: "",
    color: "#FFFFFF",
    trackerIds: [] as string[],
  };

  const handleCreateGroupTracker = (
    groupTrackerInput: GroupTrackerCreationInput,
  ) => {
    createGroupTracker.mutate(groupTrackerInput, {
      onSuccess: ({ trackerId }) => {
        router.back();
        router.push(`/group-trackers/${trackerId}`);
      },
    });
  };

  return (
    <FormikForm
      schema={groupTrackerCreationInputValidationSchema}
      initialValues={initialGroupTrackerInput}
      onSubmit={handleCreateGroupTracker}
    >
      <YStack gap="$2">
        <FormikText name="name" label="Name" />
        <FormikParagraph name="description" label="Description" />
        <FormikColorPicker name="color" />
        <FormikTimeTrackerSelect name="trackerIds" userId={userId} />
        <FormikActions loading={createGroupTracker.isLoading} />
      </YStack>
    </FormikForm>
  );
};
