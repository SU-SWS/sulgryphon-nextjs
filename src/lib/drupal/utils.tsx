import {stringify} from "qs"

export const buildUrl = (path: string, params?: string | Record<string, string> | URLSearchParams): URL => {
  const url = new URL(path.charAt(0) === "/" ? `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${path}` : path)

  if (params) {
    // Use instead URLSearchParams for nested params.
    url.search = stringify(params)
  }

  return url
}

export const buildHeaders = (headers?: HeadersInit, isPreviewMode?: boolean): Headers => {
  const requestHeaders = new Headers(headers);
  const authCreds = (isPreviewMode ? process.env.DRUPAL_BASIC_AUTH_ADMIN : process.env.DRUPAL_BASIC_AUTH) as string

  requestHeaders.set("Authorization", "Basic " + Buffer.from(authCreds).toString("base64"));
  return requestHeaders
}