import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Address from "~/components/Address";
import Row from "~/components/Row";
import Screen from "~/components/Screen";
import { fetchEntities, getYextAPICredientialFromRequest } from "~/yext/api";

export const loader = async ({ params, context, request }: LoaderArgs) => {
  // request.p
  const creds = getYextAPICredientialFromRequest(request);
  const { entities } = await fetchEntities({ creds });
  return json({ entities });
};

export default function ContentList() {
  const { entities } = useLoaderData<typeof loader>();
  return (
    <Screen title="Content" backHref="/" list>
      {entities.map((e) => (
        <Row href={`/content/${e.meta.id}`} key={e.meta.id}>
          <div className="flex w-full justify-between gap-4">
            <div>
              <div className="font-bold line-clamp-1">{e.name}</div>
              {e.address && !e.addressHidden && (
                <Address
                  className="text-sm text-gray-700"
                  address={e.address}
                />
              )}
            </div>
            <div className="flex-none">
              {e.logo && <img src={e.logo.image.url} width={75} height={75} />}
            </div>
          </div>
        </Row>
      ))}
    </Screen>
  );
}
