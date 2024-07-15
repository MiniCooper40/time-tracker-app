import {AnalyticsGranularity, AnalyticsScope} from "@/src/features/analytics/types/analytics-request";
import {TrackingDate} from "@/src/features/analytics/types/TrackingDate"
import {useQuery} from "react-query";
import {api} from "@/src/lib/api";
import {queryParamsFrom} from "@/src/util/url";
import {
    TimeTrackerGranularDailyAnalytics,
    TimeTrackerGranularMonthlyAnalytics,
    TimeTrackerGranularWeeklyAnalytics,
    TimeTrackerGranularYearlyAnalytics,
    TimeTrackerOverviewDailyAnalytics,
    TimeTrackerOverviewMonthlyAnalytics,
    TimeTrackerOverviewWeeklyAnalytics,
    TimeTrackerOverviewYearlyAnalytics
} from "@/src/features/analytics/types/TimeTrackerAnalytics";

type TimeTrackerAnalyticsRequest = {
    granularity: AnalyticsGranularity;
    scope: AnalyticsScope;
    date: TrackingDate;
    trackerId: string;
}

function getTimeTrackerAnalytics<T>({trackerId, granularity, date, scope }: TimeTrackerAnalyticsRequest): Promise<T> {
    const url = `time-tracker/${trackerId}/analytics?${queryParamsFrom({granularity, scope, ...date, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone})}`
    console.log("got url", url)
    return api.get(url)
}

export const useTimeTrackerGranularDailyAnalytics = (trackerId: string, date: TrackingDate) => {
    return useTimeTrackerAnalytics<TimeTrackerGranularDailyAnalytics>({
        trackerId,
        date,
        granularity: "GRANULAR",
        scope: "DAILY"
    })
}

export const useTimeTrackerOverviewDailyAnalytics = (trackerId: string, date: TrackingDate) => {
    return useTimeTrackerAnalytics<TimeTrackerOverviewDailyAnalytics>({
        trackerId,
        date,
        granularity: "OVERVIEW",
        scope: "DAILY"
    })
}

export const useTimeTrackerGranularWeeklyAnalytics = (trackerId: string, startDate: TrackingDate) => {
    return useTimeTrackerAnalytics<TimeTrackerGranularWeeklyAnalytics>({
        trackerId,
        date: startDate,
        granularity: "GRANULAR",
        scope: "WEEKLY"
    })
}

export const useTimeTrackerOverviewWeeklyAnalytics = (trackerId: string, startDate: TrackingDate) => {
    return useTimeTrackerAnalytics<TimeTrackerOverviewWeeklyAnalytics>({
        trackerId,
        date: startDate,
        granularity: "OVERVIEW",
        scope: "WEEKLY"
    })
}

export const useTimeTrackerGranularMonthlyAnalytics = (trackerId: string, startDate: TrackingDate) => {
    return useTimeTrackerAnalytics<TimeTrackerGranularMonthlyAnalytics>({
        trackerId,
        date: startDate,
        granularity: "GRANULAR",
        scope: "MONTHLY"
    })
}

export const useTimeTrackerOverviewMonthlyAnalytics = (trackerId: string, startDate: TrackingDate) => {
    return useTimeTrackerAnalytics<TimeTrackerOverviewMonthlyAnalytics>({
        trackerId,
        date: startDate,
        granularity: "OVERVIEW",
        scope: "MONTHLY"
    })
}

export const useTimeTrackerGranularYearlyAnalytics = (trackerId: string, startDate: TrackingDate) => {
    return useTimeTrackerAnalytics<TimeTrackerGranularYearlyAnalytics>({
        trackerId,
        date: startDate,
        granularity: "GRANULAR",
        scope: "YEARLY"
    })
}

export const useTimeTrackerOverviewYearlyAnalytics = (trackerId: string, startDate: TrackingDate) => {
    return useTimeTrackerAnalytics<TimeTrackerOverviewYearlyAnalytics>({
        trackerId,
        date: startDate,
        granularity: "OVERVIEW",
        scope: "YEARLY"
    })
}

function useTimeTrackerAnalytics<T>(analyticsRequest: TimeTrackerAnalyticsRequest) {
    return useQuery<T, any>({
        queryFn: () => getTimeTrackerAnalytics<T>(analyticsRequest),
        queryKey: ["analytics", ...Array.from(Object.values(analyticsRequest))]
    })
}