import { useContext } from "react";
import { TimeTrackingContext } from "@/src/contexts/time-tracking-context";

export const useTimeTracking = () => {
  return useContext(TimeTrackingContext);
};
