import { LoaderFunction, ActionFunction, json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { getContact, updateContact } from "~/utils/contacts";

export const loader: LoaderFunction = async ({ params }) => {
  console.log("Params in edit loader:", params); // Verifica el parámetro contactId
  const contact = await getContact(params.contactId || "");
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ contact });
};

export const action: ActionFunction = async ({ request, params }) => {
  const contactId = params.contactId;
  if (!contactId) {
    throw new Response("Not Found", { status: 404 });
  }
  const formData = await request.formData();
  const updates = {
    first: formData.get("first") as string,
    last: formData.get("last") as string,
    twitter: formData.get("twitter") as string,
  };
  await updateContact(contactId, updates);
  return redirect(`/contacts/${contactId}`);
};

export default function EditContactPage() {
  const { contact } = useLoaderData<typeof loader>();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Edit Contact</h1>
      <Form method="post">
        <div className="mb-4">
          <label>
            First Name:
            <input
              type="text"
              name="first"
              defaultValue={contact.first}
              className="border p-2 rounded w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            Last Name:
            <input
              type="text"
              name="last"
              defaultValue={contact.last}
              className="border p-2 rounded w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            Twitter:
            <input
              type="text"
              name="twitter"
              defaultValue={contact.twitter}
              className="border p-2 rounded w-full"
            />
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </Form>
    </div>
  );
}
