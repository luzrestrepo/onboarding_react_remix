import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createEmptyContact } from "~/utils/contacts";

export const action: ActionFunction = async () => {
  const newContact = await createEmptyContact();
  return redirect(`/contacts/${newContact.id}`);
};

export default function NewContactPage() {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Add New Contact</h1>
      <Form method="post">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create New Contact
        </button>
      </Form>
    </div>
  );
}