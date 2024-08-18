import { Callback } from "@/src/types/callback";
import { ReactNode } from "react";
import { Text, XStack, YStack } from "tamagui";
import { IconButton } from "@/src/components/input/icon-button";
import { Entypo } from "@expo/vector-icons";

interface ChartNavigationProps {
  onIncrement: Callback<void>;
  onDecrement: Callback<void>;
  title: string;
  children?: ReactNode;
}

const ChartNavigation = ({
  onIncrement,
  onDecrement,
  title,
  children,
}: ChartNavigationProps) => {
  return (
    <YStack gap="$2">
      <XStack style={{ justifyContent: "space-between", alignItems: "center" }}>
        <IconButton
          icon={<Entypo name="chevron-left" size={20} />}
          onPress={() => onDecrement()}
        />
        <Text fontWeight={400}>{title}</Text>
        <IconButton
          icon={<Entypo name="chevron-right" size={20} />}
          onPress={() => onIncrement()}
        />
      </XStack>
      {children}
    </YStack>
  );
};

export { ChartNavigation };
