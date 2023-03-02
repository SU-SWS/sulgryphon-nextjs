import {AccessToken, JsonApiResource, JsonApiWithLocaleOptions} from "next-drupal/src/types";
import {stringify} from "qs"

import {deserialize, buildUrl, buildHeaders, getJsonApiPathForResourceType, getPathFromContext} from "./utils";

export async function getResourceByPath<T extends JsonApiResource>(
  path: string,
  options?: {
    accessToken?: AccessToken
    deserialize?: boolean
    isVersionable?: boolean
  } & JsonApiWithLocaleOptions
): Promise<T> {
  options = {
    deserialize: true,
    isVersionable: false,
    params: {},
    ...options,
  }

  if (!path) {
    return null
  }

  if (
    options.locale &&
    options.defaultLocale &&
    path.indexOf(options.locale) !== 1
  ) {
    path = path === "/" ? path : path.replace(/^\/+/, "")
    path = getPathFromContext({
      params: { slug: [path] },
      locale: options.locale,
      defaultLocale: options.defaultLocale,
    })
  }

  const { resourceVersion = "rel:latest-version", ...params } = options.params

  if (options.isVersionable) {
    params.resourceVersion = resourceVersion
  }

  const resourceParams = stringify(params)

  const payload = [
    {
      requestId: "router",
      action: "view",
      uri: `/router/translate-path?path=${path}&_format=json`,
      headers: { Accept: "application/vnd.api+json" },
    },
    {
      requestId: "resolvedResource",
      action: "view",
      uri: `{{router.body@$.jsonapi.individual}}?${resourceParams.toString()}`,
      waitFor: ["router"],
    },
  ]

  // Localized subrequests.
  // I was hoping we would not need this but it seems like subrequests is not properly
  // setting the jsonapi locale from a translated path.
  let subrequestsPath = "/subrequests"
  if (
    options.locale &&
    options.defaultLocale &&
    options.locale !== options.defaultLocale
  ) {
    subrequestsPath = `/${options.locale}/subrequests`
  }

  const url = buildUrl(subrequestsPath, {
    _format: "json",
  })

  const response = await fetch(url.toString(), {
    method: "POST",
    credentials: "include",
    headers: await buildHeaders(options),
    redirect: "follow",
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const json = await response.json()

  if (!json["resolvedResource#uri{0}"]) {
    return null
  }

  const data = JSON.parse(json["resolvedResource#uri{0}"]?.body)

  if (data.errors) {
    throw new Error(data.errors[0].detail)
  }

  return options.deserialize ? deserialize(data) : data
}

export async function getResourceCollection<T = JsonApiResource[]>(
  type: string,
  options?: {
    deserialize?: boolean
    accessToken?: AccessToken
  } & JsonApiWithLocaleOptions
): Promise<T> {
  options = {
    deserialize: true,
    ...options,
  }

  const apiPath = await getJsonApiPathForResourceType(
    type,
    options?.locale !== options?.defaultLocale ? options.locale : undefined
  )

  if (!apiPath) {
    throw new Error(`Error: resource of type ${type} not found.`)
  }

  const url = buildUrl(apiPath, {
    ...options?.params,
  })

  const response = await fetch(url.toString(), {
    headers: await buildHeaders(options),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const json = await response.json()

  return options.deserialize ? deserialize(json) : json
}

export async function getResource<T extends JsonApiResource>(
  type: string,
  uuid: string,
  options?: {
    accessToken?: AccessToken
    deserialize?: boolean
  } & JsonApiWithLocaleOptions
): Promise<T> {
  options = {
    deserialize: true,
    params: {},
    ...options,
  }

  const apiPath = await getJsonApiPathForResourceType(
    type,
    options?.locale !== options?.defaultLocale ? options.locale : undefined
  )

  if (!apiPath) {
    throw new Error(`Error: resource of type ${type} not found.`)
  }

  const url = buildUrl(`${apiPath}/${uuid}`, {
    ...options?.params,
  })

  const response = await fetch(url.toString(), {
    headers: await buildHeaders(options),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const json = await response.json()

  return options.deserialize ? deserialize(json) : json
}