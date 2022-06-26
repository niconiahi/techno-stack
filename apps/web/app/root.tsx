import type { ReactElement } from "react"
import type { MetaFunction, LinksFunction } from "@remix-run/node"
import {
  Meta,
  Links,
  Outlet,
  Scripts,
  useCatch,
  LiveReload,
  ScrollRestoration,
} from "@remix-run/react"

import appStyles from "~/styles/app.css"

export const meta: MetaFunction = () => {
  return { title: "niconiahi.dev" }
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: appStyles }]
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link href="/favicon.png" rel="icon" type="image/png" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  )
}

export default function App(): ReactElement {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

export function CatchBoundary(): ReactElement {
  const caught = useCatch()

  switch (caught.status) {
    case 404:
      return (
        <Document title={`${caught.status} ${caught.statusText}`}>
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </Document>
      )

    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status}`,
      )
  }
}

export function ErrorBoundary({ error }: { error: Error }): ReactElement {
  console.error(error)

  return (
    <Document>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  )
}
