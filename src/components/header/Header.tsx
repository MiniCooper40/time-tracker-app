import {Callback} from "@/src/types/Callback";
import {XStack} from "tamagui";
import {IconButton} from "@/src/components/input/IconButton";
import {Entypo, FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {Title} from "@/src/components/typography/Title";

interface HeaderProps {
    title: string;
    onBack?: Callback<void>,
    onEdit?: Callback<void>,
    onSettings?: Callback<void>,
    onAdd?: Callback<void>
}

export const Header = ({
                           title,
                           onBack,
                           onAdd,
                           onEdit,
                           onSettings
                       }: HeaderProps) => {
    return (
        <XStack justifyContent="space-between" alignItems="center">
            <XStack gap="$2" width="33%">
                {onBack && <IconButton onPress={() => onBack()} icon={<Ionicons name="arrow-back" size={24} color="black"/>}/>}
            </XStack>
            <Title width="auto">{title}</Title>
            <XStack gap="$2" width="33%" justifyContent="flex-end" alignItems="center">
                {onAdd && <IconButton onPress={() => onAdd()} icon={<Entypo name="plus" size={24} color="black" />}/>}
                {onEdit && <IconButton onPress={() => onEdit()} icon={<MaterialIcons name="mode-edit" size={24} color="black"/>}/>}
                {onSettings && <IconButton onPress={() => onSettings()} icon={<FontAwesome name="gear" size={24} color="black"/>}/>}
            </XStack>
        </XStack>
    )
}