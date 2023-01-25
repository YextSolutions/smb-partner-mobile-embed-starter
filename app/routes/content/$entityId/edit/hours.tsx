import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import set from "set-value";
import invariant from "tiny-invariant";
import { z } from "zod";
import Address from "~/components/Address";
import HoursRow from "~/components/Forms/HoursRow";
import Screen from "~/components/Screen";
import {
  fetchEntity,
  getYextAPICredientialFromRequest,
  updateEntity,
} from "~/yext/api";
import { days } from "~/yext/hours";

export const loader = async ({ params, context, request }: LoaderArgs) => {
  const { entityId } = params;
  invariant(entityId, "Expected URL Param: entityId");

  const creds = getYextAPICredientialFromRequest(request);
  const entity = await fetchEntity({ creds, entityId });

  return json({ entity });
};

export const action: ActionFunction = async ({ params, request }) => {
  const creds = getYextAPICredientialFromRequest(request);
  invariant(params.entityId, "Expected URL Param: entityId");

  const formData = await request.formData();
  // const [errors, project] = await createProject(formData);
  const values = Object.fromEntries(formData);

  const obj: any = {};
  for (const [key, value] of Object.entries(values)) {
    set(obj, key, value);
  }

  const HoursUpdateSchemaDay = z.object({
    type: z.enum(["OPEN", "CLOSED", "OPEN24HOURS"]),
    interval: z
      .object({
        start: z.string().optional(),
        end: z.string().optional(),
      })
      .optional(),
  });

  if (!obj.specifyHours) {
    return updateEntity({
      creds,
      entityId: params.entityId,
      data: { hours: null },
    });
  }

  const HoursUpdateSchema = z.object({
    sunday: HoursUpdateSchemaDay,
    monday: HoursUpdateSchemaDay,
    tuesday: HoursUpdateSchemaDay,
    wednesday: HoursUpdateSchemaDay,
    thursday: HoursUpdateSchemaDay,
    friday: HoursUpdateSchemaDay,
    saturday: HoursUpdateSchemaDay,
  });

  const hoursUpdate = HoursUpdateSchema.parse(obj);

  // const yextHours: z.infer<typeof HoursSchema> = {}
  const yextHours: any = {};

  // Loop through objects and values
  for (const [day, value] of Object.entries(hoursUpdate)) {
    const { type, interval } = value;
    if (type === "OPEN") {
      invariant(interval, "Expected interval");
      const { start, end } = interval;
      invariant(start, "Expected start");
      invariant(end, "Expected end");
      yextHours[day] = {
        isClosed: false,
        openIntervals: [{ start, end }],
      };
    } else if (type === "CLOSED") {
      yextHours[day] = {
        isClosed: true,
      };
    } else if (type === "OPEN24HOURS") {
      yextHours[day] = {
        isClosed: false,
        openIntervals: [{ start: "00:00", end: "23:59" }],
      };
    }
  }

  return updateEntity({
    creds,
    entityId: params.entityId,
    data: { hours: yextHours },
  });
};

export default function HoursEdit() {
  const { entity } = useLoaderData<typeof loader>();
  const [specifyHours, setSpecifyHours] = useState(entity.hours !== undefined);
  const transition = useTransition();
  const action = useActionData();

  useEffect(() => {
    if (action?.meta?.uuid) {
      toast.success("Hours updated");
    }
  }, [action?.meta?.uuid]);

  return (
    <Screen backHref={`/content/${entity.meta.id}`} title="Edit Hours">
      <div>
        <div className="uppercase text-xs tracking-wider font-bold text-gray-500">
          Business
        </div>
        <div className="px-4 py-2 border bg-gray-50 rounded-md">
          <div className="font-medium">{entity.name}</div>
          {entity.address && <Address address={entity.address} />}
        </div>
      </div>
      <div className="uppercase text-xs tracking-wider font-bold text-gray-500">
        Hours
      </div>
      <Form method="post">
        <fieldset disabled={transition.state === "submitting"}>
          <div className="flex items-center gap-2">
            <input
              name="specifyHours"
              type="checkbox"
              checked={specifyHours}
              onChange={(e) => setSpecifyHours(e.target.checked)}
            />
            <label htmlFor="specifyHours" className="text-sm">
              Specify Hours
            </label>
          </div>
          {specifyHours && (
            <div className="w-full overflow-x-auto">
              <table className="w-full overflow-x-auto">
                <tbody>
                  {days.map((d) => {
                    return (
                      <HoursRow key={d.key} day={d} hours={entity.hours} />
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <button className="btn btn-primary mt-4" type="submit">
            {transition.state === "submitting" ? "Updating..." : "Update Hours"}
          </button>
        </fieldset>
      </Form>

      {/* <Button href="/#" primary>
        Update Hours
      </Button> */}
    </Screen>
  );
}
