// @ts-nocheck
import "server-only";

import {stringify} from "qs"
import {GetStaticPropsContext} from "next";
import {AccessToken, Locale} from "next-drupal/src/types";
import {getAccessToken} from "./get-access-token";

const JSONAPI_PREFIX = process.env.DRUPAL_JSONAPI_PREFIX || "/jsonapi"

export const buildUrl = (
  path: string,
  params?: string | Record<string, string> | URLSearchParams
): URL => {
  const url = new URL(
    path.charAt(0) === "/"
      ? `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${path}`
      : path
  )

  if (params) {
    // Use instead URLSearchParams for nested params.
    url.search = stringify(params)
  }

  return url
}

export function getPathFromContext(
  context: GetStaticPropsContext,
  prefix = ""
) {
  let { slug } = context.params

  slug = Array.isArray(slug)
    ? slug.map((s) => encodeURIComponent(s)).join("/")
    : slug

  // Handle locale.
  if (context.locale && context.locale !== context.defaultLocale) {
    slug = `/${context.locale}/${slug}`
  }

  return !slug
    ? process.env.DRUPAL_FRONT_PAGE
    : prefix
      ? `${prefix}/${slug}`
      : slug
}


export async function buildHeaders({
                                     accessToken,
                                     headers = {
                                       "Content-Type": "application/json",
                                     },
                                   }: {
  accessToken?: AccessToken
  headers?: RequestInit["headers"]
} = {}): Promise<RequestInit["headers"]> {
  // This allows an access_token (preferrably long-lived) to be set directly on the env.
  // This reduces the number of OAuth call to the Drupal server.
  // Intentionally marked as unstable for now.
  if (process.env.UNSTABLE_DRUPAL_ACCESS_TOKEN) {
    headers[
      "Authorization"
      ] = `Bearer ${process.env.UNSTABLE_DRUPAL_ACCESS_TOKEN}`

    return headers
  }

  const token = accessToken || (await getAccessToken())
  if (token) {
    headers["Authorization"] = `Bearer ${token.access_token}`
  }

  return headers
}

export async function getJsonApiPathForResourceType(
  type: string,
  locale?: Locale
) {
  const index = await getJsonApiIndex(locale)

  return index?.links[type]?.href
}
export async function getJsonApiIndex(
  locale?: Locale,
  options?: {
    accessToken?: AccessToken
  }
): Promise<{
  links: {
    [type: string]: {
      href: string
    }
  }
}> {
  const url = buildUrl(
    locale ? `/${locale}${JSONAPI_PREFIX}` : `${JSONAPI_PREFIX}`
  )

  // As per https://www.drupal.org/node/2984034 /jsonapi is public.
  // We only call buildHeaders if accessToken or locale is explicitly set.
  // This is for rare cases where /jsonapi might be protected.
  const response = await fetch(url.toString(), {
    headers:
      locale || options
        ? await buildHeaders(options)
        : {
          "Content-Type": "application/json",
        },
  })

  if (!response.ok) {
    throw new Error(url.toString(), response.statusText)
  }

  return await response.json()
}