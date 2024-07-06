interface Tracker {
    name: string;
    description: string;
    color: string;
    lastModified: Date;
    dateCreated: Date;
    trackerId: string;
    userId: string;
}

interface GroupTracker extends Tracker {
    timeTrackers: TimeTracker[];
}

interface TimeTracker extends Tracker {
    groupTrackers: GroupTracker[];
}