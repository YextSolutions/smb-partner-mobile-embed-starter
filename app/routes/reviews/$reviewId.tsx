import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import invariant from "tiny-invariant";
import AuthorAndDate from "~/components/AuthorAndDate";
import Screen from "~/components/Screen";
import Stars from "~/components/Stars";
import { fetchReview, getYextAPICredientialFromRequest } from "~/yext/api";

export const loader = async ({ params, context, request }: LoaderArgs) => {
  const creds = getYextAPICredientialFromRequest(request);
  invariant(params.reviewId, "Expected URL Param: reviewId");
  const review = await fetchReview({
    creds,
    reviewId: parseInt(params.reviewId),
  });

  return json({ review });
};

export default function ReviewsList() {
  const { review } = useLoaderData<typeof loader>();
  return (
    <Screen backHref="/reviews" title="Review">
      <Stars rating={review.rating} className="text-xl" />
      <div>{review.content}</div>
      <p className="text-gray-500">
        <AuthorAndDate
          author={review.authorName}
          dateNumber={review.publisherDate}
        />
      </p>
      <div className="border-l-4 border-gray-300 pl-4">
        {review.comments.map((c) => (
          <div key={c.id}>
            <p>{c.content}</p>
            <p className="text-sm text-gray-500">
              <AuthorAndDate
                author={c.authorName}
                dateNumber={c.publisherDate}
              />
            </p>
          </div>
        ))}
      </div>

      <textarea
        placeholder="Respond to review here"
        className="mt-4 w-full rounded-md border border-primary-color p-4 focus:border-2 focus:outline-none"
      />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <button className="hover:bg-gray-10 flex w-full items-center justify-center gap-2 rounded-md border border-primary-color px-2 py-2 text-primary-color hover:bg-gray-100">
          <BsFillLightningChargeFill />
          Generate Response
        </button>
        <button className="w-full rounded-md bg-primary-color px-2 py-2 text-center text-white hover:opacity-90">
          Respond
        </button>
      </div>
    </Screen>
  );
}
