import {AnalyticsGranularity, AnalyticsScope} from "@/src/features/analytics/types/analytics-request";
import {TrackingDate, TrackingMonth} from "@/src/features/analytics/types/TrackingDate"
import {QueryKey, useQuery} from "react-query";
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
    return api.get(url)
}

export const useTimeTrackerGranularDailyAnalytics = (trackerId: string, date: TrackingDate) => {
    return useTimeTrackerAnalytics<TimeTrackerGranularDailyAnalytics>({
        trackerId,
        date,
        granularity: "GRANULAR",
        scope: "DAILY"
    }, [trackerId, "DAILY", date])
}

export const useTimeTrackerOverviewDailyAnalytics = (trackerId: string, date: TrackingDate) => {
    return useTimeTrackerAnalytics<TimeTrackerOverviewDailyAnalytics>({
        trackerId,
        date,
        granularity: "OVERVIEW",
        scope: "DAILY"
    }, [trackerId, "DAILY", date])
}

export const useTimeTrackerGranularWeeklyAnalytics = (trackerId: string, startDate: TrackingDate) => {
    return useTimeTrackerAnalytics<TimeTrackerGranularWeeklyAnalytics>({
        trackerId,
        date: startDate,
        granularity: "GRANULAR",
        scope: "WEEKLY"
    }, [trackerId, "WEEKLY", startDate])
}

export const useTimeTrackerOverviewWeeklyAnalytics = (trackerId: string, startDate: TrackingDate) => {
    return useTimeTrackerAnalytics<TimeTrackerOverviewWeeklyAnalytics>({
        trackerId,
        date: startDate,
        granularity: "OVERVIEW",
        scope: "WEEKLY"
    },
        [trackerId, "WEEKLY", startDate])
}

export const useTimeTrackerGranularMonthlyAnalytics = (trackerId: string, month: TrackingMonth) => {
    return useTimeTrackerAnalytics<TimeTrackerGranularMonthlyAnalytics>({
        trackerId,
        date: month,
        granularity: "GRANULAR",
        scope: "MONTHLY"
    },
        [trackerId, "MONTHLY", month])
}

export const useTimeTrackerOverviewMonthlyAnalytics = (trackerId: string, startDate: TrackingDate) => {
    return useTimeTrackerAnalytics<TimeTrackerOverviewMonthlyAnalytics>({
        trackerId,
        date: startDate,
        granularity: "OVERVIEW",
        scope: "MONTHLY"
    },
        [trackerId, "MONTHLY", startDate])
}

export const useTimeTrackerGranularYearlyAnalytics = (trackerId: string, startDate: TrackingDate) => {
    return useTimeTrackerAnalytics<TimeTrackerGranularYearlyAnalytics>({
        trackerId,
        date: startDate,
        granularity: "GRANULAR",
        scope: "YEARLY"
    },
        [trackerId, "YEARLY", startDate])
}

export const useTimeTrackerOverviewYearlyAnalytics = (trackerId: string, startDate: TrackingDate) => {
    return useTimeTrackerAnalytics<TimeTrackerOverviewYearlyAnalytics>({
        trackerId,
        date: startDate,
        granularity: "OVERVIEW",
        scope: "YEARLY"
    },
        [trackerId, "YEARLY", startDate])
}

function useTimeTrackerAnalytics<T>(analyticsRequest: TimeTrackerAnalyticsRequest, queryKeys: readonly unknown[] = []) {
    console.log("querying with keys: ", ["analytics", ...queryKeys])
    return useQuery<T, any>({
        queryFn: () => getTimeTrackerAnalytics<T>(analyticsRequest),
        queryKey: ["analytics", ...queryKeys]
    })
}