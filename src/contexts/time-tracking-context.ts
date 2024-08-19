import { createContext } from "react";

type TimeTrackingContextType = {
  activeTrackerIds: string[];
  startTracking: (trackerId: string) => Promise<number>;
  endTracking: (trackerId: string) => Promise<number>;
};

export const TimeTrackingContext = createContext<TimeTrackingContextType>(
  {} as TimeTrackingContextType,
);
