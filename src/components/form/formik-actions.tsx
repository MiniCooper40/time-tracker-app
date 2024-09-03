import { Callback } from "@/src/types/callback";
import { Button, Form, Spinner, Text, XStack } from "tamagui";
import { Center } from "@/src/components/layouts/center";

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
    <XStack gap="$4" paddingTop="$4" justifyContent="flex-end">
      <Button onPress={() => onCancel?.()}>{cancelLabel}</Button>
      <Form.Trigger asChild>
        <Button position="relative">
          <Text opacity={loading ? 0 : 1}>{createLabel}</Text>
          <Center style={{inset: 0, position: "absolute"}}>
            {loading && <Spinner color="darkgrey" size="small" />}
          </Center>
        </Button>
      </Form.Trigger>
    </XStack>
  );
};
