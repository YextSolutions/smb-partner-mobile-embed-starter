import { json, LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import Screen from "~/components/Screen";
import { fetchEntities, getYextAPICredientialFromRequest } from "~/yext/api";

export const loader = async ({ params, context, request }: LoaderArgs) => {
  const creds = getYextAPICredientialFromRequest(request);
  const data = await fetchEntities({ creds });

  return json({ data });
};

export default function Post() {
  const { data } = useLoaderData<typeof loader>();
  const transition = useTransition();

  return (
    <Screen backHref={"/"} title="New Post">
      <Form>
        {/* Series of checkboxes for each entity */}
        <div>
          <div className="text-lg text-gray-500 font-medium">
            Choose Businesses to Post
          </div>
          {data.entities.map((e) => (
            <label key={e.meta.id} className=" flex gap-1 items-center">
              <input type="checkbox" name="entities" defaultChecked={true} />
              {e.name}
            </label>
          ))}
        </div>
        <div>
          <div className="text-lg text-gray-500 font-medium mt-4">
            Write Post
          </div>
          <textarea
            name="contents"
            autoFocus
            className="w-full p-4 border border-primary-color rounded-md focus:outline-primary-color"
            //   5 Lines
            rows={5}
            placeholder="Write your post here!"
          />
        </div>
        <button className="btn btn-primary mt-4" type="submit">
          {transition.state === "submitting" ? "Posting..." : "Post"}
        </button>
      </Form>
      <button className="btn btn-secondary mt-4" type="submit">
        Generate Post
      </button>
    </Screen>
  );
}
