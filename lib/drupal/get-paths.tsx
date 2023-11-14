import {GetStaticPathsContext, GetStaticPathsResult} from "next";
import {AccessToken, JsonApiParams, JsonApiResourceWithPath} from "next-drupal";
import {getResourceCollection} from "@/lib/drupal/get-resource";

export const getPathsFromContext = async (
  types: string | string[],
  context: GetStaticPathsContext,
  options: {
    params?: JsonApiParams
    accessToken?: AccessToken
  } = {}
): Promise<GetStaticPathsResult["paths"]> => {
  if (typeof types === "string") {
    types = [types]
  }


  const paths = await Promise.all(
    types.map(async (type) => {
      // Use sparse fieldset to expand max size.
      options.params = {
        [`fields[${type}]`]: "path",
        ...options?.params,
      }

      const resources = await getResourceCollection<JsonApiResourceWithPath[]>(type, {
        deserialize: true,
        ...options,
      })

      return buildPathsFromResources(resources)
    })
  )

  return paths.flat()
}

function buildPathsFromResources(resources: JsonApiResourceWithPath[]) {
  return resources?.flatMap((resource) => {
    const slug =
      resource?.path?.alias === process.env.DRUPAL_FRONT_PAGE
        ? "/"
        : resource?.path?.alias

    const path = {
      params: {
        slug: `${slug?.replace(/^\/|\/$/g, "")}`.split("/"),
      },
    }

    return path
  })
}
