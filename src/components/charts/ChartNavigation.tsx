import {Callback} from "@/src/types/Callback"
import {ReactNode} from "react";
import {Button, Text, View, XStack, YStack} from "tamagui";
import {IconButton} from "@/src/components/input/IconButton";
import { Entypo } from '@expo/vector-icons';

interface ChartNavigationProps {
    onIncrement: Callback<void>,
    onDecrement: Callback<void>,
    title: string;
    children?: ReactNode;
}

const ChartNavigation = ({onIncrement, onDecrement, title, children}: ChartNavigationProps) => {
    
    return (
        <YStack gap="$2">
            <XStack style={{justifyContent: "space-between", alignItems: "center"}}>
                <IconButton icon={<Entypo name="chevron-left" size={20} />} onPress={() => onDecrement()} />
                <Text>{title}</Text>
                <IconButton icon={<Entypo name="chevron-right" size={20} />} onPress={() => onIncrement()} />
            </XStack>
            {children}
        </YStack>
    )
}

export {ChartNavigation}