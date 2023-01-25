import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import TextInput from "~/components/Forms/TextInput";
import Screen from "~/components/Screen";
import { encryptCreds, YextCredsSchema } from "~/yext/api";

// Action
// import { Form, useLoaderData, useTransition } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  //   Create a URL based on the root of the requests
  const url = new URL(request.url);
  url.pathname = "/";

  const { apiKey, accountId, ...otherValues } = values;

  const creds = YextCredsSchema.parse({ apiKey, accountId });
  // Encode and encrypt creds
  const encryptedCreds = encryptCreds(creds);

  url.searchParams.set("creds", encryptedCreds);
  //   Add the values to the URL
  Object.entries(otherValues).forEach(([key, value]) => {
    url.searchParams.set(key, value as string);
  });

  //   Redirect to the new URL
  return redirect(url.toString());
};

export default function Index() {
  return (
    <Screen title="Generate Embed URL">
      <p className="text-gray-700">
        Fill out the following fields to generate an embed URL you can easily
        embed in your application. Note that all this is doing is crafting a URL
        with params and this can be easily accomplished promgrammatically.
      </p>
      <Form method="post">
        <div className="flex flex-col gap-4">
          <TextInput
            required
            label="API Key"
            name="apiKey"
            placeholder="XXXX-XXX"
            defaultValue="2b68dc471f7fe7b60a9d07c226a92365"
            description="The API Key from an app that has permission to read/write on entites, reviews and posting APIs"
          />
          <TextInput
            label="Account ID"
            name="accountId"
            defaultValue="1281650"
            description="(Optional) If you want to open up a specific sub-account enter the account ID. "
          />
          <TextInput
            label="Primary Color"
            name="primaryColor"
            placeholder="Font Color"
            type="color"
            description="The primary color for the app"
            defaultValue="#353091"
          />
          <TextInput
            label="Font"
            name="font"
            placeholder="Font Name"
            description="The font for the app. These needs to be a native web font"
            defaultValue="Verdana"
          />
          <button
            className="btn border border-gray-700 text-gray-700 hover:bg-gray-100"
            type="submit"
          >
            Generate Link
          </button>
        </div>
      </Form>
    </Screen>
  );
}
