import {Formik, useFormikContext} from "formik";
import {AnyObject, Maybe, ObjectSchema} from "yup";
import {ReactNode} from "react";
import {WithChildren} from "@/src/types/WithChildren";
import {Form as TamaguiForm, Label, YStack} from "tamagui"
import {Text} from "react-native";
export interface FormInputProps {
    name: string;
}

export interface FormProps<T extends AnyObject> {
    schema: ObjectSchema<Maybe<T>>,
    initialValues: T,
    onSubmit: (values: T) => void,
    children?: ReactNode,
    title?: string
}

const Form = ({children}: WithChildren) => {
    const formik = useFormikContext()
    const handleSubmit = () => {
        formik.handleSubmit()
    }
    return (
        <TamaguiForm onSubmit={handleSubmit}>
            {children}
        </TamaguiForm>
    )
}

export function FormikForm<Schema extends AnyObject> ({schema, initialValues, onSubmit, title, children}: FormProps<Schema>) {
    return (
        <YStack gap="$2">
            {title && <Label>{title}</Label>}
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={schema}>
                <Form>
                    {children}
                </Form>
            </Formik>
        </YStack>
    )
}