import { LoaderFunction, ActionFunction, json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { getContact, deleteContact } from "~/utils/contacts";

export const loader: LoaderFunction = async ({ params }) => {
  const contactId = params.contactId || "";
  const contact = await getContact(contactId);
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ contact });
};

export const action: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData();
  const actionType = formData.get("_action");

  if (actionType === "delete") {
    const contactId = params.contactId || "";
    await deleteContact(contactId);
    return redirect("/contacts");
  }
};

export default function ContactDetail() {
  const { contact } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>
        {contact.first} {contact.last}
      </h1>
      <img src={contact.avatar} alt={contact.first} />
      <p>Twitter: {contact.twitter || "No Twitter"}</p>
      <Form method="post">
        <button type="submit" name="_action" value="delete">
          Delete
        </button>
      </Form>
      <Form action="edit">
        <button type="submit">Edit</button>
      </Form>
    </div>
  );
}