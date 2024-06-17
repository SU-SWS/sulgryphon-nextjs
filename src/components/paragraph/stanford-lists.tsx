import formatHtml from "@/lib/format-html"
import {DrupalLinkButton} from "@/components/patterns/link"
import {cache, HTMLAttributes} from "react"
import {Maybe, Link as LinkType, ViewReference, NodeUnion} from "@/lib/gql/__generated__/drupal.d"
import {ParagraphBehaviors} from "@/lib/drupal/drupal"
import {graphqlClient} from "@/lib/gql/fetcher"
import View from "@/components/views/view"
import {twMerge} from "tailwind-merge"

type ListProps = HTMLAttributes<HTMLDivElement> & {
  headline?: Maybe<string>
  description?: Maybe<string>
  link?: Maybe<LinkType>
  view?: Maybe<ViewReference>
  behaviors?: ParagraphBehaviors
  headerId?: string
  uuid: string
  headingBehavior?: Maybe<"show" | "hide" | "remove">
}

const ListParagraph = async ({headerId, headline, description, link, view, behaviors, uuid, headingBehavior}: ListProps) => {
  const linkAttributes: Record<string, string> = {}
  if (link?.attributes?.ariaLabel) linkAttributes["aria-label"] = link.attributes.ariaLabel

  if (headerId && link?.attributes?.ariaLabel && link.attributes.ariaLabel === headline) {
    linkAttributes["aria-labelledby"] = headerId
    delete linkAttributes["aria-label"]
  }

  const viewId = view?.view
  const displayId = view?.display
  let viewItems: NodeUnion[] = []

  if (viewId && displayId) {
    try {
      viewItems = await getViewItems(viewId, displayId, view?.contextualFilter, view?.pageSize)
    } catch (e) {
      try {
        console.warn(`${uuid}: Retrying to fetch view items: View ID: ${viewId}, Display: ${displayId}, Filters: ${view?.contextualFilter?.join("/")}`)

        // Try again to build the view. Sometimes it fails the first time.
        viewItems = await getViewItems(viewId, displayId, view?.contextualFilter)
      } catch (e) {
        console.error(`${uuid}: An error occurred when fetching view items: View ID: ${viewId}, Display: ${displayId}, Filters: ${view?.contextualFilter?.join("/")}`)
      }
    }
  }

  if (behaviors?.list_paragraph?.hide_empty && viewItems.length === 0) return null

  return (
    <div className="centered flex flex-col gap-xl">
      <div className="mb-20 flex items-center justify-between">
        {headline && headingBehavior !== "remove" && (
          <h2
            id={headerId}
            className={twMerge("m-0", headingBehavior === "hide" && "sr-only")}
          >
            {headline}
          </h2>
        )}

        {link?.url && (
          <DrupalLinkButton
            href={link.url}
            {...linkAttributes}
          >
            {link.title}
          </DrupalLinkButton>
        )}
      </div>

      {description && <div>{formatHtml(description)}</div>}
      {viewItems && viewId && displayId && (
        <View
          items={viewItems}
          viewId={viewId}
          displayId={displayId}
          hasHeading={!!headline}
        />
      )}
    </div>
  )
}

const getViewItems = cache(async (viewId: string, displayId: string, contextualFilter?: Maybe<string[]>, pageSize?: Maybe<number>): Promise<NodeUnion[]> => {
  let results: NodeUnion[] = []
  let pageResults: NodeUnion[] = []
  const itemsPerPage = pageSize ? Math.max(3, Math.min(Math.ceil(pageSize / 3) * 3, 99)) : undefined
  let fetchMore = true
  let page = 0

  while (fetchMore) {
    pageResults = await getViewPagedItems(viewId, displayId, contextualFilter, pageSize, page)
    results = [...results, ...pageResults]
    fetchMore = itemsPerPage === 99 && pageResults.length === itemsPerPage
    page++
  }
  return results
})

