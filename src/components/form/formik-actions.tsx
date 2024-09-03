import { Callback } from "@/src/types/callback";
import { Form, Spinner, XStack } from "tamagui";
import { TextButton } from "@/src/components/input/text-button";

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
    <XStack
      gap="$4"
      paddingTop="$4"
      justifyContent="flex-end"
      alignItems="center"
    >
      {loading && <Spinner size="small" />}
      <TextButton onPress={() => onCancel?.()}>{cancelLabel}</TextButton>
      <Form.Trigger asChild>
        <TextButton>{createLabel}</TextButton>
      </Form.Trigger>
    </XStack>
  );
};
