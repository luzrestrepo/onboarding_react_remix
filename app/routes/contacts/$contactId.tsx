import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { deleteContact, getContact } from "~/utils/contacts";

export const loader: LoaderFunction = async ({ params }) => {
    console.log("Params in $contactId loader:", params); // Verifica el parámetro contactId
    const contact = await getContact(params.contactId || "");
    if (!contact) {
      throw new Response("Not Found", { status: 404 });
    }
    return json({ contact });
  };

export const action: ActionFunction = async ({ params }) => {
    const contactId = params.contactId;
    if (contactId) {
      await deleteContact(contactId);
      return redirect("/contacts"); // Redirigir a la lista de contactos después de eliminar
    }
    throw new Response("Contact ID not provided", { status: 400 });
  };

// Componente para mostrar el detalle del contacto
export default function ContactDetailPage() {
  const { contact } = useLoaderData<typeof loader>();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">
        {contact.first} {contact.last}
      </h1>
      <img src={contact.avatar} alt={contact.first} className="w-20 h-20 rounded-full my-3" />
      <p>Twitter: {contact.twitter || "No Twitter"}</p>
      <Form method="post">
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Delete Contact
        </button>
      </Form>
    </div>
  );
}