import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FaLink, FaRegClock } from "react-icons/fa";
import invariant from "tiny-invariant";
import Address from "~/components/Address";
import Button from "~/components/Button";
import Hours from "~/components/Hours";
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

export default function EntityEdit() {
  const { entity, single } = useLoaderData<typeof loader>();
  return (
    <Screen backHref={single ? "/" : "/content"} title={entity.name}>
      <div className="flex justify-between w-full">
        <div>{entity.address && <Address address={entity.address} />}</div>
        {entity.logo && (
          <img src={entity.logo.image.url} width={75} height={75} />
        )}
      </div>
      {entity.hours && <Hours hours={entity.hours} />}
      <Button
        href={`/content/${entity.meta.id}/edit/hours`}
        icon={<FaRegClock />}
      >
        Edit Hours
      </Button>

      {links.map((link) => (
        <Button
          key={link.path}
          href={`/content/${entity.meta.id}/link/${link.path}`}
          icon={<FaLink />}
          newTab
        >
          Link {link.name}
        </Button>
      ))}
    </Screen>
  );
}
