import { ActionFunction, redirect, LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { getContact, updateContact } from "~/utils/contacts";

export const loader: LoaderFunction = async ({ params }) => {
  const contact = await getContact(params.contactId || "");
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ contact });
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const updates = {
    first: formData.get("first") as string,
    last: formData.get("last") as string,
    twitter: formData.get("twitter") as string,
  };
  await updateContact(params.contactId || "", updates);
  return redirect(`/contacts/${params.contactId}`);
};

export default function EditContactPage() {
  const { contact } = useLoaderData<typeof loader>();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Edit Contact</h1>
      <Form method="post">
        <div>
          <label>
            First Name:
            <input type="text" name="first" defaultValue={contact.first} />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input type="text" name="last" defaultValue={contact.last} />
          </label>
        </div>
        <div>
          <label>
            Twitter:
            <input type="text" name="twitter" defaultValue={contact.twitter} />
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </Form>
    </div>
  );
}