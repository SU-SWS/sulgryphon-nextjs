import {NodeStanfordEvent} from "@/lib/gql/__generated__/drupal.d"
import LoadMoreList from "@/components/patterns/load-more-list"
import {JSX} from "react"
import StanfordEventListItem from "@/components/node/stanford-event/list-item"

interface Props {
  items: NodeStanfordEvent[]
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

const EventsListView = async ({items, hasHeading, totalItems, loadPage}: Props) => {
  return (
    <LoadMoreList loadPage={loadPage} totalItems={totalItems}>
      {items.map(item => (
        <StanfordEventListItem key={item.id} node={item} h3Heading={hasHeading} />
      ))}
    </LoadMoreList>
  )
}
export default EventsListView
