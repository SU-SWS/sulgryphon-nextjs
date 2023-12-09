import {AccessToken, DrupalTranslatedPath} from "next-drupal";
import {buildHeaders, buildUrl, getPathFromContext} from "./utils";
import {PageProps} from "@/lib/drupal/drupal";

export const translatePath = async (
  path: string,
  options?: {
    accessToken?: AccessToken
    draftMode?: boolean
  }
): Promise<DrupalTranslatedPath | null> => {
  options = {
    draftMode: false,
    ...options
  }
  const url = buildUrl("/router/translate-path", {
    path,
  })

  const response = await fetch(url.toString(), {
    headers: await buildHeaders(options),
  })

  if (!response.ok) {
    return null
  }

  const json = await response.json()

  return json
}

export const translatePathFromContext = async (
  context: PageProps,
  options?: {
    accessToken?: AccessToken
    prefix?: string
    draftMode?: boolean
  }
): Promise<DrupalTranslatedPath | null> => {
  options = {
    prefix: "",
    draftMode: false,
    ...options,
  }
  const path = getPathFromContext(context, options.prefix)

  const response = await translatePath(path, options)

  return response
}
