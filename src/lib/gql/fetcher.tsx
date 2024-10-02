import {getSdk} from "@/lib/gql/__generated__/queries"
import {
  ConfigPagesQuery,
  ConfigPagesUnion,
  MenuAvailable,
  MenuItem,
  NodeUnion,
  RouteQuery,
  RouteRedirect,
  TermUnion,
} from "@/lib/gql/__generated__/drupal.d"
import {GraphQLClient} from "graphql-request"
import {cache} from "react"
import {buildHeaders} from "@/lib/drupal/utils"
import {unstable_cache as nextCache} from "next/cache"

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

export const getEntityFromPath = cache(
  async <T extends NodeUnion | TermUnion>(
    path: string,
    previewMode: boolean = false
  ): Promise<{
    entity?: T
    redirect?: RouteRedirect
    error?: string
  }> => {
    "use server"

    if (path.startsWith("/node/")) return {}

    let entity: T | undefined
    let query: RouteQuery

    try {
      query = await graphqlClient({next: {tags: [`paths:${path}`]}}, previewMode).Route({path})
    } catch (e) {
      console.error(e instanceof Error ? e.message : "An error occurred")
      return {entity: undefined, redirect: undefined, error: e instanceof Error ? e.message : "An error occurred"}
    }

    if (query.route?.__typename === "RouteRedirect") return {redirect: query.route, entity: undefined}
    entity = query.route?.__typename === "RouteInternal" && query.route.entity ? (query.route.entity as T) : undefined
    return {entity, redirect: undefined, error: undefined}
  }
)

export const getConfigPage = async <T extends ConfigPagesUnion>(
  configPageType: ConfigPagesUnion["__typename"]
): Promise<T | undefined> => {
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
    [configPageType || "all"],
    {tags: ["config-pages"]}
  )
  return getConfigPageInner()
}

export const getMenu = cache(async (name?: MenuAvailable): Promise<MenuItem[]> => {
  "use server"

  const getMenuInner = nextCache(
    async () => {
      const menu = await graphqlClient({cache: "no-cache"}).Menu({name})
      const menuItems = (menu.menu?.items || []) as MenuItem[]

      const filterInaccessible = (items: MenuItem[]): MenuItem[] => {
        items = items.filter(item => item.title !== "Inaccessible")
        items.map(item => (item.children = filterInaccessible(item.children)))
        return items
      }
      return filterInaccessible(menuItems)
    },
    [name || "main"],
    {tags: ["menus", `menu:${name?.toLowerCase() || "main"}`]}
  )
  return getMenuInner()
})

export const getAllNodePaths = cache(async () => {
  "use server"

  const nodeQuery = await graphqlClient({next: {tags: ["paths"]}}).Nodes()
  const nodePaths: string[] = []
  nodeQuery.nodeStanfordCourses.nodes.map(node => nodePaths.push(node.path))
  nodeQuery.nodeStanfordEventSeriesItems.nodes.map(node => nodePaths.push(node.path))
  nodeQuery.nodeStanfordEvents.nodes.map(node => nodePaths.push(node.path))
  nodeQuery.nodeStanfordNewsItems.nodes.map(node => nodePaths.push(node.path))
  nodeQuery.nodeStanfordPages.nodes.map(node => nodePaths.push(node.path))
  nodeQuery.nodeStanfordPeople.nodes.map(node => nodePaths.push(node.path))
  nodeQuery.nodeStanfordPolicies.nodes.map(node => nodePaths.push(node.path))
  nodeQuery.nodeSulLibraries.nodes.map(node => nodePaths.push(node.path))
  return nodePaths
})
