import { FormInputProps } from "@/src/components/form/formik-form";
import { useField } from "formik";
import { Fieldset, Input, Label } from "tamagui";

type FormTextInputProps = {
  label?: string;
  placeholder?: string;
  flexDirection?: "row" | "column";
} & FormInputProps;

export const FormikText = ({
  name,
  label,
  placeholder = label,
  flexDirection = "column",
}: FormTextInputProps) => {
  const [field, meta, helpers] = useField<string>(name);

  return (
    <Fieldset flexDirection={flexDirection}>
      {label && <Label>{label}</Label>}
      <Input
        onChange={(e) => helpers.setValue(e.nativeEvent.text)}
        value={field.value}
        placeholder={placeholder}
      />
    </Fieldset>
  );
};
