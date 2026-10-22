import {
  Maybe,
  NodeStanfordEvent,
  NodeStanfordNews,
  NodeStanfordPage,
  NodeStanfordPerson,
  NodeUnion,
  SearchDocument,
  SearchFilterInput,
  SearchQuery,
  SearchQueryVariables,
  SortDirection,
  StanfordBasicPagesDocument,
  StanfordBasicPagesQuery,
  StanfordBasicPagesQueryVariables,
  StanfordBasicPagesSortKeys,
  StanfordNewsDocument,
  StanfordNewsQuery,
  StanfordNewsQueryVariables,
  StanfordPersonDocument,
  StanfordPersonQuery,
  StanfordPersonQueryVariables,
  StanfordSharedTagsDocument,
  StanfordSharedTagsQuery,
  StanfordSharedTagsQueryVariables,
  SulBranchLocationsDocument,
  SulBranchLocationsQuery,
  SulEventsDocument,
  SulEventsQuery,
  SulEventsQueryVariables,
  SulEventsSharedTagsDocument,
  SulEventsSharedTagsQuery,
  SulEventsSharedTagsQueryVariables,
  SulStudyPlacesDocument,
  SulStudyPlacesQuery,
} from "@/lib/gql/__generated__/graphql"
import {describeError, graphqlClient} from "@/lib/gql/gql-client"
import {cacheLife, cacheTag} from "next/cache"

export const VIEW_PAGE_SIZE = 21

export type ViewFilter = Maybe<Record<string, string | number | Array<string | number>>>

/** Every view display this site queries. Anything else is rejected before it reaches Drupal or the cache. */
const SUPPORTED_DISPLAYS = new Set([
  "sul_study_places--study_places",
  "sul_study_places--study_places_table",
  "sul_branch_locations--branch_locations_table",
  "sul_events--shared_tags_cards",
  "sul_events--shared_tags_cards_desc",
  "sul_events--cards_desc",
  "sul_events--cards",
  "sul_events--list_page",
  "sul_events--filtered_list",
  "sul_events--past_events_list_block",
  "sul_news--filtering_cards",
  "sul_news--block_1",
  "sul_news--vertical_cards",
  "search--search",
  "stanford_basic_pages--card_grid_alpha",
  "stanford_basic_pages--basic_page_type_list",
  "stanford_basic_pages--viewfield_block_1",
  "sul_people--randomized_card_grid",
  "sul_people--table_list_all",
  "stanford_person--grid_list_all",
  "stanford_shared_tags--card_grid",
])

/** Filter keys the site's list views send. Free-text ones are what a visitor types. */
const FREE_TEXT_FILTERS = ["key", "title", "search"]
const OPTION_FILTERS = ["type", "eventType", "date"]
const MAX_PAGE = 100
const MAX_VALUE_LENGTH = 100
const MAX_CONTEXTUAL_FILTERS = 4

const hasFreeText = (filter?: ViewFilter) =>
  FREE_TEXT_FILTERS.some(key => typeof filter?.[key] === "string" && (filter[key] as string).length > 0)

/**
 * Validate a view request that came from the browser.
 *
 * The "load more" server action is a public endpoint, and every distinct set of arguments is a Drupal
 * query and a cache entry. Only displays the site uses are allowed, numbers are clamped, and filters are
 * limited to known keys with short string values. Free text is trimmed and lowercased so equivalent
 * searches share a cache entry.
 *
 * @returns The arguments to pass to {@link getViewPagedItems}, or `undefined` to reject the request.
 */
