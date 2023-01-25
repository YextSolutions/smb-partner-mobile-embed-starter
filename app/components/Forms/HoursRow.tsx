import { useState } from "react";
import { z } from "zod";
import { DayTypes, getFirstIntervalOnDay } from "~/yext/hours";
import { HoursSchema } from "~/yext/schemas";

type Props = {
  //Insert Props Here
  className?: string;
  hours: z.infer<typeof HoursSchema> | undefined;
  day: {
    label: string;
    key: string;
  };
};

const FakeTimePicker = () => {
  return (
    <div className="bg-gray-100 py-1 px-2 rounded-md w-24 text-gray-500">
      -- : --
    </div>
  );
};

const HoursRow = ({ hours, className, day }: Props) => {
  const dayDetails = hours
    ? getFirstIntervalOnDay(hours, day.key)
    : {
        type: "OPEN" as DayTypes,
        interval: {
          start: "09:00",
          end: "17:00",
        },
      };
  const [dayType, setDayType] = useState<DayTypes>(dayDetails.type);
  const classCellName = "border-b border-gray-300 px-2 py-1";
  return (
    <tr>
      <td className={classCellName}>
        <span className="text-sm font-bold text-gray-500">{day.label}</span>
      </td>
      <td className={classCellName}>
        <select
          name={`${day.key}.type`}
          value={dayType}
          onChange={(e) => setDayType(e.target.value as DayTypes)}
        >
          <option value="CLOSED">Closed</option>
          <option value="OPEN">Open</option>
          <option value="OPEN24HOURS">24 Hours</option>
        </select>
      </td>
      <td className={classCellName}>
        {dayType === "OPEN" && (
          <input
            className="disabled:bg-gray-100 text-gray-800 px-2 py-1 bg-gray-100 rounded-md "
            disabled={dayType !== "OPEN"}
            type="time"
            name={`${day.key}.interval.start`}
            defaultValue={dayDetails?.interval?.start}
          />
        )}
        {dayType !== "OPEN" && <FakeTimePicker />}
      </td>
      <td className={classCellName}>
        {dayType === "OPEN" && (
          <input
            className="disabled:bg-gray-100 text-gray-800 px-2 py-1 bg-gray-100 rounded-md "
            disabled={dayType !== "OPEN"}
            type="time"
            name={`${day.key}.interval.end`}
            defaultValue={dayDetails?.interval?.end}
          />
        )}
        {dayType !== "OPEN" && <FakeTimePicker />}
      </td>
    </tr>
  );
};

export default HoursRow;
