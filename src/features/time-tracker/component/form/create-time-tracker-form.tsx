import {
    TimeTrackerCreationInput,
    timeTrackerCreationInputValidationSchema, useCreateTimeTracker
} from "@/src/features/time-tracker/api/use-create-time-tracker";
import {FormikForm} from "@/src/components/form/FormikForm";
import {FormikText} from "@/src/components/form/FormikText";
import {Button, Form, YStack} from "tamagui";
import {FormikColorPicker} from "@/src/components/form/FormikColorPicker";
import {FormikParagraph} from "@/src/components/form/FormikParagraph";
import {FormikGroupSelect} from "@/src/components/form/FormikGroupSelect";
import {FormikActions} from "@/src/components/form/FormikActions";
import {router} from "expo-router";


export const CreateTimeTrackerForm = ({userId}: { userId: string }) => {

    const createTimeTracker = useCreateTimeTracker(userId)

    const handleCreateTimeTracker = (timeTrackerInput: TimeTrackerCreationInput) => {
        createTimeTracker.mutate(timeTrackerInput, {
            onSuccess: ({trackerId}) => {
                router.back()
                router.push(`/time-trackers/${trackerId}`)
            }
        })
    }

    const initialValues: TimeTrackerCreationInput = {
        name: "",
        description: undefined,
        groupIds: [],
        color: "#FFFFFF"
    }

    return (
        <FormikForm title="Create time tracker" schema={timeTrackerCreationInputValidationSchema}
                    initialValues={initialValues} onSubmit={handleCreateTimeTracker}>
            <YStack gap="$2" style={{justifyContent: "flex-start"}}>
                <FormikText name="name" label="Name"/>
                <FormikParagraph name="description" label='Description'/>
                <FormikColorPicker name="color"/>
                <FormikGroupSelect name="groupIds" userId={userId}/>
                <FormikActions onCancel={() => router.replace("/time-trackers")}/>
            </YStack>
        </FormikForm>
    )
}