const getViewPagedItems = cache(async (viewId: string, displayId: string, contextualFilter?: Maybe<string[]>, pageSize?: Maybe<number>, page?: Maybe<number>, offset?: Maybe<number>): Promise<NodeUnion[]> => {
  let items: NodeUnion[] = []

  const tags = ["views"]

  switch (`${viewId}--${displayId}`) {
    case "stanford_shared_tags--card_grid":
      tags.push("views:all")
      break

    case "sul_shared_tag_events--card_grid":
      tags.push("views:stanford_event")
      break

    case "stanford_basic_pages--basic_page_type_list":
    case "stanford_basic_pages--viewfield_block_1":
      tags.push("views:stanford_page")
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

    case 'sul_study_places--study_places':
    case 'sul_study_places--study_places_table':
      tags.push('views:sul_study_place');
      break
  }

  const client = graphqlClient({next: {tags}})
  let filters = getViewFilters(["term_node_taxonomy_name_depth", "nid"], contextualFilter)
  let graphqlResponse
  const itemsPerPage = pageSize ? Math.min(Math.ceil(pageSize / 3) * 3, 99) : undefined
  const queryVariables = {pageSize: itemsPerPage, page, offset}

  switch (`${viewId}--${displayId}`) {
    case "stanford_shared_tags--card_grid":
      filters = getViewFilters(["term_node_taxonomy_name_depth", "type"], contextualFilter)
      graphqlResponse = await client.stanfordSharedTags({filters, ...queryVariables})
      items = graphqlResponse.stanfordSharedTags?.results as unknown as NodeUnion[]
      break

    case "sul_shared_tag_events--card_grid":
      filters = getViewFilters(["term_node_taxonomy_name_depth"], contextualFilter)
      graphqlResponse = await client.sulSharedTagEventsCardGridGraphql({filters, ...queryVariables})
      items = graphqlResponse.sulSharedTagEventsCardGridGraphql?.results as unknown as NodeUnion[]
      break

    case "stanford_basic_pages--basic_page_type_list":
      graphqlResponse = await client.stanfordBasicPages({filters, ...queryVariables})
      items = graphqlResponse.stanfordBasicPages?.results as unknown as NodeUnion[]
      break

    case "stanford_basic_pages--viewfield_block_1":
      graphqlResponse = await client.stanfordBasicPagesCards({filters, ...queryVariables})
      items = graphqlResponse.stanfordBasicPagesCards?.results as unknown as NodeUnion[]
      break

    case "stanford_events--cards":
      filters = getViewFilters(["term_node_taxonomy_name_depth", "term_node_taxonomy_name_depth_1", "term_node_taxonomy_name_depth_2", "term_node_taxonomy_name_depth_3"], contextualFilter)
      graphqlResponse = await client.stanfordEventsCardGrid({filters, ...queryVariables})
      items = graphqlResponse.stanfordEventsCardGrid?.results as unknown as NodeUnion[]
      break

    case "stanford_events--list_page":
      filters = getViewFilters(["term_node_taxonomy_name_depth", "term_node_taxonomy_name_depth_1", "term_node_taxonomy_name_depth_2", "term_node_taxonomy_name_depth_3"], contextualFilter)
      graphqlResponse = await client.stanfordEvents({filters, ...queryVariables})
      items = graphqlResponse.stanfordEvents?.results as unknown as NodeUnion[]
      break

    case "stanford_events--past_events_list_block":
      filters = getViewFilters(["term_node_taxonomy_name_depth"], contextualFilter)
      graphqlResponse = await client.stanfordEventsPastEvents({filters, ...queryVariables})
      items = graphqlResponse.stanfordEventsPastEvents?.results as unknown as NodeUnion[]
      break

    case "stanford_news--block_1":
      filters = getViewFilters(["term_node_taxonomy_name_depth"], contextualFilter)
      graphqlResponse = await client.stanfordNewsDefaultList({filters, ...queryVariables})
      items = graphqlResponse.stanfordNewsDefaultList?.results as unknown as NodeUnion[]
      break

    case "stanford_news--vertical_cards":
      graphqlResponse = await client.stanfordNewsCardGrid({filters, ...queryVariables})
      items = graphqlResponse.stanfordNewsCardGrid?.results as unknown as NodeUnion[]
      break

    case "stanford_person--grid_list_all":
    case "sul_people--table_list_all":
      filters = getViewFilters(["term_node_taxonomy_name_depth"], contextualFilter)
      graphqlResponse = await client.stanfordPerson({filters, ...queryVariables})
      items = graphqlResponse.stanfordPerson?.results as unknown as NodeUnion[]
      break

    case 'sul_study_places--study_places':
    case 'sul_study_places--study_places_table':
      graphqlResponse = await client.sulStudyPlaces();
      items = graphqlResponse.sulStudyPlaces?.results as unknown as NodeUnion[]
      break

    default:
      console.error(`Unable to find query for view: ${viewId} display: ${displayId}`)
      break
  }

  return pageSize ? items.slice(0, pageSize) : items
})

const getViewFilters = (keys: string[], values?: Maybe<string[]>) => {
  if (!keys || !values) return
  const filters: Record<string, string | undefined> = keys.reduce(
    (obj, key, index) => ({
      ...obj,
      [key]: values[index],
    }),
    {}
  )
  Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key])
  return filters
}

export default ListParagraph
