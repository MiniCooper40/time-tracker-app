import {Card, Circle, Text, XStack} from "tamagui";
import { Octicons } from '@expo/vector-icons';
interface TrackerPreviewProps {
    tracker: Tracker
}

export const TrackerPreview = ({tracker}: TrackerPreviewProps) => {
    const {color, name} = tracker
    return (
        <Card>
            <XStack justifyContent="center" alignItems="center" gap="$1">
                <Text>{name}</Text>
                <Circle backgroundColor={color} size={14} />
            </XStack>
        </Card>
    )
}