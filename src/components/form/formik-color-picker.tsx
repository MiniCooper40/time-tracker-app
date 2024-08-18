import { useField } from "formik";
import {
  Adapt,
  Button,
  ButtonText,
  Circle,
  Dialog,
  Label,
  Sheet,
  XStack,
  YStack,
} from "tamagui";
import { useState } from "react";

interface FormikColorPickerProps {
  name: string;
  label?: string;
}

const colors: [[number, number, number], string, string][] = [
  [[26, 188, 156], "#1abc9c", "turquoise"],
  [[46, 204, 113], "#2ecc71", "emerland"],
  [[52, 152, 219], "#3498db", "peter-river"],
  [[155, 89, 182], "#9b59b6", "amethyst"],
  [[52, 73, 94], "#34495e", "wet-asphalt"],
  [[22, 160, 133], "#16a085", "green-sea"],
  [[39, 174, 96], "#27ae60", "nephritis"],
  [[41, 128, 185], "#2980b9", "belize-hole"],
  [[142, 68, 173], "#8e44ad", "wisteria"],
  [[44, 62, 80], "#2c3e50", "midnight-blue"],
  [[241, 196, 15], "#f1c40f", "sun-flower"],
  [[230, 126, 34], "#e67e22", "carrot"],
  [[231, 76, 60], "#e74c3c", "alizarin"],
  [[236, 240, 241], "#ecf0f1", "clouds"],
  [[149, 165, 166], "#95a5a6", "concrete"],
  [[243, 156, 18], "#f39c12", "orange"],
  [[211, 84, 0], "#d35400", "pumpkin"],
  [[192, 57, 43], "#c0392b", "pomegranate"],
  [[189, 195, 199], "#bdc3c7", "silver"],
  [[127, 140, 141], "#7f8c8d", "asbestos"],
];

export const FormikColorPicker = ({
  name,
  label = "Color",
}: FormikColorPickerProps) => {
  const [field, meta, helpers] = useField<string>(name);
  const [tempColorSelection, setTempColorSelection] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <YStack>
      <Label>{label}</Label>
      <Dialog modal open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <Button
            pressStyle={{ backgroundColor: field.value }}
            backgroundColor={field.value}
            flexGrow={1}
            borderColor={"lightgrey"}
            borderWidth={0.5}
          />
        </Dialog.Trigger>
        <Adapt when="sm" platform="touch">
          <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
            <Sheet.Frame padding="$4" gap="$4">
              <Adapt.Contents />
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>
        <Dialog.Portal>
          <Dialog.Overlay key="overlay" />
          <Dialog.Content
            key="content"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <YStack justifyContent="center" alignItems="center" gap="$4">
              <XStack gap="$8">
                <XStack
                  gap="$4"
                  width="100%"
                  flexWrap="wrap"
                  style={{
                    width: "100%",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                  }}
                >
                  {colors.map(([rgb, hex], index) => (
                    <Circle
                      key={`${hex}-${index}`}
                      size={50}
                      backgroundColor={hex}
                      onPress={() => {
                        helpers.setValue(hex);
                        setOpen(false);
                      }}
                    />
                  ))}
                </XStack>
                <Dialog.Close>
                  <ButtonText>Close</ButtonText>
                </Dialog.Close>
                <Dialog.Close
                  onPress={() =>
                    tempColorSelection
                      ? helpers.setValue(tempColorSelection)
                      : undefined
                  }
                >
                  <ButtonText>Select</ButtonText>
                </Dialog.Close>
              </XStack>
            </YStack>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </YStack>
  );
};
