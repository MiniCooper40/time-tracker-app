import {Callback} from "@/src/types/Callback";
import {Button, Form, XStack} from "tamagui";
import {useFormikContext} from "formik";

interface FormikActionsProps {
    createLabel?: string;
    cancelLabel?: string;
    onCancel?: Callback<void>;
}

export const FormikActions = ({createLabel = "Create", cancelLabel = "Cancel", onCancel}: FormikActionsProps) => {
    const formik = useFormikContext()
    console.log(`values: ${JSON.stringify(formik.values)}`)
    console.log(`errors: ${JSON.stringify(formik.errors)}`)
    return (
        <XStack gap="$4">
            <Button onPress={() => onCancel?.()}>{cancelLabel}</Button>
            <Form.Trigger asChild>
                <Button>{createLabel}</Button>
            </Form.Trigger>
        </XStack>
    )
}