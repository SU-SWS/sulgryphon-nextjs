import {NodeStanfordNews} from "@/lib/gql/__generated__/graphql"
import {JSX} from "react"
import StanfordNewsCard from "@/components/node/stanford-news/card"
import FilteringNewsCardViewClient from "@/components/views/stanford-news/filtering-news-card-view.client"
import {getNewsTypeOptions} from "@/lib/gql/gql-queries"

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
  const newsTypes = await getNewsTypeOptions()

  return (
    <FilteringNewsCardViewClient loadPage={loadPage} totalItems={totalItems} typeOptions={newsTypes}>
      {items.map(newsItem => (
        <StanfordNewsCard h3Heading={hasHeading} key={newsItem.uuid} node={newsItem} />
      ))}
    </FilteringNewsCardViewClient>
  )
}
export default FilteringNewsCardView