export const sanitizeViewRequest = (
  viewId: unknown,
  displayId: unknown,
  contextualFilter: unknown,
  pageSize: unknown,
  page: unknown,
  filter: unknown
): Parameters<typeof getViewPagedItems> | undefined => {
  if (typeof viewId !== "string" || typeof displayId !== "string") return
  if (!SUPPORTED_DISPLAYS.has(`${viewId}--${displayId}`)) return

  const toInt = (value: unknown, min: number, max: number, fallback: number) =>
    typeof value === "number" && Number.isFinite(value) ? Math.min(Math.max(Math.trunc(value), min), max) : fallback

  const cleanString = (value: unknown) =>
    typeof value === "string" ? value.trim().slice(0, MAX_VALUE_LENGTH) : undefined

  const contextual = Array.isArray(contextualFilter)
    ? contextualFilter
        .slice(0, MAX_CONTEXTUAL_FILTERS)
        .map(cleanString)
        .filter((value): value is string => value !== undefined)
    : undefined

  let cleanFilter: Record<string, string> | undefined
  if (filter && typeof filter === "object") {
    cleanFilter = {}
    for (const key of [...FREE_TEXT_FILTERS, ...OPTION_FILTERS]) {
      let value = cleanString((filter as Record<string, unknown>)[key])
      if (value && FREE_TEXT_FILTERS.includes(key)) value = value.toLowerCase()
      if (value) cleanFilter[key] = value
    }
  }

  return [
    viewId,
    displayId,
    contextual,
    toInt(pageSize, 1, VIEW_PAGE_SIZE, VIEW_PAGE_SIZE),
    toInt(page, 0, MAX_PAGE, 0),
    cleanFilter,
  ]
}

