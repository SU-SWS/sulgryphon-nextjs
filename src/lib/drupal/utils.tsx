import {stringify} from "qs"
import {AccessToken} from "next-drupal";
import {getAccessToken} from "./get-access-token";
import {PageProps} from "@/lib/drupal/drupal";

const JSONAPI_PREFIX = process.env.DRUPAL_JSONAPI_PREFIX || "/jsonapi"

export const buildUrl = (path: string, params?: string | Record<string, string> | URLSearchParams): URL => {
  const url = new URL(path.charAt(0) === "/" ? `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${path}` : path)

  if (params) {
    // Use instead URLSearchParams for nested params.
    url.search = stringify(params)
  }

  return url
}

export const getPathFromContext = (context: PageProps, prefix = ""): string => {
  let {slug} = context.params

  slug = Array.isArray(slug) ? slug.map((s) => encodeURIComponent(s)).join("/") : slug
  return prefix ? `${prefix}/${slug}` : slug
}

export const buildHeaders = async ({accessToken, headers = {"Content-Type": "application/json"}, draftMode = false}: {
  accessToken?: AccessToken
  headers?: HeadersInit
  draftMode?: boolean
} = {}): Promise<Headers> => {
  if (process.env.REQUEST_HEADERS) headers = {...headers, ...JSON.parse(process.env.REQUEST_HEADERS)};


  const requestHeaders = new Headers(headers);
  // This allows an access_token (preferrably long-lived) to be set directly on the env.
  // This reduces the number of OAuth call to the Drupal server.
  // Intentionally marked as unstable for now.
  if (process.env.UNSTABLE_DRUPAL_ACCESS_TOKEN) {
    requestHeaders.set('Authorization', `Bearer ${process.env.UNSTABLE_DRUPAL_ACCESS_TOKEN}`)
    return requestHeaders
  }

  const token = accessToken || (await getAccessToken(draftMode))
  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token.access_token}`)
  }

  return requestHeaders
}

export const getJsonApiPathForResourceType = async (type: string): Promise<string> => {
  const index = await getJsonApiIndex()
  return index?.links[type]?.href
}

export const getJsonApiIndex = async (options?: { accessToken?: AccessToken }): Promise<{
  links: { [type: string]: { href: string } }
}> => {
  const url = buildUrl(JSONAPI_PREFIX).toString()

  // As per https://www.drupal.org/node/2984034 /jsonapi is public.
  // We only call buildHeaders if accessToken or locale is explicitly set.
  // This is for rare cases where /jsonapi might be protected.
  // Cache the response for 1 year because it should almost never change.
  const response = await fetch(url, {
    next: {revalidate: 31536000},
    headers: options ? await buildHeaders(options) : {"Content-Type": "application/json"},
  })

  if (!response.ok) {
    throw new Error(`${url}: ${response.statusText}`)
  }

  return await response.json()
}
