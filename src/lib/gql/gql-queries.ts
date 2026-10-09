import {
  ConfigPagesDocument,
  ConfigPagesQuery,
  ConfigPagesUnion,
  LibrariesDocument,
  LibrariesQuery,
  MenuAvailable,
  MenuDocument,
  MenuItem,
  MenuQuery,
  NewsTypesDocument,
  NewsTypesQuery,
  NodeDocument,
  NodeQuery,
  NodesDocument,
  NodesQuery,
  NodeSulLibrary,
  NodeUnion,
  RouteDocument,
  RouteQuery,
  RouteRedirect,
} from "@/lib/gql/__generated__/graphql"
import {ClientError, graphqlClient} from "@/lib/gql/gql-client"
import {cacheLife, cacheTag} from "next/cache"

/** Resolved result of a route lookup: an entity, a redirect, or neither when the lookup failed. */
type RouteResult<T extends NodeUnion> = {
  entity?: T
  redirect?: {url: RouteRedirect["url"]; permanent: boolean}
}

/**
 * Resolve a Drupal path to its entity or a redirect URL.
 *
 * @param path         Site-relative path (e.g. `/about/team`).
 * @param previewMode  When `true`, uses admin credentials so unpublished content is visible.
 * @param teaser       When `true`, Drupal returns a reduced field set suitable for list views.
 *
 * @returns `{ entity }` for real pages, `{ redirect }` for 3xx routes, or `{}` on error.
 */
export const getEntityFromPath = async <T extends NodeUnion>(
  path: string,
  previewMode?: boolean,
  teaser?: boolean
): Promise<RouteResult<T>> =>
  // Preview renders draft content, which changes on every editor save. Caching it would leave an
  // editor looking at a stale draft until Drupal happened to fire a revalidation for that path, so
  // preview requests go straight to Drupal and only published content is cached.
  previewMode ? requestEntityFromPath<T>(path, true, teaser) : getCachedEntityFromPath<T>(path, teaser)

const getCachedEntityFromPath = async <T extends NodeUnion>(
  path: string,
  teaser?: boolean
): Promise<RouteResult<T>> => {
  "use cache: remote"

  cacheTag("all-cache", "paths", `paths:${path}`)
  return requestEntityFromPath<T>(path, false, teaser)
}

const requestEntityFromPath = async <T extends NodeUnion>(
  path: string,
  previewMode: boolean,
  teaser?: boolean
): Promise<RouteResult<T>> => {
  let query: RouteQuery
  try {
    query = await graphqlClient(undefined, previewMode).request<RouteQuery>(RouteDocument, {
      path,
      teaser: !!teaser,
    })
  } catch (e) {
    if (e instanceof ClientError) {
      // The Drupal GraphQL module attaches a human-readable `debugMessage` alongside the
      // standard `message`. Deduplicate in case multiple errors carry the same text.
      const messages = e.response.errors?.map(error => error.debugMessage || error.message)
      console.warn([...new Set(messages)].join(" "))
    } else {
      console.warn(e instanceof Error ? e.message : "An error occurred")
    }
    return {}
  }

  if (query.route?.__typename === "RouteRedirect")
    return {redirect: {url: query.route.url, permanent: query.route.status === 301}}

  // RouteInternal carries the resolved Drupal entity; cast to the caller's expected node type.
  const entity: T | undefined =
    query.route?.__typename === "RouteInternal" && query.route.entity ? (query.route.entity as T) : undefined

  return {entity}
}

/**
 * Fetch a single node by its uuid.
 *
 * Tagged by uuid, and by the node's path once it is known, so a Drupal path revalidation also
 * clears this entry.
 */
export const getNodeByUuid = async <T extends NodeUnion>(uuid: string): Promise<T | undefined> => {
  "use cache: remote"

  cacheTag("all-cache", "nodes", `node:${uuid}`)
  try {
    const query = await graphqlClient().request<NodeQuery>(NodeDocument, {uuid})
    const node = query.node as T | undefined
    if (node?.path) cacheTag(`paths:${node.path}`)
    return node
  } catch (e) {
    console.warn(e instanceof Error ? e.message : "Unable to fetch node " + uuid)
  }
}

/**
 * Fetch every Drupal config-page bundle in a single request.
 *
 * This is the only cached step of the config-page chain, and it deliberately takes no
 * arguments: the `ConfigPages` query is argument-less, so keying a cache entry per bundle or
 * per field would issue the same request several times over and store near-duplicate copies of
 * the response. Callers select the bundle they want from the shared result instead.
 */
const getAllConfigPages = async (): Promise<ConfigPagesQuery | undefined> => {
  "use cache: remote"

  cacheTag("all-cache", "config-pages")
  try {
    return await graphqlClient().request<ConfigPagesQuery>(ConfigPagesDocument)
  } catch (e) {
    console.error("Unable to fetch config pages: " + (e instanceof Error && e.stack))
  }
}

/**
 * Fetch the first config-page node of the given Drupal bundle type.
 *
 * Config pages are singleton site-wide settings bundles (e.g. `StanfordBasicSiteSetting`).
 * All bundles are loaded in a single `ConfigPages` request; the caller specifies which bundle
 * to return by its `__typename`.
 *
 * @param configPageType  The `__typename` of the desired config-page bundle.
 * @returns The typed config-page node, or `undefined` if not found.
 */
