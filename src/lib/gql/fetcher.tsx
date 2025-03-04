import {getSdk} from "@/lib/gql/__generated__/queries"
import {
  ConfigPagesQuery,
  ConfigPagesUnion,
  MenuAvailable,
  MenuItem,
  NodeInterface,
  NodeUnion,
  RouteQuery,
  RouteRedirect,
} from "@/lib/gql/__generated__/drupal.d"
import {GraphQLClient} from "graphql-request"
import {cache} from "react"
import {buildHeaders} from "@/lib/drupal/utils"
import {unstable_cache as nextCache} from "next/cache"
import {ClientError} from "graphql-request"
import {GraphQLError} from "graphql/error"

const githubBranch = process.env.VERCEL_GIT_COMMIT_REF || "local"

export const graphqlClient = (requestConfig: Omit<RequestInit, "method"> = {}, isPreviewMode?: boolean) => {
  requestConfig.headers = buildHeaders(requestConfig.headers as HeadersInit, isPreviewMode)

  const client = new GraphQLClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + "/graphql", {
    ...requestConfig,
    next: requestConfig.cache ? {...requestConfig.next} : {revalidate: 60 * 60 * 24 * 365, ...requestConfig.next},
    // Use fetch function so Next.js will be able to cache it normally.
    fetch: async (input: URL | RequestInfo, init?: RequestInit) => fetch(input, init),
  })
  return getSdk(client)
}

type DrupalGraphqlError = GraphQLError & {debugMessage: string}

export const getEntityFromPath = async <T extends NodeUnion>(
  path: string,
  previewMode?: boolean,
  teaser?: boolean
): Promise<{
  entity?: T
  redirect?: RouteRedirect["url"]
}> => {
  const getData = nextCache(
    async () => {
      // Paths that start with /node/ should not be used.
      if (path.startsWith("/node/")) return {}

      let query: RouteQuery

      try {
        query = await graphqlClient(undefined, previewMode).Route({
          path,
          teaser: !!teaser,
        })
      } catch (e) {
        if (e instanceof ClientError) {
          // @ts-expect-error Client error type doesn't define the debugMessage, but it's there.
          const messages = e.response.errors?.map((error: DrupalGraphqlError) => error.debugMessage || error.message)
          console.warn([...new Set(messages)].join(" "))
        } else {
          console.warn(e instanceof Error ? e.message : "An error occurred")
        }
        return {}
      }

      if (query.route?.__typename === "RouteRedirect") return {redirect: query.route.url}
      const entity: T | undefined =
        query.route?.__typename === "RouteInternal" && query.route.entity ? (query.route.entity as T) : undefined
      return {entity}
    },
    [githubBranch, path, previewMode ? "preview" : "anonymous", teaser ? "teaser" : "full"],
    {tags: ["all-entities", `paths:${path}`]}
  )

  return getData()
}

export const getConfigPage = cache(
  async <T extends ConfigPagesUnion>(configPageType: ConfigPagesUnion["__typename"]): Promise<T | undefined> => {
    "use server"

    const getConfigPageInner = nextCache(
      async () => {
        let query: ConfigPagesQuery
        try {
          query = await graphqlClient({next: {tags: ["config-pages"]}}).ConfigPages()
        } catch (e) {
          console.error("Unable to fetch config pages", e instanceof Error ? e.message : undefined)
          return
        }

        if (query.stanfordBasicSiteSettings.nodes[0]?.__typename === configPageType)
          return query.stanfordBasicSiteSettings.nodes[0] as T
        if (query.stanfordGlobalMessages.nodes[0]?.__typename === configPageType)
          return query.stanfordGlobalMessages.nodes[0] as T
        if (query.stanfordLocalFooters.nodes[0]?.__typename === configPageType)
          return query.stanfordLocalFooters.nodes[0] as T
        if (query.stanfordSuperFooters.nodes[0]?.__typename === configPageType)
          return query.stanfordSuperFooters.nodes[0] as T
        if (query.lockupSettings.nodes[0]?.__typename === configPageType) return query.lockupSettings.nodes[0] as T
      },
      [githubBranch, configPageType || "all"],
      {tags: ["config-pages"]}
    )
    return getConfigPageInner()
  }
)

export const getConfigPageField = async <T extends ConfigPagesUnion, F>(
  configPageType: ConfigPagesUnion["__typename"],
  fieldName: keyof T
): Promise<F | undefined> => {
  const getData = nextCache(
    async () => {
      const configPage = await getConfigPage<T>(configPageType)
      return configPage?.[fieldName] as F
    },
    [githubBranch, fieldName.toString()],
    {tags: ["config-pages"]}
  )
  return getData()
}

export const getMenu = cache(async (name?: MenuAvailable): Promise<MenuItem[]> => {
  "use server"

  const getMenuInner = nextCache(
    async () => {
      const menu = await graphqlClient().Menu({name})
      const menuItems = (menu.menu?.items || []) as MenuItem[]

      const filterInaccessible = (items: MenuItem[]): MenuItem[] => {
        items = items.filter(item => item.title !== "Inaccessible")
        items.map(item => (item.children = filterInaccessible(item.children)))
        return items
      }
      return filterInaccessible(menuItems)
    },
    [githubBranch, name || "main"],
    {tags: ["menus", `menu:${name?.toLowerCase() || "main"}`]}
  )
  return getMenuInner()
})

export const getAllNodePaths = cache(async (): Promise<Array<string>> => {
  "use server"

  const nodeQuery = await graphqlClient({next: {tags: ["paths"]}}).Nodes()
  const nodePaths: Array<NodeInterface["path"]> = []
  nodeQuery.nodeStanfordPages.nodes.map(node => nodePaths.push(node.path))
  nodeQuery.nodeSulLibraries.nodes.map(node => nodePaths.push(node.path))
  nodeQuery.nodeStanfordNewsItems.nodes.map(node => nodePaths.push(node.path))
  nodeQuery.nodeStanfordEvents.nodes.map(node => nodePaths.push(node.path))
  nodeQuery.nodeStanfordCourses.nodes.map(node => nodePaths.push(node.path))
  nodeQuery.nodeStanfordEventSeriesItems.nodes.map(node => nodePaths.push(node.path))
  nodeQuery.nodeStanfordPeople.nodes.map(node => nodePaths.push(node.path))
  nodeQuery.nodeStanfordPolicies.nodes.map(node => nodePaths.push(node.path))
  return nodePaths.filter(path => !!path) as Array<string>
})
