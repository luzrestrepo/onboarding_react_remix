import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Welcome to Remix Contacts</h1>
      <Link to="/contacts" className="text-blue-500">View Contacts</Link>
    </div>
  );
}