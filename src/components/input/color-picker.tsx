import { Callback } from "@/src/types/callback";
import { useState } from "react";
import ColorPickerBase, { Panel3 } from "reanimated-color-picker";

interface ColorPickerProps {
  initialColor: string;
  onSelect: Callback<string>;
}

export const ColorPicker = ({ initialColor, onSelect }: ColorPickerProps) => {
  const [color, setColor] = useState(initialColor);

  return (
    <ColorPickerBase
      style={{ width: 250 }}
      value={color}
      onComplete={({ hex }) => onSelect(hex)}
    >
      <Panel3 />
    </ColorPickerBase>
  );
};
