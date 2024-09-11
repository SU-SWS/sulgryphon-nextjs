import formatHtml from "@/lib/format-html"
import {DrupalLinkButton} from "@/components/patterns/link"
import {cache, HTMLAttributes, JSX} from "react"
import {
  Maybe,
  NodeUnion,
  NodeStanfordPublication,
  NodeStanfordPerson,
  NodeStanfordNews,
  NodeStanfordEvent,
  NodeStanfordCourse,
  NodeStanfordPage,
  StanfordBasicPagesSortKeys,
  StanfordBasicPagesQueryVariables,
  ParagraphStanfordList,
} from "@/lib/gql/__generated__/drupal.d"
import {graphqlClient} from "@/lib/gql/fetcher"
import View from "@/components/views/view"
import {twMerge} from "tailwind-merge"
import {getParagraphBehaviors} from "@/components/paragraph/index"
import {ElementType} from "react"

type Props = HTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordList
}

const ListParagraph = async ({paragraph}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)
  const viewId = paragraph.suListView?.view || ""
  const displayId = paragraph.suListView?.display || ""
  const {items: viewItems, totalItems} =
    viewId && displayId
      ? await getViewItems(viewId, displayId, paragraph.suListView?.contextualFilter, 0, paragraph.suListView?.pageSize)
      : {items: [], totalItems: 0}
  const addLoadMore = (paragraph.suListView?.pageSize || 3) > 30

  if (behaviors.list_paragraph?.hide_empty && viewItems.length === 0) return null

  const ListWrapper: ElementType =
    paragraph.suListHeadline && behaviors.list_paragraph?.heading_behavior !== "remove" ? "section" : "div"
  const headingBehavior = behaviors.list_paragraph?.heading_behavior

  return (
    <ListWrapper
      className="centered flex flex-col gap-xl"
      aria-labelledby={ListWrapper === "section" ? paragraph.id : undefined}
    >
      <div className="mb-20 flex items-center justify-between">
        {paragraph.suListHeadline && headingBehavior !== "remove" && (
          <h2 id={paragraph.id} className={twMerge("m-0", headingBehavior === "hide" && "sr-only")}>
            {paragraph.suListHeadline}
          </h2>
        )}

        {paragraph.suListButton?.url && (
          <DrupalLinkButton href={paragraph.suListButton.url} {...paragraph.suListButton.attributes}>
            {paragraph.suListButton.title}
          </DrupalLinkButton>
        )}
      </div>

      {paragraph.suListDescription?.processed && <div>{formatHtml(paragraph.suListDescription.processed)}</div>}
      {viewItems && viewId && displayId && (
        <View
          items={viewItems}
          viewId={viewId}
          displayId={displayId}
          hasHeading={!!paragraph.suListHeadline}
          loadPage={
            addLoadMore
              ? loadPage.bind(
                  null,
                  viewId,
                  displayId,
                  paragraph.suListView?.contextualFilter || [],
                  !!paragraph.suListHeadline
                )
              : undefined
          }
          totalItems={addLoadMore ? totalItems : viewItems.length}
        />
      )}
    </ListWrapper>
  )
}

const loadPage = async (
  viewId: string,
  displayId: string,
  contextualFilter: string[],
  hasHeadline: boolean,
  page: number
): Promise<JSX.Element> => {
  "use server"

  const {items, totalItems} = await getViewItems(viewId, displayId, contextualFilter, page)
  return <View viewId={viewId} displayId={displayId} items={items} hasHeading={hasHeadline} totalItems={totalItems} />
}

const getViewItems = cache(
  async (
    viewId: string,
    displayId: string,
    contextualFilter?: Maybe<string[]>,
    page: Maybe<number> = 0,
    limit?: Maybe<number>
  ): Promise<{items: NodeUnion[]; totalItems: number}> => {
    if (viewId === "sul_people" && displayId === "table_list_all") limit = 0
    const {items, totalItems} = await getViewPagedItems(viewId, displayId, contextualFilter, 30, page)
    if (limit) {
      return {items: items.slice(0, limit), totalItems}
    }
    return {items, totalItems}
  }
)

