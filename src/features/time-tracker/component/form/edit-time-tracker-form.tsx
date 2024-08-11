import {useGetTimeTracker} from "@/src/features/time-tracker/api/use-get-time-tracker";
import {useMemo} from "react";
import {FormikText} from "@/src/components/form/FormikText";
import {FormikParagraph} from "@/src/components/form/FormikParagraph";
import {FormikColorPicker} from "@/src/components/form/FormikColorPicker";
import {FormikGroupSelect} from "@/src/components/form/FormikGroupSelect";
import {FormikActions} from "@/src/components/form/FormikActions";
import {router} from "expo-router";
import {FormikForm} from "@/src/components/form/FormikForm";
import {
    TimeTrackerEditInput,
    timeTrackerEditInputValidation,
    useEditTimeTracker
} from "@/src/features/time-tracker/api/use-edit-time-tracker";
import {YStack} from "tamagui";

export const EditTimeTrackerForm = ({trackerId, userId}: { trackerId: string; userId: string }) => {
    const editTimeTracker = useEditTimeTracker(trackerId, userId)
    const getTimeTracker = useGetTimeTracker(trackerId)

    const handleEdit = (values: TimeTrackerEditInput) => {
        editTimeTracker.mutate(values, {
            onSuccess: () => router.replace(`/time-trackers/${trackerId}`)
        })
    }
    const initialTimeTrackerInput = useMemo(() => {
        if (getTimeTracker.isFetching || !getTimeTracker.data) return undefined
        return {
            name: getTimeTracker.data.name,
            description: getTimeTracker.data.description,
            groupIds: getTimeTracker.data.groups.map(({trackerId}) => trackerId),
            color: getTimeTracker.data.color,
            trackerId
        }
    }, [getTimeTracker.isFetching, getTimeTracker.data])

    return (
        <>
            {initialTimeTrackerInput && getTimeTracker.data && (
                <FormikForm initialValues={initialTimeTrackerInput} schema={timeTrackerEditInputValidation}
                            onSubmit={handleEdit} title="Edit time tracker">
                    <YStack gap="$2">
                        <FormikText name="name" label="Name"/>
                        <FormikParagraph name="description" label='Description'/>
                        <FormikColorPicker name="color"/>
                        <FormikGroupSelect name="groupIds" userId={userId}
                                           initialGroupTrackers={getTimeTracker.data.groups}/>
                        <FormikActions onCancel={() => router.replace("/time-trackers")} createLabel="Submit"/>
                    </YStack>
                </FormikForm>
            )}
        </>
    )
}