export const getConfigPage = async <T extends ConfigPagesUnion>(
  configPageType: ConfigPagesUnion["__typename"]
): Promise<T | undefined> => {
  const query = await getAllConfigPages()
  if (!query) return

  // Each key of ConfigPagesQuery is a bundle connection (e.g. `stanfordBasicSiteSettings`).
  // Skip `__typename` and find the first bundle whose leading node matches the requested type.
  for (const queryKey of Object.keys(query) as (keyof ConfigPagesQuery)[]) {
    if (queryKey !== "__typename" && query[queryKey]?.nodes[0]?.__typename === configPageType) {
      return query[queryKey].nodes[0] as T
    }
  }
}

/**
 * Fetch a single field from a Drupal config-page bundle.
 *
 * Convenience wrapper around {@link getConfigPage} for callers that only need one field
 * rather than the full config-page object.
 *
 * @param configPageType  The `__typename` of the config-page bundle.
 * @param fieldName       The field to extract.
 */
export const getConfigPageField = async <T extends ConfigPagesUnion, F>(
  configPageType: ConfigPagesUnion["__typename"],
  fieldName: keyof T
): Promise<F | undefined> => {
  const configPage = await getConfigPage<T>(configPageType)
  return configPage?.[fieldName] as F
}

/**
 * Fetch a raw Drupal menu tree.
 *
 * Only the menu name is an argument, because that is all the query varies on. Cleanup happens in
 * {@link getMenu}.
 */
const fetchMenu = async (name?: MenuAvailable): Promise<MenuItem[]> => {
  "use cache: remote"

  cacheTag("all-cache", "menus", `menu:${name?.toLowerCase() ?? "main"}`)

  try {
    const menu = await graphqlClient().request<MenuQuery>(MenuDocument, {name})
    return (menu.menu?.items ?? []) as MenuItem[]
  } catch (_e) {
    console.error("Unable to fetch menu")
    return []
  }
}

/**
 * Fetch and clean a Drupal menu tree.
 *
 * Removes items whose title is `"Inaccessible"` (Drupal's placeholder for nodes the current
 * user cannot access).
 *
 * @param name  Drupal menu machine name (defaults to `MAIN` when omitted).
 */
export const getMenu = async (name?: MenuAvailable): Promise<MenuItem[]> => {
  const menuItems = await fetchMenu(name)

  // Rebuild the tree instead of mutating it in place: `menuItems` comes straight out of a cache
  // entry, and the in-memory tier can hand the same objects to every caller.
  const clean = (items: MenuItem[]): MenuItem[] =>
    items.filter(item => item.title !== "Inaccessible").map(item => ({...item, children: clean(item.children || [])}))

  return clean(menuItems)
}

/**
 * Fetch every published node across all content types for static-path generation and the sitemap.
 *
 * Drupal revalidates individual paths, never this list, so it expires weekly to pick up new and
 * removed nodes.
 *
 * @returns A flat array of all published `NodeUnion` nodes.
 */
export const getAllNodes = async (): Promise<NodeUnion[]> => {
  "use cache: remote"

  cacheLife("weeks")
  cacheTag("all-cache", "nodes")
  const nodeQuery = await graphqlClient().request<NodesQuery>(NodesDocument)
  const nodes: NodeUnion[] = []

  ;(Object.keys(nodeQuery) as (keyof NodesQuery)[]).forEach(queryKey => {
    if (queryKey === "__typename") return
    nodeQuery[queryKey].nodes.forEach(node => nodes.push(node as NodeUnion))
  })

  return nodes
}

/**
 * Fetch every library branch that has hours configured.
 */
export const getLibrariesWithHours = async (): Promise<NodeSulLibrary[]> => {
  "use cache: remote"

  cacheTag("all-cache", "nodes", "node:sul_library")
  try {
    const query = await graphqlClient().request<LibrariesQuery>(LibrariesDocument)
    return query.nodeSulLibraries.nodes.filter(node => !!node.suLibraryHours) as NodeSulLibrary[]
  } catch (e) {
    console.warn(e instanceof Error ? e.message : "Unable to fetch libraries")
    return []
  }
}

/**
 * Fetch the news topic terms as filter options.
 */
export const getNewsTypeOptions = async (): Promise<Array<{value: string; label: string}>> => {
  "use cache: remote"

  cacheTag("all-cache", "taxonomy", "taxonomy:stanford_news_topics")
  try {
    const query = await graphqlClient().request<NewsTypesQuery>(NewsTypesDocument)
    return query.termStanfordNewsTopics.nodes.map(term => ({value: term.uuid, label: term.name}))
  } catch (e) {
    console.warn(e instanceof Error ? e.message : "Unable to fetch news types")
    return []
  }
}

/**
 * Return the resolved path of the site's home page node.
 *
 * Drupal may assign a path alias to the front page (e.g. `/home`). This function resolves
 * it once so callers can match against the alias instead of `/`.
 */
export const getHomePagePath = async () => {
  const {entity} = await getEntityFromPath("/")
  return entity?.path
}
