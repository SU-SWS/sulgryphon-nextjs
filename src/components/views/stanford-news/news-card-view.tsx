import {NodeStanfordNews} from "@/lib/gql/__generated__/drupal.d"
import LoadMoreList from "@/components/patterns/load-more-list"
import {JSX} from "react"
import StanfordNewsCard from "@/components/node/stanford-news/card"

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
  loadPage?: (_page: number) => Promise<JSX.Element>
}

const NewsCardView = async ({items, hasHeading, totalItems, loadPage}: Props) => {
  return (
    <LoadMoreList
      className="@container"
      ulProps={{className: "list-unstyled grid gap-[90px] @4xl:grid-cols-2 @7xl:grid-cols-3 mb-50"}}
      liProps={{className: "w-full max-w-[500px] mx-auto"}}
      loadPage={loadPage}
      totalItems={totalItems}
    >
      {items.map(newsItem => (
        <StanfordNewsCard h3Heading={hasHeading} key={newsItem.id} node={newsItem} />
      ))}
    </LoadMoreList>
  )
}
export default NewsCardView
