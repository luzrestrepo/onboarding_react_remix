import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getContact } from "~/utils/contacts";

// Loader para obtener un solo contacto
export const loader: LoaderFunction = async ({ params }) => {
  const contact = await getContact(params.contactId || "");
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ contact });
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
    </div>
  );
}