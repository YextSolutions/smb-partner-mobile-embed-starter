import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Row from "~/components/Row";
import Screen from "~/components/Screen";
import {
  fetchEntity,
  getYextAPICredientialFromRequest,
  isSingleEntity,
} from "~/yext/api";

export const loader = async ({ params, context, request }: LoaderArgs) => {
  // request.p
  const creds = getYextAPICredientialFromRequest(request);

  invariant(params.entityId, "Expected URL Param: entityId");
  const { entityId } = params;

  const [entity, single] = await Promise.all([
    fetchEntity({ creds, entityId }),
    isSingleEntity({ creds }),
  ]);

  return json({ entity, single });
};

export default function LinkList() {
  const { entity, single } = useLoaderData<typeof loader>();

  const links = [
    {
      path: "gmb",
      name: "Google My Business",
    },
    {
      path: "linkedin",
      name: "LinkedIn",
    },
  ];
  return (
    <Screen backHref={single ? "/" : "/content"} title={entity.name} list>
      {links.map(({ path, name }) => (
        <Row
          key={path}
          href={`/content/${entity.meta.id}/link/${path}`}
          className="p-4 text-lg"
          showDisclosure
          newTab
        >
          Link {name}
        </Row>
      ))}
    </Screen>
  );
}
