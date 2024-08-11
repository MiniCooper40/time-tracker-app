import {Card, Circle, Text, XStack} from "tamagui";
import {Octicons} from '@expo/vector-icons';
import {Body} from "@/src/components/typography/Body";
import {Label} from "../typography/Label";
import {Callback} from "@/src/types/Callback";

interface TrackerPreviewProps<T extends Tracker> {
    tracker: T,
    selected?: boolean;
    onSelected?: Callback<boolean>;
    selectOnPress?: boolean;
}

export const TrackerPreview = <T extends Tracker, >({
                                                        tracker,
                                                        selected,
                                                        onSelected,
                                                        selectOnPress
                                                    }: TrackerPreviewProps<T>) => {
    const {color, name} = tracker
    const elevation = selected ? 5 : 0

    console.log(JSON.stringify({id: tracker.trackerId, selected, elevation}))
    const select = () => {
        if (!selected || selectOnPress) onSelected?.(true)
    }
    const unselect = () => {
        if (selected || selectOnPress) onSelected?.(false)
    }


    const border = selected ? {borderWidth: 1, borderColor: "black", borderStyle: "solid"} : {}

    return (
        <Card onLongPress={select} borderRadius={70} onPress={unselect} style={{...border, boxSizing: "border-box"}}>
            <XStack justifyContent="center" alignItems="center" gap="$1" paddingVertical="$1" paddingHorizontal="$2">
                <Body>{name}</Body>
                <Circle backgroundColor={color} size={14}/>
            </XStack>
        </Card>
    )
}