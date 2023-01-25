import cx from "classnames";
import { z } from "zod";
import { days, DayTypes, getFirstIntervalOnDay } from "~/yext/hours";
import { HoursSchema } from "~/yext/schemas";
import Time from "./Time";

type Props = {
  //Insert Props Here
  className?: string;
  hours: z.infer<typeof HoursSchema>;
};

const Hours = ({ className, hours }: Props) => {
  return (
    <div className={cx(className)}>
      <div className="">
        <table className="">
          <tbody>
            {days.map((day) => {
              const dayDetails = hours
                ? getFirstIntervalOnDay(hours, day.key)
                : {
                    type: "OPEN" as DayTypes,
                    interval: {
                      start: "09:00",
                      end: "17:00",
                    },
                  };

              const classCellName = " px-2 py-1";
              return (
                <tr>
                  <td className={classCellName}>
                    <span className="text-sm font-bold text-gray-500">
                      {day.label}
                    </span>
                  </td>
                  <td className={classCellName}>
                    {dayDetails.type === "OPEN" && dayDetails?.interval && (
                      <div>
                        <Time time={dayDetails.interval.start} /> -{" "}
                        <Time time={dayDetails.interval.end} />
                      </div>
                    )}
                    {dayDetails.type === "CLOSED" && (
                      <div className="text-gray-500">Closed</div>
                    )}
                    {dayDetails.type === "OPEN24HOURS" && (
                      <div className="text-black">Open 24 Hours</div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hours;
