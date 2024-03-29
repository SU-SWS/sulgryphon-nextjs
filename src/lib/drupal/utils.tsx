import {stringify} from "qs"
import {AccessToken} from "next-drupal";
import {getAccessToken} from "./get-access-token";

export const buildUrl = (path: string, params?: string | Record<string, string> | URLSearchParams): URL => {
  const url = new URL(path.charAt(0) === "/" ? `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${path}` : path)

  if (params) {
    // Use instead URLSearchParams for nested params.
    url.search = stringify(params)
  }

  return url
}

export const buildHeaders = async ({accessToken, headers = {}, previewMode = false}: {
  accessToken?: AccessToken
  headers?: HeadersInit
  previewMode?: boolean
} = {}): Promise<Headers> => {
  if (process.env.REQUEST_HEADERS) headers = {...headers, ...JSON.parse(process.env.REQUEST_HEADERS)};

  const requestHeaders = new Headers(headers);

  const token = accessToken || (await getAccessToken(previewMode))
  if (token) requestHeaders.set('Authorization', `Bearer ${token.access_token}`)

  return requestHeaders
}
