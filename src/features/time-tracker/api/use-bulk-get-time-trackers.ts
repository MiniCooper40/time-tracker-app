import { useQueries } from "react-query";
import {
  getTimeTracker,
  queryKeyForTrackerId,
} from "@/src/features/time-tracker/api/use-get-time-tracker";

export const useBulkGetTimeTrackers = (trackerIds: string[]) => {
  return useQueries(
    trackerIds.map((trackerId) => ({
      queryFn: () => getTimeTracker(trackerId),
      queryKey: queryKeyForTrackerId(trackerId),
    })),
  );
};
