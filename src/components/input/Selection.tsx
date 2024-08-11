import {Callback} from "@/src/types/Callback";
import {Separator, Text, XStack} from "tamagui";
import {IconButton} from "@/src/components/input/IconButton";
import {AntDesign} from "@expo/vector-icons";

interface SelectionProps {
    selected: boolean;
    label: string;
    onToggleSelected: Callback<void>
}

export const Selection = ({selected, label, onToggleSelected}: SelectionProps) => {
    return (
        <>
            <XStack onPress={() => onToggleSelected()}
                    style={{width: "100%", justifyContent: "space-between", alignItems: "center", height: 30}}
            >
                <Text>{label}</Text>
                {selected && <IconButton icon={<AntDesign name="check" size={16} color="black"/>}/>}
            </XStack>
            <Separator/>
        </>
    )
}