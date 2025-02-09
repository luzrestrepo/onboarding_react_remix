# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/server`
- `build/client`

Este proyecto utiliza Remix para gestionar rutas dinámicas, datos desde el servidor y validaciones. Con los conceptos mencionados, puedes crear aplicaciones robustas y con una experiencia optimizada tanto para el cliente como para el servidor.

Instalación de dependencias y arranque del proyecto

Requisitos previos

Node.js v14 o superior.

npm v6 o superior (o yarn).


Instala las dependencias necesarias ejecutando:

npm install

Pasos para arrancar el proyecto

Ejecuta el servidor Remix en modo desarrollo:

npm run dev

Abre tu navegador y ve a:

http://localhost:3000 o  http://localhost:5173

Conceptos de Remix

Links

Los links en Remix se usan para añadir recursos como estilos CSS o iconos en la aplicación.

Se utilizan dentro del componente <Links /> en el archivo root.tsx.

Ejemplo:

import { Links } from "@remix-run/react";

export default function App() {
  return (
    <html>
      <head>
        <Links />
      </head>
    </html>
  );
}

Loaders

Los loaders son funciones que se ejecutan en el servidor para obtener datos antes de renderizar un componente.

Se definen en cada archivo de ruta usando export const loader.

Ejemplo:

import { LoaderFunction, json } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  const data = { message: "Hola desde el servidor!" };
  return json(data);
};

Rutas dinámicas

Una ruta dinámica se define usando el prefijo $ en el nombre del archivo.

Ejemplo: contacts/$contactId.tsx crea una ruta que acepta un parámetro dinámico (contactId).

Rutas anidadas

Las rutas anidadas permiten crear estructuras jerárquicas de componentes y URL.

Ejemplo:

app/routes/contacts/index.tsx renderiza /contacts.

app/routes/contacts/$contactId.tsx renderiza /contacts/:contactId dentro de /contacts.

Outlet

El componente <Outlet /> es un marcador de posición para renderizar rutas anidadas.

Se utiliza en rutas principales para mostrar el contenido de rutas hijas.

Ejemplo:

import { Outlet } from "@remix-run/react";

export default function Contacts() {
  return (
    <div>
      <h1>Contactos</h1>
      <Outlet />
    </div>
  );
}

Funciones y conceptos clave

Action

Las actions manejan solicitudes POST, PUT, PATCH y DELETE desde formularios.

Se usan para procesar datos enviados por el cliente.

Ejemplo:

import { ActionFunction, redirect } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  console.log(name);
  return redirect("/thanks");
};

useLoaderData

Hook para acceder a los datos retornados por un loader.

Ejemplo:

import { useLoaderData } from "@remix-run/react";

export default function Example() {
  const data = useLoaderData();
  return <h1>{data.message}</h1>;
}

useActionData

Hook para acceder a los datos retornados por una action.

Ejemplo:

import { useActionData } from "@remix-run/react";

export default function FormPage() {
  const data = useActionData();
  return (
    <form method="post">
      <input name="name" type="text" />
      <button type="submit">Enviar</button>
      {data && <p>{data.message}</p>}
    </form>
  );
}

Invariant

invariant es una función que lanza errores si no se cumple una condición.

Muy útil para validar parámetros en loaders y actions.

Ejemplo:

import invariant from "tiny-invariant";

export const loader = async ({ params }) => {
  invariant(params.contactId, "El ID del contacto es obligatorio");
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Contacto no encontrado", { status: 404 });
  }
  return contact;
};

Validaciones en Remix

Las validaciones se realizan en el servidor dentro de los loaders o actions.

Ejemplo de validación en un action:

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");

  if (!email || !email.includes("@")) {
    return json({ error: "Email inválido" }, { status: 400 });
  }

  // Procesa los datos válidos
  return redirect("/success");
};