export const getViewPagedItems = async (
  viewId: string,
  displayId: string,
  contextualFilter?: Maybe<string[]>,
  pageSize?: Maybe<number>,
  page?: Maybe<number>,
  filter?: ViewFilter
): Promise<{items: NodeUnion[]; totalItems: number}> => {
  "use cache: remote"

  let items: NodeUnion[] = []
  let totalItems = 0
  // View filters allow multiples of 3 for page sizes. If the user wants 4, we'll fetch 6 and then slice it at the end.
  const itemsPerPage = pageSize ? Math.min(Math.ceil(pageSize / 3) * 3, 99) : undefined
  const queryVariables: StanfordBasicPagesQueryVariables = {pageSize: itemsPerPage, page}

  const viewTags: Record<string, string> = {
    search: "views:all",
    stanford_shared_tags: "views:all",
    stanford_basic_pages: "views:stanford_page",
    stanford_courses: "views:stanford_course",
    stanford_events: "views:stanford_event",
    stanford_news: "views:stanford_news",
    stanford_person: "views:stanford_person",
    stanford_publications: "views:stanford_publication",
    sul_study_places: "views:sul_study_place",
    sul_branch_locations: "views:sul_branch_location",
    sul_news: "views:stanford_news",
    sul_people: "views:stanford_person",
    sul_events: "views:stanford_event",
  }
  cacheTag("all-cache", "views", viewTags[viewId] || "views:all")

  const client = graphqlClient()
  let contextualFilters = getContextualFilters(["term_node_taxonomy_name_depth"], contextualFilter)
  let graphqlResponse

  const sortDir = displayId.includes("desc") ? SortDirection.Desc : SortDirection.Asc

  try {
    switch (`${viewId}--${displayId}`) {
      case "sul_study_places--study_places":
      case "sul_study_places--study_places_table":
        graphqlResponse = await client.request<SulStudyPlacesQuery>(SulStudyPlacesDocument)
        items = graphqlResponse.sulStudyPlaces?.results as unknown as NodeUnion[]
        totalItems = graphqlResponse.sulStudyPlaces?.pageInfo.total || 0
        break

      case "sul_branch_locations--branch_locations_table":
        graphqlResponse = await client.request<SulBranchLocationsQuery>(SulBranchLocationsDocument)
        items = graphqlResponse.sulBranchLocations?.results as unknown as NodeUnion[]
        totalItems = graphqlResponse.sulBranchLocations?.pageInfo.total || 0
        break

      case "sul_events--shared_tags_cards":
      case "sul_events--shared_tags_cards_desc":
        contextualFilters = getContextualFilters(["term_node_taxonomy_name_depth"], contextualFilter)
        graphqlResponse = await client.request<SulEventsSharedTagsQuery, SulEventsSharedTagsQueryVariables>(
          SulEventsSharedTagsDocument,
          {contextualFilters, sortDir, ...queryVariables}
        )
        items = graphqlResponse.sulEventsSharedTags?.results as unknown as NodeUnion[]
        break

      case "sul_events--cards_desc":
      case "sul_events--cards":
      case "sul_events--list_page":
      case "sul_events--filtered_list":
        contextualFilters = getContextualFilters(
          [
            "term_node_taxonomy_name_depth",
            "term_node_taxonomy_name_depth_1",
            "term_node_taxonomy_name_depth_2",
            "term_node_taxonomy_name_depth_3",
          ],
          contextualFilter
        )
        graphqlResponse = await client.request<SulEventsQuery, SulEventsQueryVariables>(SulEventsDocument, {
          contextualFilters,
          filter: {
            ...filter,
          },
          sortDir,
          ...queryVariables,
        })
        items = graphqlResponse.sulEvents?.results as unknown as NodeStanfordEvent[]
        totalItems = graphqlResponse.sulEvents?.pageInfo.total || 0
        break

      case "sul_events--past_events_list_block":
        graphqlResponse = await client.request<SulEventsQuery, SulEventsQueryVariables>(SulEventsDocument, {
          contextualFilters,
          ...queryVariables,
        })
        items = graphqlResponse.sulEvents?.results as unknown as NodeStanfordEvent[]
        totalItems = graphqlResponse.sulEvents?.pageInfo.total || 0
        break

      case "sul_news--filtering_cards":
      case "sul_news--block_1":
      case "sul_news--vertical_cards":
        graphqlResponse = await client.request<StanfordNewsQuery, StanfordNewsQueryVariables>(StanfordNewsDocument, {
          contextualFilters,
          filter,
          ...queryVariables,
        })
        items = graphqlResponse.stanfordNews?.results as unknown as NodeStanfordNews[]
        totalItems = graphqlResponse.stanfordNews?.pageInfo.total || 0
        break

      case "search--search":
        graphqlResponse = await client.request<SearchQuery, SearchQueryVariables>(SearchDocument, {
          filter: filter as SearchFilterInput,
          ...queryVariables,
        })
        items = graphqlResponse.search?.results as unknown as NodeUnion[]
        totalItems = graphqlResponse.search?.pageInfo.total || 0
        break

      case "stanford_basic_pages--card_grid_alpha":
        queryVariables.sortKey = StanfordBasicPagesSortKeys["Title"]

      case "stanford_basic_pages--basic_page_type_list":
      case "stanford_basic_pages--viewfield_block_1":
        contextualFilters = getContextualFilters(["term_node_taxonomy_name_depth"], contextualFilter)
        graphqlResponse = await client.request<StanfordBasicPagesQuery, StanfordBasicPagesQueryVariables>(
          StanfordBasicPagesDocument,
          {
            contextualFilters,
            ...queryVariables,
          }
        )
        items = graphqlResponse.stanfordBasicPages?.results as unknown as NodeStanfordPage[]
        totalItems = graphqlResponse.stanfordBasicPages?.pageInfo.total || 0
        break

      // case "stanford_courses--default_list_viewfield_block":
      // case "stanford_courses--vertical_teaser_viewfield_block":
      //   graphqlResponse = await client.stanfordCourses({
      //     contextualFilters,
      //     ...queryVariables,
      //   })
      //   items = graphqlResponse.stanfordCourses?.results as unknown as NodeStanfordCourse[]
      //   totalItems = graphqlResponse.stanfordCourses?.pageInfo.total || 0
      //   break
      //
      // case "stanford_events--cards":
      // case "stanford_events--list_page":
      //   contextualFilters = getContextualFilters(
      //     [
      //       "term_node_taxonomy_name_depth",
      //       "term_node_taxonomy_name_depth_1",
      //       "term_node_taxonomy_name_depth_2",
      //       "term_node_taxonomy_name_depth_3",
      //     ],
      //     contextualFilter
      //   )
      //   graphqlResponse = await client.stanfordEvents({
      //     contextualFilters,
      //     ...queryVariables,
      //   })
      //   items = graphqlResponse.stanfordEvents?.results as unknown as NodeStanfordEvent[]
      //   totalItems = graphqlResponse.stanfordEvents?.pageInfo.total || 0
      //   break
      //
      // case "stanford_events--past_events_list_block":
      //   graphqlResponse = await client.stanfordEventsPastEvents({
      //     contextualFilters,
      //     ...queryVariables,
      //   })
      //   items = graphqlResponse.stanfordEventsPastEvents?.results as unknown as NodeStanfordEvent[]
      //   totalItems = graphqlResponse.stanfordEventsPastEvents?.pageInfo.total || 0
      //   break
      //
      // case "stanford_news--block_1":
      // case "stanford_news--vertical_cards":
      //   graphqlResponse = await client.request<StanfordNewsQuery, StanfordNewsQueryVariables>(StanfordNewsDocument, {
      //     contextualFilters,
      //     ...queryVariables,
      //   })
      //   items = graphqlResponse.stanfordNews?.results as unknown as NodeStanfordNews[]
      //   totalItems = graphqlResponse.stanfordNews?.pageInfo.total || 0
      //   break

      case "sul_people--randomized_card_grid":
      case "sul_people--table_list_all":
        queryVariables.pageSize = 999
      case "stanford_person--grid_list_all":
        graphqlResponse = await client.request<StanfordPersonQuery, StanfordPersonQueryVariables>(
          StanfordPersonDocument,
          {
            contextualFilters,
            ...queryVariables,
          }
        )
        items = graphqlResponse.stanfordPerson?.results as unknown as NodeStanfordPerson[]
        totalItems = graphqlResponse.stanfordPerson?.pageInfo.total || 0
        break

      // case "stanford_publications--apa_list":
      // case "stanford_publications--chicago_list":
      //   graphqlResponse = await client.stanfordPublications({
      //     contextualFilters,
      //     ...queryVariables,
      //   })
      //   items = graphqlResponse.stanfordPublications?.results as unknown as NodeStanfordPublication[]
      //   totalItems = graphqlResponse.stanfordPublications?.pageInfo.total || 0
      //   break

      case "stanford_shared_tags--card_grid":
        contextualFilters = getContextualFilters(["term_node_taxonomy_name_depth", "type"], contextualFilter)
        graphqlResponse = await client.request<StanfordSharedTagsQuery, StanfordSharedTagsQueryVariables>(
          StanfordSharedTagsDocument,
          {
            contextualFilters,
            ...queryVariables,
          }
        )
        items = graphqlResponse.stanfordSharedTags?.results as unknown as NodeUnion[]
        totalItems = graphqlResponse.stanfordSharedTags?.pageInfo.total || 0
        break

      default:
        console.warn(`Unable to find query for view: ${viewId} display: ${displayId}`)
        break
    }
  } catch (e) {
    // Not a real result, so keep it briefly: pages showing the empty list try Drupal again soon.
    console.warn(`Unable to fetch view ${viewId}--${displayId}: ${describeError(e)}`)
    cacheLife("minutes")
    return {items: [], totalItems: 0}
  }

  // A typed search is effectively unbounded: keep its results for hours rather than forever.
  if (hasFreeText(filter)) cacheLife("hours")
  return {items, totalItems}
}

const getContextualFilters = (
  keys: string[],
  values?: Maybe<string[]>,
  defaults: Record<string, string | undefined> = {}
) => {
  if (!keys || !values) return
  const filters: Record<string, string | undefined> = keys.reduce(
    (obj, key, index) => ({
      ...obj,
      [key]: values[index]?.trim(),
    }),
    {}
  )
  Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key])
  return {...defaults, ...filters}
}
