import {Date} from "@/src/features/analytics/types/Date"

export type TimeTrackerGranularDailyAnalytics = {
    date: Date;
    totalDuration: number;
    numberOfSessions: number;
}