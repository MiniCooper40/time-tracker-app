import {AnalyticsGranularity, AnalyticsScope} from "@/src/features/analytics/types/analytics-request";
import {TrackingDate, TrackingMonth} from "@/src/features/analytics/types/TrackingDate"
import {QueryKey, useQueries, useQuery} from "react-query";
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
import {AxiosError} from "axios";
import {
    getTimeTrackerAnalytics, queryKeysForAnalyticsRequest,
    TimeTrackerAnalyticsRequest
} from "@/src/features/analytics/api/time-tracker-analytics";

type ListTimeTrackerAnalyticsRequest = {
    granularity: AnalyticsGranularity;
    scope: AnalyticsScope;
    date: TrackingDate;
    trackerIds: string[];
}

export const useListTimeTrackerGranularDailyAnalytics = (trackerIds: string[], date: TrackingDate) => {
    return useListTimeTrackerAnalytics<TimeTrackerGranularDailyAnalytics>({
        trackerIds,
        date,
        granularity: "GRANULAR",
        scope: "DAILY"
    })
}

export const useListTimeTrackerOverviewDailyAnalytics = (trackerIds: string[], date: TrackingDate) => {
    return useListTimeTrackerAnalytics<TimeTrackerOverviewDailyAnalytics>({
        trackerIds,
        date,
        granularity: "OVERVIEW",
        scope: "DAILY"
    })
}

export const useListTimeTrackerGranularWeeklyAnalytics = (trackerIds: string[], startDate: TrackingDate) => {
    return useListTimeTrackerAnalytics<TimeTrackerGranularWeeklyAnalytics>({
        trackerIds,
        date: startDate,
        granularity: "GRANULAR",
        scope: "WEEKLY"
    })
}

export const useListTimeTrackerOverviewWeeklyAnalytics = (trackerIds: string[], startDate: TrackingDate) => {
    return useListTimeTrackerAnalytics<TimeTrackerOverviewWeeklyAnalytics>({
        trackerIds,
        date: startDate,
        granularity: "OVERVIEW",
        scope: "WEEKLY"
    })
}

export const useListTimeTrackerGranularMonthlyAnalytics = (trackerIds: string[], month: TrackingMonth) => {
    return useListTimeTrackerAnalytics<TimeTrackerGranularMonthlyAnalytics>({
        trackerIds,
        date: month,
        granularity: "GRANULAR",
        scope: "MONTHLY"
    })
}

export const useListTimeTrackerOverviewMonthlyAnalytics = (trackerIds: string[], startDate: TrackingDate) => {
    return useListTimeTrackerAnalytics<TimeTrackerOverviewMonthlyAnalytics>({
        trackerIds,
        date: startDate,
        granularity: "OVERVIEW",
        scope: "MONTHLY"
    })
}

export const useListTimeTrackerGranularYearlyAnalytics = (trackerIds: string[], startDate: TrackingDate) => {
    return useListTimeTrackerAnalytics<TimeTrackerGranularYearlyAnalytics>({
        trackerIds,
        date: startDate,
        granularity: "GRANULAR",
        scope: "YEARLY"
    })
}

export const useListTimeTrackerOverviewYearlyAnalytics = (trackerIds: string[], startDate: TrackingDate) => {
    return useListTimeTrackerAnalytics<TimeTrackerOverviewYearlyAnalytics>({
        trackerIds,
        date: startDate,
        granularity: "OVERVIEW",
        scope: "YEARLY"
    })
}

function useListTimeTrackerAnalytics<T>({trackerIds, ...analyticsRequest}: ListTimeTrackerAnalyticsRequest) {
    return useQueries(trackerIds.map(trackerId => ({
        queryFn: () => getTimeTrackerAnalytics<T>({
            ...analyticsRequest,
            trackerId
        }),
        queryKey: queryKeysForAnalyticsRequest({
            ...analyticsRequest,
            trackerId
        })
    })))
}