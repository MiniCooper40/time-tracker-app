import {TrackingDate} from "@/src/features/analytics/types/TrackingDate"
import {TrackedTime} from "@/src/types/Time";

type TimeTrackerAnalytics = {
    totalDuration: number;
    numberOfSessions: number;
    averageDuration: number;
}

type StartDatable = {
    startDate: TrackingDate;
}

export type TimeTrackerOverviewDailyAnalytics = {
    date: TrackingDate;
} & TimeTrackerAnalytics;
export type TimeTrackerGranularDailyAnalytics = {
    trackedTimes: TrackedTime[]
} & TimeTrackerOverviewDailyAnalytics;

export type TimeTrackerOverviewWeeklyAnalytics = TimeTrackerAnalytics & StartDatable;
export type TimeTrackerGranularWeeklyAnalytics = {
    dailyAnalytics: TimeTrackerOverviewDailyAnalytics[]
} & TimeTrackerOverviewWeeklyAnalytics;

export type TimeTrackerOverviewMonthlyAnalytics = TimeTrackerOverviewWeeklyAnalytics;
export type TimeTrackerGranularMonthlyAnalytics = TimeTrackerGranularWeeklyAnalytics;

export type TimeTrackerOverviewYearlyAnalytics = {
    year: number;
} & TimeTrackerAnalytics;
export type TimeTrackerGranularYearlyAnalytics = {
    monthlyAnalytics: TimeTrackerOverviewMonthlyAnalytics[]
} & TimeTrackerOverviewYearlyAnalytics;