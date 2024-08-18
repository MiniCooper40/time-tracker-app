import { Callback } from "@/src/types/callback";
import { XStack } from "tamagui";
import { IconButton } from "@/src/components/input/icon-button";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Title } from "@/src/components/typography/title";

interface HeaderProps {
  title: string;
  onBack?: Callback<void>;
  onEdit?: Callback<void>;
  onSettings?: Callback<void>;
  onAdd?: Callback<void>;
}

export const Header = ({
  title,
  onBack,
  onAdd,
  onEdit,
  onSettings,
}: HeaderProps) => {
  return (
    <XStack
      justifyContent="center"
      alignItems="center"
      width="100%"
      position="relative"
    >
      <XStack gap="$2" paddingLeft="$2" left={0} position="absolute">
        {onBack && (
          <IconButton
            onPress={() => onBack()}
            icon={<Ionicons name="arrow-back" size={24} color="black" />}
          />
        )}
      </XStack>
      <XStack>
        <Title>{title}</Title>
      </XStack>
      <XStack
        gap="$2"
        justifyContent="flex-end"
        alignItems="center"
        paddingRight="$2"
        right={0}
        position="absolute"
      >
        {onAdd && (
          <IconButton
            onPress={() => onAdd()}
            icon={<Entypo name="plus" size={24} color="black" />}
          />
        )}
        {onEdit && (
          <IconButton
            onPress={() => onEdit()}
            icon={<MaterialIcons name="mode-edit" size={24} color="black" />}
          />
        )}
        {onSettings && (
          <IconButton
            onPress={() => onSettings()}
            icon={<FontAwesome name="gear" size={24} color="black" />}
          />
        )}
      </XStack>
    </XStack>
  );
};
