import {
    TimeTrackerCreationInput,
    timeTrackerCreationInputValidationSchema
} from "@/src/features/time-tracker/api/use-create-time-tracker";
import {Callback} from "@/src/types/Callback";
import {FormikForm} from "@/src/components/form/FormikForm";
import {FormikText} from "@/src/components/form/FormikText";
import {YStack} from "tamagui";
import {FormikColorPicker} from "@/src/components/form/FormikColorPicker";
import {FormikParagraph} from "@/src/components/form/FormikParagraph";

export interface TimeTrackerFormProps {
    initialValues: TimeTrackerCreationInput,
    onSubmit: Callback<TimeTrackerCreationInput>,
}

export const TimeTrackerForm = ({initialValues, onSubmit}: TimeTrackerFormProps) => {
    return (
        <FormikForm schema={timeTrackerCreationInputValidationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            <YStack gap="$2" justifyContent="flex-start">
                <FormikText name="name" label="Name" />
                <FormikParagraph name="description" label='Description' />
                <FormikColorPicker name="color" />
            </YStack>
        </FormikForm>
    )
}