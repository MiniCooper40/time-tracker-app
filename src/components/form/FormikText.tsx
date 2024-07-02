import {FormInputProps} from "@/src/components/form/FormikForm";
import {Field, useField, useFormikContext} from "formik";
import {Button, Input} from "tamagui";

type FormTextInputProps = {
    placeholder?: string
} & FormInputProps

export const FormikText = ({name, placeholder}: FormTextInputProps) => {

    const formik = useFormikContext<any>()

    return (
        <Input
            onChange={e => formik.setFieldValue(name, e.nativeEvent.text)}
            value={formik.values[name]}
            placeholder={placeholder}
            id={name}
        />
    )
}
