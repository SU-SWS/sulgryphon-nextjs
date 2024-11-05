import {NodeStanfordNews} from "@/lib/gql/__generated__/drupal.d"
import {JSX} from "react"
import StanfordNewsCard from "@/components/node/stanford-news/card"
import FilteringNewsCardViewClient from "@/components/views/stanford-news/filtering-news-card-view.client"
import {graphqlClient} from "@/lib/gql/fetcher"

interface Props {
  items: NodeStanfordNews[]
  hasHeading: boolean
  /**
   * Total number of items to build the pager.
   */
  totalItems: number
  /**
   * Server action to load a page.
   */
  loadPage?: (
    _page: number,
    _filters?: Record<string, string | number | Array<string | number> | undefined>
  ) => Promise<JSX.Element>
}

const FilteringNewsCardView = async ({items, hasHeading, totalItems, loadPage}: Props) => {
  const newsTypes = (await graphqlClient().NewsTypes()).termStanfordNewsTopics.nodes.map(term => ({
    value: term.id,
    label: term.name,
  }))

  return (
    <FilteringNewsCardViewClient loadPage={loadPage} totalItems={totalItems} typeOptions={newsTypes}>
      {items.map(newsItem => (
        <StanfordNewsCard h3Heading={hasHeading} key={newsItem.id} node={newsItem} />
      ))}
    </FilteringNewsCardViewClient>
  )
}
export default FilteringNewsCardView
