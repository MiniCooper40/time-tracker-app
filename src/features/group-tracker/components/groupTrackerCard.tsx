import {Card, Label} from "tamagui";

interface GroupTrackerCardProps {
    groupTracker: GroupTracker
}

export const GroupTrackerCard = ({groupTracker}: GroupTrackerCardProps) => {

    return (
        <Card>
            <Label>{groupTracker.name}</Label>
        </Card>
    )
}