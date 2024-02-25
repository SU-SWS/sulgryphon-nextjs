import {
  ConfigPagesQuery,
  ConfigPagesUnion,
  getSdk,
  MenuAvailable,
  MenuItem,
  NodeUnion,
  RouteQuery,
  RouteRedirect,
  TermUnion
} from "@/lib/gql/__generated__/drupal";
import {GraphQLClient} from "graphql-request";
import type {RequestConfig} from "graphql-request/src/types";
import {cache} from "react";
import {cache as nodeCache} from "@/lib/drupal/get-cache";
import {buildHeaders} from "@/lib/drupal/utils";

export const graphqlClient = (requestConfig: RequestConfig = {}) => {
  const client = new GraphQLClient(
    process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + '/graphql',
    {
      ...requestConfig,
      // Use fetch function so Next.js will be able to cache it normally.
      fetch: async (input: URL | RequestInfo, init?: RequestInit) => fetch(input, init),
    }
  )
  return getSdk(client);
}

export const getEntityFromPath = cache(async <T extends NodeUnion | TermUnion, >(path: string, draftMode: boolean = false): Promise<{
  entity?: T,
  redirect?: RouteRedirect
  error?: string
}> => {
  const headers = await buildHeaders({draftMode})
  let entity: T | undefined;
  let query: RouteQuery;

  try {
    query = await graphqlClient({headers, next: {tags: [`paths:${path}`]}}).Route({path});
  } catch (e) {
    console.log(e instanceof Error ? e.message : 'An error occurred');
    return {entity: undefined, redirect: undefined, error: e instanceof Error ? e.message : 'An error occurred'}
  }

  if (query.route?.__typename === 'RouteRedirect') return {redirect: query.route, entity: undefined};
  entity = (query.route?.__typename === 'RouteInternal' && query.route.entity) ? query.route.entity as T : undefined
  return {entity, redirect: undefined, error: undefined};
})

export const getConfigPage = async <T extends ConfigPagesUnion, >(configPageType: ConfigPagesUnion['__typename']): Promise<T | undefined> => {
  let query: ConfigPagesQuery;
  try {
    query = await getConfigPagesData();
  } catch (e) {
    console.error('Unable to fetch config pages');
    return;
  }

  if (query.stanfordBasicSiteSettings.nodes[0]?.__typename === configPageType) return query.stanfordBasicSiteSettings.nodes[0] as T;
  if (query.stanfordGlobalMessages.nodes[0]?.__typename === configPageType) return query.stanfordGlobalMessages.nodes[0] as T;
  if (query.stanfordLocalFooters.nodes[0]?.__typename === configPageType) return query.stanfordLocalFooters.nodes[0] as T;
  if (query.stanfordSuperFooters.nodes[0]?.__typename === configPageType) return query.stanfordSuperFooters.nodes[0] as T;
  if (query.lockupSettings.nodes[0]?.__typename === configPageType) return query.lockupSettings.nodes[0] as T;
}

const getConfigPagesData = cache(async (): Promise<ConfigPagesQuery> => {
  // Config page data doesn't change if a user is in "Draft" mode or not, so the data can be cached for both situations.
  const cachedData = nodeCache.get<ConfigPagesQuery>('config-pages')
  if (cachedData) return cachedData;

  const headers = await buildHeaders()
  const query = await graphqlClient({headers, next: {tags: ['config-pages']}}).ConfigPages();

  nodeCache.set('config-pages', query);
  return query;
})

export const getMenu = cache(async (name?: MenuAvailable, draftMode?: boolean): Promise<MenuItem[]> => {
  const headers = await buildHeaders({draftMode});

  const menu = await graphqlClient({headers, next: {tags: ['menus', `menu:${name || "main"}`]}}).Menu({name});
  const menuItems = (menu.menu?.items || []) as MenuItem[];

  const filterInaccessible = (items: MenuItem[]): MenuItem[] => {
    items = items.filter(item => item.title !== 'Inaccessible');
    items.map(item => item.children = filterInaccessible(item.children));
    return items;
  }
  return filterInaccessible(menuItems)
})
