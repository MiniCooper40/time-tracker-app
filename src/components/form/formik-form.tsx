import { Formik, useFormikContext } from "formik";
import { AnyObject, Maybe, ObjectSchema } from "yup";
import { ReactNode } from "react";
import { Form as TamaguiForm, YStack } from "tamagui";
import { useRouter } from "expo-router";

export interface FormInputProps {
  name: string;
}

export interface FormProps<T extends AnyObject> {
  schema: ObjectSchema<Maybe<Partial<T>>>;
  initialValues: T;
  onSubmit: (values: T) => void;
  children?: ReactNode;
}

const Form = ({ children }: { children: ReactNode }) => {
  const formik = useFormikContext();
  const handleSubmit = () => {
    formik.handleSubmit();
  };
  return <TamaguiForm onSubmit={handleSubmit}>{children}</TamaguiForm>;
};

export function FormikForm<Schema extends AnyObject>({
  schema,
  initialValues,
  onSubmit,
  children,
}: FormProps<Schema>) {
  const router = useRouter();
  return (
    <YStack gap="$2">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        <Form>{children}</Form>
      </Formik>
    </YStack>
  );
}
