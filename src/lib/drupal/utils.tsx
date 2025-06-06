import {stringify} from "qs"
import {MenuItem, NodeInterface} from "@/lib/gql/__generated__/drupal.d"

export const buildUrl = (path: string, params?: string | Record<string, string> | URLSearchParams): URL => {
  const url = new URL(path.charAt(0) === "/" ? `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${path}` : path)

  if (params) {
    // Use instead URLSearchParams for nested params.
    url.search = stringify(params)
  }

  return url
}

export const buildHeaders = (headers?: HeadersInit, isPreviewMode?: boolean): Headers => {
  const requestHeaders = new Headers(headers)
  const authCreds = (isPreviewMode ? process.env.DRUPAL_BASIC_AUTH_ADMIN : process.env.DRUPAL_BASIC_AUTH) as string

  requestHeaders.set("Authorization", "Basic " + Buffer.from(authCreds).toString("base64"))
  return requestHeaders
}

export const getActiveTrail = (menuItems: MenuItem[], currentPath: NodeInterface["path"]) => {
  const getActiveTrailInner = (menuItems: MenuItem[], trail: string[] = []): string[] => {
    let childTrail, currentTrail
    for (let i = 0; i < menuItems.length; i++) {
      currentTrail = [...trail]
      currentTrail.push(menuItems[i].id)

      if (currentPath === menuItems[i].url) {
        return currentTrail
      }

      if (menuItems[i].children) {
        childTrail = getActiveTrailInner(menuItems[i].children, [...currentTrail])
        if (childTrail.length > 0) {
          return childTrail
        }
      }
    }
    return []
  }
  return getActiveTrailInner(menuItems)
}

export type Slug = {slug: string[]}

export type PageProps = {
  params: Promise<Slug>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export const getPathFromContext = (slug: string | string[], prefix = ""): string => {
  let slugString = Array.isArray(slug) ? slug.map(s => encodeURIComponent(s)).join("/") : slug
  slugString = slugString.replace(/^\//, "")
  return prefix ? `${prefix}/${slugString}` : `/${slugString}`
}
