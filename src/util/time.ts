import {
  TrackingDate,
  TrackingMonth,
} from "@/src/features/analytics/types/tracking-date";
import dayjs, { Dayjs } from "dayjs";
import { TrackedTime } from "@/src/types/time";

const startPaddedWithZero = (value: number): string => {
  if (value < 10) return `0${value}`;
  else return value.toString();
};

export const ONE_SECOND_MILLIS = 1000;
export const ONE_MINUTE_MILLIS = 1000 * 60;
export const ONE_HOUR_MILLIS = 1000 * 60 * 60;
export const ONE_DAY_MILLIS = 1000 * 60 * 60 * 24;
export const ONE_WEEK_MILLIS = ONE_DAY_MILLIS * 6;

const breakDownMillis = (milliseconds: number | undefined) => {
  if (!milliseconds)
    return { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
  const hours = Math.floor(milliseconds / ONE_HOUR_MILLIS);
  milliseconds -= hours * ONE_HOUR_MILLIS;

  const minutes = Math.floor(milliseconds / ONE_MINUTE_MILLIS);
  milliseconds -= minutes * ONE_MINUTE_MILLIS;

  const seconds = Math.floor(milliseconds / ONE_SECOND_MILLIS);
  milliseconds -= seconds * ONE_SECOND_MILLIS;

  milliseconds = Math.floor(milliseconds / 10);
  return { hours, minutes, seconds, milliseconds };
};

export const millisecondsToDetailedTimestamp = (
  millis: number | undefined,
): string => {
  if (!millis) return "N/A";
  return new Date(millis).toLocaleDateString();
};

export const millisecondsToCompressedTimestamp = (
  millis: number | undefined,
): string => {
  const { hours, minutes, seconds, milliseconds } = breakDownMillis(millis);

  let s = "";
  if (seconds > 0) s = `${seconds}s`;
  if (minutes > 0) s = `${minutes}m${s}`;
  if (hours > 0) s = `${hours}h${s}`;
  return s;
};

export const millisecondsToTimestamp = (millis: number | undefined): string => {
  if (!millis) return BLANK_TIMESTAMP;
  const { hours, minutes, seconds, milliseconds } = breakDownMillis(millis);

  const milliStr = startPaddedWithZero(milliseconds);
  const secondStr = startPaddedWithZero(seconds);
  const minuteStr = startPaddedWithZero(minutes);
  const hourStr = startPaddedWithZero(hours);

  const timestamp = `${minuteStr}:${secondStr}.${milliStr}`;
  return hours !== 0 ? `${hourStr}:${timestamp}` : timestamp;
};

export const weekLabel = (trackingDate: TrackingDate) => {
  const { year, month, day } = trackingDate;
  if (!year || !month || !day) return "";
  return `Week of ${trackingDateAsDate(trackingDate).toLocaleDateString(
    "en-us",
    {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  )}`;
};

export const shortDayLabelsForWeekStarting = (trackingDate: TrackingDate) => {
  const date = trackingDateAsDayjs(trackingDate);
  return [0, 1, 2, 3, 4, 5, 6].map((day) => date.add(day, "days").format("dd"));
};

export const detailedDayLabelsForWeekStarting = (
  trackingDate: TrackingDate,
) => {
  const { year, month, day } = trackingDate;
  if (!year || !month || !day) return [];

  return [0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) =>
    detailedLabelForDay(
      plusDays(
        {
          year,
          month,
          day,
        },
        dayOfWeek,
      ),
    ),
  );
};

export const detailedLabelForDay = (
  trackingDate: TrackingDate = currentTrackingDate(),
) => {
  return trackingDateAsDayjs(trackingDate).toDate().toDateString();
};

export const labelForMonth = (trackingMonth: TrackingMonth) => {
  return trackingDateAsDayjs({ ...trackingMonth, day: 1 })
    .toDate()
    .toLocaleDateString("en-us", {
      month: "long",
      year: "numeric",
    });
};

