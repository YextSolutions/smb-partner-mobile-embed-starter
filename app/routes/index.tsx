import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BsInfoCircleFill, BsPencilSquare, BsStarHalf } from "react-icons/bs";
import Row from "~/components/Row";
import Screen from "~/components/Screen";
import { getYextAPICredientialFromRequest, isSingleEntity } from "~/yext/api";

export const loader = async ({ params, context, request }: LoaderArgs) => {
  const creds = getYextAPICredientialFromRequest(request);
  const single = await isSingleEntity({ creds });

  return json({ single });
};

export default function Index() {
  const { single } = useLoaderData<typeof loader>();

  const shortcuts = [
    {
      name: "Business Info",
      subtitle: "Edit your business information like hours",
      icon: <BsInfoCircleFill />,
      href: single ? `/content/${single}` : "/content",
    },
    {
      name: "Reviews",
      subtitle: "View your recent reviews and respond to them",
      icon: <BsStarHalf />,
      href: "/reviews",
    },
    {
      name: "Social Posts",
      subtitle: "Make a post to your social media accounts",
      icon: <BsPencilSquare />,
      href: "/post",
    },
  ];

  return (
    <Screen list>
      {shortcuts.map((s) => (
        <Row key={s.name} href={s.href} showDisclosure>
          <div className="flex gap-4 items-center  ">
            <div className="text-2xl  w-12 h-12 bg-primary-color text-white flex items-center justify-center rounded-full flex-none">
              {s.icon}
            </div>
            <div>
              <div className="text-xl font-medium">{s.name}</div>
              <div className="text-gray-500">{s.subtitle}</div>
            </div>
          </div>
        </Row>
      ))}
    </Screen>
  );
}
