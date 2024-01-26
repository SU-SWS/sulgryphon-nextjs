import {AccessToken, JsonApiResource, JsonApiWithLocaleOptions} from "next-drupal";
import {buildUrl, buildHeaders, getJsonApiPathForResourceType} from "./utils";
import {deserialize} from "@/lib/drupal/deserialize";
import {cache} from "react";

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

export const getConfigPageResource = cache(async <T extends JsonApiResource>(
  name: string,
  options?: {
    deserialize?: boolean,
    accessToken?: AccessToken,
    next?: NextFetchRequestConfig
  } & JsonApiWithLocaleOptions
): Promise<T | undefined> => {
  options = {next: {tags:[`config-pages:${name}`]}, ...options}

  let response;
  try {
    response = await getResourceCollection<T>(`config_pages--${name}`, options);
    if (response.length === 0) return;
  } catch (e) {
    return;
  }

  return response.at(0);
})