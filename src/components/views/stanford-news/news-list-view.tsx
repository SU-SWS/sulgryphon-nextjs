import StanfordNewsListItem from "@/components/node/stanford-news/list-item"
import {NodeStanfordNews} from "@/lib/gql/__generated__/drupal.d"
import {JSX} from "react"
import LoadMoreList from "@/components/patterns/load-more-list"

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

const NewsListView = async ({items, hasHeading, totalItems, loadPage}: Props) => {
  return (
    <LoadMoreList
      className="@container"
      ulProps={{className: "list-unstyled mb-50"}}
      loadPage={loadPage}
      totalItems={totalItems}
    >
      {items.map(item => (
        <StanfordNewsListItem key={item.uuid} node={item} h3Heading={hasHeading} />
      ))}
    </LoadMoreList>
  )
}
export default NewsListView
