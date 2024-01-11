import {AccessToken, JsonApiResource, JsonApiWithLocaleOptions} from "next-drupal";
import {stringify} from "qs"
import {buildUrl, buildHeaders, getJsonApiPathForResourceType, getPathFromContext} from "./utils";
import {deserialize} from "@/lib/drupal/deserialize";
import {JsonApiParams} from "next-drupal";
import {PageProps} from "@/lib/drupal/drupal";

export const getResources = async <T, >(
  items: { type: string, id: string }[],
  draftMode: boolean = false
): Promise<T[]> => {
  const requests: PromiseLike<any>[] = [];
  items.map(item => requests.push(getResource(item.type, item.id, {draftMode})));

  // @ts-ignore
  return Promise.all(requests.map((p, i): T => p.catch((e: unknown) => {
    console.error(`Failed Fetching (probably unpublished) component ${items[i].type}-${items[i].id}`, e);
    return null
  })));
}

export const getResourceFromContext = async <T extends JsonApiResource>(
  type: string,
  context: PageProps,
  options?: {
    prefix?: string
    deserialize?: boolean
    params?: JsonApiParams
    accessToken?: AccessToken
    isVersionable?: boolean
    draftMode?: boolean
    next?: NextFetchRequestConfig
  }
): Promise<T | undefined> => {
  options = {
    deserialize: true,
    draftMode: false,
    // Add support for revisions for node by default.
    // TODO: Make this required before stable?
    isVersionable: /^node--/.test(type),
    ...options,
  }

  const path = getPathFromContext(context, options?.prefix)

  const resource = await getResourceByPath<T>(path, {
    deserialize: options.deserialize,
    isVersionable: options.isVersionable,
    params: {...options?.params},
    draftMode: options.draftMode,
    next: options.next
  })

  return resource
}

export const getResourceByPath = async <T extends JsonApiResource>(
  path: string,
  options?: {
    accessToken?: AccessToken
    deserialize?: boolean
    isVersionable?: boolean
    draftMode?: boolean
    next?: NextFetchRequestConfig
  } & JsonApiWithLocaleOptions,
): Promise<T | undefined> => {
  options = {deserialize: true, isVersionable: false, params: {}, draftMode: false, ...options}

  if (!path) return

  const resourceParams = stringify(options.params)

  const payload = [
    {
      requestId: "router",
      action: "view",
      uri: `/router/translate-path?path=${path}&_format=json`,
      headers: {Accept: "application/vnd.api+json"},
    },
    {
      requestId: "resolvedResource",
      action: "view",
      uri: `{{router.body@$.jsonapi.individual}}?${resourceParams.toString()}`,
      waitFor: ["router"],
    },
  ]

  const url = buildUrl("/subrequests", {_format: "json"})
  console.log('subrequest path', JSON.stringify(path));

  let response = await fetch(url.toString(), {
    next: options.next,
    method: "POST",
    headers: await buildHeaders(options),
    redirect: "follow",
    body: JSON.stringify(payload),
  })

  if (!response.ok) {

    if (options.draftMode) {
      console.error('Unable to fetch resource while in draft mode. Try without draft mode.')
      delete options.draftMode;
      response = await fetch(url.toString(), {
        next: options.next,
        method: "POST",
        headers: await buildHeaders(options),
        redirect: "follow",
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error(response.statusText)
    } else {
      throw new Error(response.statusText)
    }
  }
  const json = await response.json()

  if (!json["resolvedResource#uri{0}"]) return

  const data = JSON.parse(json["resolvedResource#uri{0}"]?.body)

  if (data.errors) throw new Error(data.errors[0].detail)

  return options.deserialize ? deserialize(data) : data
}

export const getResourceCollection = async <T extends JsonApiResource>(
  type: string,
  options?: {
    deserialize?: boolean,
    accessToken?: AccessToken,
    draftMode?: boolean,
    next?: NextFetchRequestConfig
  } & JsonApiWithLocaleOptions,
): Promise<T[]> => {
  options = {deserialize: true, draftMode: false, ...options}

  const apiPath = await getJsonApiPathForResourceType(type)

  if (!apiPath) throw new Error(`Error: resource of type ${type} not found.`)

  const url = buildUrl(apiPath, {...options?.params})

  const response = await fetch(url.toString(), {next: options.next, headers: await buildHeaders(options)})

  if (!response.ok) throw new Error(response.statusText)

  const json = await response.json()

  return options.deserialize ? deserialize(json) : json
}

export const getResource = async <T extends JsonApiResource>(
  type: string,
  uuid: string,
  options?: { accessToken?: AccessToken, deserialize?: boolean, draftMode?: boolean } & JsonApiWithLocaleOptions,
): Promise<T> => {
  options = {deserialize: true, params: {}, draftMode: false, ...options}

  const apiPath = await getJsonApiPathForResourceType(type)

  if (!apiPath) {
    throw new Error(`Error: resource of type ${type} not found.`)
  }

  const url = buildUrl(`${apiPath}/${uuid}`, {...options?.params})

  const response = await fetch(url.toString(), {headers: await buildHeaders(options)})

  if (!response.ok) throw new Error(response.statusText)

  const json = await response.json()
  return options.deserialize ? deserialize(json) : json
}

export const getConfigPageResource = async <T extends JsonApiResource>(
  name: string,
  options?: {
    deserialize?: boolean,
    accessToken?: AccessToken,
    next?: NextFetchRequestConfig
  } & JsonApiWithLocaleOptions
): Promise<T | undefined> => {

  let response;
  try {
    response = await getResourceCollection<T>(`config_pages--${name}`, options);
    if (response.length === 0) return;
  } catch (e) {
    return;
  }

  return response.at(0);
}