const getViewPagedItems = cache(
  async (
    viewId: string,
    displayId: string,
    contextualFilter?: Maybe<string[]>,
    pageSize?: Maybe<number>,
    page?: Maybe<number>,
    offset?: Maybe<number>
  ): Promise<{items: NodeUnion[]; totalItems: number}> => {
    let items: NodeUnion[] = []
    let totalItems = 0
    // View filters allow multiples of 3 for page sizes. If the user wants 4, we"ll fetch 6 and then slice it at the end.
    const itemsPerPage = pageSize ? Math.min(Math.ceil(pageSize / 3) * 3, 99) : undefined
    const queryVariables: StanfordBasicPagesQueryVariables = {pageSize: itemsPerPage, page, offset}

    const tags = ["views"]
    switch (`${viewId}--${displayId}`) {
      case "sul_shared_tag_events--card_grid":
        tags.push("views:stanford_event")
        break

      case "sul_study_places--study_places":
      case "sul_study_places--study_places_table":
        tags.push("views:sul_study_place")
        break

      case "sul_branch_locations--branch_locations_table":
        tags.push("views:sul_branch_location")
        break

      case "stanford_shared_tags--card_grid":
        tags.push("views:all")
        break

      case "stanford_basic_pages--basic_page_type_list":
      case "stanford_basic_pages--viewfield_block_1":
      case "stanford_basic_pages--card_grid_alpha":
        tags.push("views:stanford_page")
        break

      case "stanford_courses--default_list_viewfield_block":
      case "stanford_courses--vertical_teaser_viewfield_block":
        tags.push("views:stanford_course")
        break

      case "stanford_events--cards":
      case "stanford_events--list_page":
      case "stanford_events--past_events_list_block":
        tags.push("views:stanford_event")
        break

      case "stanford_news--block_1":
      case "stanford_news--vertical_cards":
        tags.push("views:stanford_news")
        break

      case "stanford_person--grid_list_all":
      case "sul_people--table_list_all":
        tags.push("views:stanford_person")
        break

      case "stanford_publications--apa_list":
      case "stanford_publications--chicago_list":
        tags.push("views:stanford_publication")
        break
    }

    const client = graphqlClient({next: {tags}})
    let contextualFilters = getContextualFilters(["term_node_taxonomy_name_depth"], contextualFilter)
    let graphqlResponse

    try {
      switch (`${viewId}--${displayId}`) {
        case "sul_shared_tag_events--card_grid":
          contextualFilters = getContextualFilters(["term_node_taxonomy_name_depth"], contextualFilter)
          graphqlResponse = await client.sulSharedTagEventsCardGridGraphql({contextualFilters, ...queryVariables})
          items = graphqlResponse.sulSharedTagEventsCardGridGraphql?.results as unknown as NodeUnion[]
          break

        case "sul_study_places--study_places":
        case "sul_study_places--study_places_table":
          graphqlResponse = await client.sulStudyPlaces()
          items = graphqlResponse.sulStudyPlaces?.results as unknown as NodeUnion[]
          break

        case "sul_branch_locations--branch_locations_table":
          graphqlResponse = await client.sulBranchLocations()
          items = graphqlResponse.sulBranchLocations?.results as unknown as NodeUnion[]
          break

        case "stanford_basic_pages--card_grid_alpha":
          queryVariables.sortKey = StanfordBasicPagesSortKeys["Title"]

        case "stanford_basic_pages--basic_page_type_list":
        case "stanford_basic_pages--viewfield_block_1":
          contextualFilters = getContextualFilters(["term_node_taxonomy_name_depth"], contextualFilter)
          graphqlResponse = await client.stanfordBasicPages({
            contextualFilters,
            ...queryVariables,
          })
          items = graphqlResponse.stanfordBasicPages?.results as unknown as NodeStanfordPage[]
          totalItems = graphqlResponse.stanfordBasicPages?.pageInfo.total || 0
          break

        case "stanford_courses--default_list_viewfield_block":
        case "stanford_courses--vertical_teaser_viewfield_block":
          graphqlResponse = await client.stanfordCourses({
            contextualFilters,
            ...queryVariables,
          })
          items = graphqlResponse.stanfordCourses?.results as unknown as NodeStanfordCourse[]
          totalItems = graphqlResponse.stanfordCourses?.pageInfo.total || 0
          break

        case "stanford_events--cards":
        case "stanford_events--list_page":
          contextualFilters = getContextualFilters(
            [
              "term_node_taxonomy_name_depth",
              "term_node_taxonomy_name_depth_1",
              "term_node_taxonomy_name_depth_2",
              "term_node_taxonomy_name_depth_3",
            ],
            contextualFilter
          )
          graphqlResponse = await client.stanfordEvents({
            contextualFilters,
            ...queryVariables,
          })
          items = graphqlResponse.stanfordEvents?.results as unknown as NodeStanfordEvent[]
          totalItems = graphqlResponse.stanfordEvents?.pageInfo.total || 0
          break

        case "stanford_events--past_events_list_block":
          graphqlResponse = await client.stanfordEventsPastEvents({
            contextualFilters,
            ...queryVariables,
          })
          items = graphqlResponse.stanfordEventsPastEvents?.results as unknown as NodeStanfordEvent[]
          totalItems = graphqlResponse.stanfordEventsPastEvents?.pageInfo.total || 0
          break

        case "stanford_news--block_1":
        case "stanford_news--vertical_cards":
          graphqlResponse = await client.stanfordNews({
            contextualFilters,
            ...queryVariables,
          })
          items = graphqlResponse.stanfordNews?.results as unknown as NodeStanfordNews[]
          totalItems = graphqlResponse.stanfordNews?.pageInfo.total || 0
          break

        case "sul_people--table_list_all":
          queryVariables.pageSize = 999
        case "stanford_person--grid_list_all":
          graphqlResponse = await client.stanfordPerson({
            contextualFilters,
            ...queryVariables,
          })
          items = graphqlResponse.stanfordPerson?.results as unknown as NodeStanfordPerson[]
          totalItems = graphqlResponse.stanfordPerson?.pageInfo.total || 0
          break

        case "stanford_publications--apa_list":
        case "stanford_publications--chicago_list":
          graphqlResponse = await client.stanfordPublications({
            contextualFilters,
            ...queryVariables,
          })
          items = graphqlResponse.stanfordPublications?.results as unknown as NodeStanfordPublication[]
          totalItems = graphqlResponse.stanfordPublications?.pageInfo.total || 0
          break

        case "stanford_shared_tags--card_grid":
          contextualFilters = getContextualFilters(["term_node_taxonomy_name_depth", "type"], contextualFilter)
          graphqlResponse = await client.stanfordSharedTags({
            contextualFilters,
            ...queryVariables,
          })
          items = graphqlResponse.stanfordSharedTags?.results as unknown as NodeUnion[]
          totalItems = graphqlResponse.stanfordSharedTags?.pageInfo.total || 0
          break

        default:
          console.warn(`Unable to find query for view: ${viewId} display: ${displayId}`)
          break
      }
    } catch (e) {
      if (e instanceof Error) console.warn(e.message)
      return {items: [], totalItems: 0}
    }
    return {items, totalItems}
  }
)

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

export default ListParagraph
