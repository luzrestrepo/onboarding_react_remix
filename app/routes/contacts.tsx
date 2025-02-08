import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { ContactRecord } from "~/utils/contacts";
import { getContacts } from "~/utils/contacts";

export const loader: LoaderFunction = async () => {
  const contacts = await getContacts();
  return json({ contacts });
};

export default function ContactsPage() {
  const { contacts } = useLoaderData<typeof loader>();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Contact List</h1>
      <ul>
        {contacts.map((contact:ContactRecord) => (
          <li key={contact.id} className="border p-3 mb-2 rounded-md">
            <img src={contact.avatar} alt={contact.first} className="w-10 h-10 rounded-full" />
            <h2 className="text-lg font-semibold">
              {contact.first} {contact.last}
            </h2>
            <p>{contact.twitter ? `Twitter: ${contact.twitter}` : "No Twitter"}</p>
            <Link to={`/contacts/${contact.id}`} className="text-blue-500">View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}