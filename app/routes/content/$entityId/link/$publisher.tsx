import { LoaderArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import {
  getOptimizationLink,
  getYextAPICredientialFromRequest,
} from "~/yext/api";

export const loader = async ({ params, context, request }: LoaderArgs) => {
  // request.p
  const creds = getYextAPICredientialFromRequest(request);

  const { entityId, publisher } = z
    .object({
      entityId: z.string(),
      //   Enum of GMB or Facebook
      publisher: z.enum(["gmb", "linkedin"]),
    })
    .parse(params);

  const taskIdMap = {
    gmb: 29,
    linkedin: 114,
  };

  const { link } = await getOptimizationLink({
    creds,
    entityIds: [entityId],
    taskIds: [taskIdMap[publisher]],
  });

  return redirect(link);
};
