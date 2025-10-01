import {NodeStanfordEvent} from "@/lib/gql/__generated__/drupal.d"
import {JSX} from "react"
import StanfordEventListItem from "@/components/node/stanford-event/list-item"
import EventsFilteredListClient from "./events-filtered-list.client"

interface Props {
  items: NodeStanfordEvent[]
  hasHeading: boolean
  /**
   * Total number of items to build the pager.
   */
  totalItems: number
  /**
   * Server action to load a page with filters.
   * Now expects filters as second parameter: {search?: string, eventType?: string}
   */
  loadPage?: (_page: number, filters?: {search?: string; eventType?: string}) => Promise<JSX.Element>
}

const EventsFilteredList = async ({items, hasHeading, totalItems, loadPage}: Props) => {
  return (
    <EventsFilteredListClient
      className="@container"
      ulProps={{className: "list-unstyled flex flex-col mb-50 max-w-[98rem] mx-auto"}}
      liProps={{className: "w-full pt-16 pb-40 last:pb-0 md:border-t"}}
      loadPage={loadPage}
      totalItems={totalItems}
    >
      {items.map(item => (
        <StanfordEventListItem key={item.id} node={item} h3Heading={hasHeading} />
      ))}
    </EventsFilteredListClient>
  )
}
export default EventsFilteredList
