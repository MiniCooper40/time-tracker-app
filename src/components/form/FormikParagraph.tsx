import {FormInputProps} from "@/src/components/form/FormikForm";
import {Field, useField, useFormikContext} from "formik";
import {Button, Fieldset, Input, Label, TextArea, YStack} from "tamagui";

type FormParagraphInputProps = {
    label?: string;
    placeholder?: string;
    flexDirection?: "row" | "column";
} & FormInputProps

export const FormikParagraph = ({
                                         name,
                                         label,
                                         placeholder = label,
                                         flexDirection = "column",
                                     }: FormParagraphInputProps) => {

    const formik = useFormikContext<any>()

    return (
        <Fieldset>
            {label && <Label>{label}</Label>}
            <TextArea
                onChange={e => formik.setFieldValue(name, e.nativeEvent.text)}
                value={formik.values[name]}
                placeholder={placeholder}
                verticalAlign="top"
            />
        </Fieldset>
    )
}