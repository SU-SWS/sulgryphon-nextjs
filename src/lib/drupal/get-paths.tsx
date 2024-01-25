import {AccessToken, JsonApiParams, JsonApiResourceWithPath} from "next-drupal";
import {getResourceCollection} from "@/lib/drupal/get-resource";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {PageProps} from "@/lib/drupal/drupal";
import {getPathFromContext} from "@/lib/drupal/utils";

export const getNodePaths = async (): Promise<string[]> => {
  const params = new DrupalJsonApiParams();
  // Add a simple include so that it doesn't fetch all the data right now. The full node data comes later, we only need
  // the node paths.
  params.addInclude(['node_type']);
  params.addPageLimit(50);

  const contentTypes = [
    'node--stanford_page',
    'node--stanford_event',
    'node--stanford_news',
    'node--stanford_person',
    'node--sul_library'
  ]

  let paths: PageProps[] = [];

  let fetchMore = true;
  let fetchedData: PageProps[] = []
  let page = 0;
  while (fetchMore) {
    params.addPageOffset(page * 50);

    // Use JSON API to fetch the list of all node paths on the site.
    fetchedData = await getPathsFromContext(contentTypes, {params: params.getQueryObject()})
    paths = [...paths, ...fetchedData];
    fetchMore = fetchedData.length > 0;
    page++;
  }
  return paths.map(pagePath => getPathFromContext(pagePath)).filter(path => !!path);
}

export const getPathsFromContext = async (
  types: string | string[],
  options: { params?: JsonApiParams,accessToken?: AccessToken } = {}
): Promise<PageProps[]> => {
  if (typeof types === "string") {
    types = [types]
  }


  const paths = await Promise.all(
    types.map(async (type) => {
      // Use sparse fieldset to expand max size.
      options.params = {[`fields[${type}]`]: "path", ...options?.params,}

      const resources = await getResourceCollection<JsonApiResourceWithPath>(type, {
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
    const slug = resource?.path?.alias === process.env.DRUPAL_FRONT_PAGE ? "/" : resource?.path?.alias
    return {params: {slug: `${slug?.replace(/^\/|\/$/g, "")}`.split("/")}}
  })
}