export const axisTicksForTrackedMillis = (milliseconds: number[] | number) => {
  const maxMilliseconds =
    typeof milliseconds === "number" ? milliseconds : Math.max(...milliseconds);
  const valuePerTick = Math.floor(
    (() => {
      if (maxMilliseconds < ONE_SECOND_MILLIS * 5) return ONE_SECOND_MILLIS;
      if (maxMilliseconds < ONE_SECOND_MILLIS * 30)
        return ONE_SECOND_MILLIS * 5;
      if (maxMilliseconds < ONE_MINUTE_MILLIS) return ONE_SECOND_MILLIS * 10;
      if (maxMilliseconds < ONE_MINUTE_MILLIS * 5) return ONE_MINUTE_MILLIS;
      if (maxMilliseconds < ONE_MINUTE_MILLIS * 10)
        return ONE_MINUTE_MILLIS * 2;
      if (maxMilliseconds < ONE_HOUR_MILLIS / 2) return ONE_MINUTE_MILLIS * 5;
      if (maxMilliseconds < ONE_HOUR_MILLIS) return ONE_MINUTE_MILLIS * 10;
      if (maxMilliseconds < ONE_HOUR_MILLIS * 2) return ONE_MINUTE_MILLIS * 20;
      if (maxMilliseconds < ONE_HOUR_MILLIS * 4) return ONE_MINUTE_MILLIS * 30;
      if (maxMilliseconds < ONE_HOUR_MILLIS * 8) return ONE_HOUR_MILLIS;
      if (maxMilliseconds < ONE_HOUR_MILLIS * 16) return ONE_HOUR_MILLIS * 2;
      if (maxMilliseconds < ONE_DAY_MILLIS) return ONE_HOUR_MILLIS * 4;
      if (maxMilliseconds < ONE_DAY_MILLIS * 2) return ONE_HOUR_MILLIS * 8;
      return ONE_DAY_MILLIS;
    })(),
  );
  const ticks: number[] = [];
  for (let i = valuePerTick; i < maxMilliseconds; i += valuePerTick)
    ticks.push(i);
  return ticks;
};

export const plusWeeks = (trackingDate: TrackingDate, weeks: number) => {
  return dayjsAsTrackingDate(
    trackingDateAsDayjs(trackingDate).add(weeks, "weeks"),
  );
};

export const plusDays = (trackingDate: TrackingDate, days: number) => {
  return dayjsAsTrackingDate(
    trackingDateAsDayjs(trackingDate).add(days, "days"),
  );
};

export const plusMonths = (trackingMonth: TrackingMonth, months: number) => {
  return dayJsAsTrackingMonth(
    trackingDateAsDayjs(trackingMonth).date(1).add(months, "months"),
  );
};

export const trackingDateAsDayjs = (trackingDate: TrackingDate) => {
  return dayjs()
    .year(trackingDate.year ?? 1)
    .month((trackingDate.month ?? 1) - 1)
    .date(trackingDate.day ?? 1);
};

const dayJsAsTrackingMonth = (date: Dayjs) => {
  return {
    month: date.month() + 1,
    year: date.year(),
  };
};
export const currentTrackingDate = () => {
  return dayjsAsTrackingDate(dayjs());
};

export const currentTrackingMonth = (): TrackingMonth => {
  const now = dayjs();
  return {
    month: now.month() + 1,
    year: now.year(),
  };
};

export const startOfCurrentTrackingWeek = () =>
  plusDays(currentTrackingDate(), -6);

export const dayjsAsTrackingDate = (day: Dayjs) => {
  return {
    year: day.year(),
    month: day.month() + 1,
    day: day.date(),
  };
};

export const trackingDateAsDate = (date: TrackingDate) => {
  return new Date(date.year ?? 0, (date.month ?? 1) - 1, date.day ?? 1);
};

export const dateAsTrackingDate = (date: Date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};

export const weeksInMonth = (year: number, month: number) => {
  let date = dayjs()
    .year(year)
    .month(month - 1)
    .date(1);
  let weeks = 1;
  while (date.month() === month - 1) {
    date = date.add(1, "week");
    weeks++;
  }
  return weeks;
};

export const daysInMonth = (year: number, month: number) => {
  return dayjs()
    .year(year)
    .month(month - 1)
    .date(1)
    .daysInMonth();
};

export const firstDayOfMonth = (year: number, month: number) => {
  return (
    dayjs()
      .year(year)
      .month(month - 1)
      .date(1)
      .day() + 1
  );
};

export const timestampForTrackedTime = (trackedTime: TrackedTime) => {
  const startTime = new Date(trackedTime.startTime);
  const endTime = new Date(trackedTime.endTime);
  return millisecondsToCompressedTimestamp(
    endTime.getTime() - startTime.getTime(),
  );
};

export const asLocalDateTime = (milliseconds: number) => {
  return new Date(milliseconds).toISOString();
};

export const BLANK_TIMESTAMP = "00:00.00";
