import {NodeStanfordEvent} from "@/lib/gql/__generated__/drupal.d"
import LoadMoreList from "@/components/patterns/load-more-list"
import StanfordEventCard from "@/components/node/stanford-event/card"
import {JSX} from "react"
import clsx from "clsx"

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

const EventsCardView = async ({items, hasHeading, totalItems, loadPage}: Props) => {
  return (
    <LoadMoreList
      className="@container"
      ulProps={{
        className: clsx("list-unstyled mb-50 gap-90", {
          "centered flex w-full flex-col justify-between md:flex-row md:flex-wrap lg:flex-nowrap": items.length === 3,
          "grid @4xl:grid-cols-2 @7xl:grid-cols-3": items.length !== 3,
        }),
      }}
      liProps={{
        className: clsx("w-full mx-auto", {
          "md:w-[calc(50%_-_5rem)] lg:w-[calc(33.3%_-_5rem)]": items.length === 3,
          "max-w-500": items.length !== 3,
        }),
      }}
      loadPage={loadPage}
      totalItems={totalItems}
    >
      {items.map(newsItem => (
        <StanfordEventCard h3Heading={hasHeading} key={newsItem.id} node={newsItem} />
      ))}
    </LoadMoreList>
  )
}
export default EventsCardView
