import SharedTagsCardView from "@/components/views/shared-tags/shared-tags-card-view"
import PageListView from "@/components/views/stanford-page/page-list-view"
import NewsCardView from "@/components/views/stanford-news/news-card-view"
import NewsListView from "@/components/views/stanford-news/news-list-view"
import PersonCardView from "@/components/views/stanford-person/person-card-view"
import EventsCardView from "@/components/views/stanford-events/events-card-view"
import PageCardView from "@/components/views/stanford-page/page-card-view"
import StudyPlacesFilteredCards from "@/components/views/sul-study-place/study-places-filtered-cards"
import SulBranchLocationTableView from "@/components/views/sul-branch-locations/filtering-table/branch-locations-table"
import {
  NodeStanfordEvent,
  NodeStanfordNews,
  NodeStanfordPage,
  NodeStanfordPerson,
  NodeSulLibrary,
  NodeSulStudyPlace,
  NodeUnion,
} from "@/lib/gql/__generated__/drupal.d"
import SulPeopleTableView from "@/components/views/sul-people/sul-people-table-view"
import StudyPlaceTable from "@/components/views/sul-study-place/filtering-table/study-place-table"
import {JSX} from "react"
import FilteringNewsCardView from "@/components/views/stanford-news/filtering-news-card-view"
import SearchListView from "@/components/views/search-search/search-search-view"
import EventsListView from "@/components/views/stanford-events/events-list-view"
import EventsFilteredList from "@/components/views/stanford-events/events-filtered-list"
import PeopleRandomizedCardView from "./sul-people/sul-people-randomized-card-grid-view"

export type ViewDisplayProps<T extends NodeUnion = NodeUnion> = {
  /**
   * List of node entities.
   */
  items: T[]
  /**
   * If those nodes titles should display as <h2> or <h3>
   */
  headingLevel?: "h2" | "h3"
  /**
   * Total number of items to build the pager.
   */
  totalItems: number
  /**
   * Server action callback to fetch the next "page" contents.
   */
  loadPage?: (_page: number) => Promise<JSX.Element>
}

interface Props {
  items: NodeUnion[]
  viewId: string
  displayId: string
  headingLevel?: "h2" | "h3"
  /**
   * Total number of items to build the pager.
   */
  totalItems: number
  /**
   * Server action to load a page.
   */
  loadPage?: (_page: number) => Promise<JSX.Element>
}

const View = async ({viewId, displayId, items, totalItems, loadPage, headingLevel = "h2"}: Props) => {
  const component = `${viewId}--${displayId}`

  const viewProps = {totalItems, hasHeading: headingLevel !== "h2", loadPage}

  switch (component) {
    case "search--search":
      return <SearchListView items={items} {...viewProps} />

    case "stanford_basic_pages--basic_page_type_list":
      return <PageListView items={items as NodeStanfordPage[]} hasHeading={headingLevel !== "h2"} />

    case "sul_news--filtering_cards":
      return <FilteringNewsCardView items={items as NodeStanfordNews[]} {...viewProps} />

    case "sul_news--vertical_cards":
      return <NewsCardView items={items as NodeStanfordNews[]} {...viewProps} />

    case "sul_news--block_1":
      return <NewsListView items={items as NodeStanfordNews[]} {...viewProps} />

    case "stanford_person--grid_list_all":
      return <PersonCardView items={items as NodeStanfordPerson[]} {...viewProps} />

    case "sul_events--cards":
    case "sul_events--cards_desc":
    case "sul_events--shared_tags_cards":
    case "sul_events--shared_tags_cards_desc":
      return <EventsCardView items={items as NodeStanfordEvent[]} {...viewProps} />

    case "sul_events--list_page":
      return <EventsListView items={items as NodeStanfordEvent[]} {...viewProps} />

    case "sul_events--filtered_list":
      return <EventsFilteredList items={items as NodeStanfordEvent[]} {...viewProps} />

    case "stanford_basic_pages--viewfield_block_1":
      return <PageCardView items={items as NodeStanfordPage[]} {...viewProps} />

    case "stanford_shared_tags--card_grid":
      return <SharedTagsCardView items={items as NodeStanfordNews[]} {...viewProps} />

    case "sul_study_places--study_places":
      return <StudyPlacesFilteredCards items={items as NodeSulStudyPlace[]} />

    case "sul_people--table_list_all":
      return (
        <SulPeopleTableView
          items={(items as NodeStanfordPerson[]).map(item => ({
            uuid: item.uuid,
            title: item.title,
            path: item.path,
            types: item.suPersonTypeGroup?.map(typeGroup => typeGroup.name) || [],
            photoUrl: item.suPersonPhoto?.mediaImage.url,
            fullTitle: item.suPersonFullTitle,
            researchAreas: item.suPersonResearch?.map(research => research.processed as string),
            email: item.suPersonEmail,
            libCalId: item.sulPersonLibcalId,
          }))}
        />
      )

    case "sul_people--randomized_card_grid":
      return <PeopleRandomizedCardView items={items as NodeStanfordPerson[]} {...viewProps} />

    case "sul_branch_locations--branch_locations_table":
      return <SulBranchLocationTableView items={items as NodeSulLibrary[]} {...viewProps} />
    case "sul_study_places--study_places_table":
      return <StudyPlaceTable items={items as NodeSulStudyPlace[]} {...viewProps} />
  }

  return (
    <div>
      Need to build this view: <em>{component}</em>
    </div>
  )
}

export default View
