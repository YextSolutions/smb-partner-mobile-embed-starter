import invariant from "tiny-invariant";
import { z } from "zod";
import { DaySchema, HourseInterval, HoursSchema } from "~/yext/schemas";

export const dayTypes = ["CLOSED", "OPEN", "OPEN24HOURS"] as const;

export type DayTypes = typeof dayTypes[number];

export const days = [
  {
    label: "MON",
    key: "monday",
  },
  {
    label: "TUE",
    key: "tuesday",
  },
  {
    label: "WED",
    key: "wednesday",
  },
  {
    label: "THU",
    key: "thursday",
  },
  {
    label: "FRI",
    key: "friday",
  },
  {
    label: "SAT",
    key: "saturday",
  },
  {
    label: "SUN",
    key: "sunday",
  },
];

export const getFirstIntervalOnDay = (
  hours: z.infer<typeof HoursSchema>,
  day: string
): {
  interval: z.infer<typeof HourseInterval> | undefined | null;
  type: DayTypes;
} => {
  const dayLowercase = day.toLowerCase();
  const dayHours = (hours as any)[dayLowercase] as z.infer<typeof DaySchema>;

  invariant(dayHours, `Expected ${day} to be a valid day`);

  if (dayHours.isClosed) {
    return { interval: undefined, type: "CLOSED" };
  }

  const { openIntervals } = dayHours;
  invariant(
    openIntervals,
    `Expected ${day} to have openIntervals if not closed`
  );
  const firstInteval = openIntervals[0];
  if (firstInteval.start === "00:00" && firstInteval.end === "23:59") {
    return { interval: firstInteval, type: "OPEN24HOURS" };
  } else {
    return { interval: openIntervals[0], type: "OPEN" };
  }
};
