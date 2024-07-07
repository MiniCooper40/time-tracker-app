import {Card, Label} from "tamagui";

interface TimeTrackerCardProps {
    timeTracker: TimeTracker
}

export const TimeTrackerCard = ({timeTracker}: TimeTrackerCardProps) => {
    return (
        <Card>
            <Label>{timeTracker.name}</Label>
        </Card>
    )
}