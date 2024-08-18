import { Button, Form, Spinner, Text, XStack } from "tamagui";
import { useFormikContext } from "formik";
import { Callback } from "@/src/types/Callback";

interface FormikActionsProps {
  createLabel?: string;
  cancelLabel?: string;
  onCancel?: Callback<void>;
  loading?: boolean;
}

export const FormikActions = ({
  createLabel = "Create",
  cancelLabel = "Cancel",
  onCancel,
  loading = false,
}: FormikActionsProps) => {
  return (
    <XStack gap="$4" justifyContent="flex-end">
      <Button onPress={() => onCancel?.()}>{cancelLabel}</Button>
      <Form.Trigger asChild>
        <Button>
          {!loading && <Text>{createLabel}</Text>}
          {loading && <Spinner size="small" />}
        </Button>
      </Form.Trigger>
    </XStack>
  );
};
