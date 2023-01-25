import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AuthorAndDate from "~/components/AuthorAndDate";
import EmbedLink from "~/components/EmbedLink";
import Screen from "~/components/Screen";
import Stars from "~/components/Stars";
import { fetchReviews, getYextAPICredientialFromRequest } from "~/yext/api";

export const loader = async ({ params, context, request }: LoaderArgs) => {
  // request.p
  const creds = getYextAPICredientialFromRequest(request);
  const reviews = await fetchReviews({ creds });
  return json({ creds, reviews });
};

export default function ReviewsList() {
  const { reviews } = useLoaderData<typeof loader>();
  return (
    <Screen title="Reviews" backHref="/" list>
      {reviews?.reviews?.map((review) => (
        <EmbedLink key={review.id} className="" href={`/reviews/${review.id}`}>
          <div className="flex flex-col gap-1 p-4 hover:bg-gray-100">
            <div className="flex items-center justify-between gap-4">
              <Stars key={review.id} rating={review.rating} />
              <div className="text-sm uppercase text-gray-500">
                {review.publisherId}
              </div>
            </div>
            <h1 className="font-bold">{review.title}</h1>
            <p>{review.content}</p>

            <p className="text-sm text-gray-500">
              <AuthorAndDate
                author={review.authorName}
                dateNumber={review.publisherDate}
              />
            </p>

            {review.comments.length > 0 && (
              <div>
                <div className="text-sm text-gray-500">
                  {review.comments.length} Comments
                </div>
              </div>
            )}
          </div>
        </EmbedLink>
      ))}
    </Screen>
  );
}
