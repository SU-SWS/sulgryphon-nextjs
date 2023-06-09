import {getViewItems} from "@/components/views/view";
import {Event} from "@/lib/drupal/drupal";
import StanfordEventListItem from "@/components/node/stanford-event/list-item";
import EventsCardView from "@/components/views/stanford-events/events-card-view";

interface Props {
  view: string
  args: string
  itemsToDisplay: number
  emptyMessage: string
  hasHeading: boolean
}

const EventsListView = async ({view, args, itemsToDisplay, emptyMessage, hasHeading}: Props) => {
  return <EventsCardView view={view} args={args} itemsToDisplay={itemsToDisplay} emptyMessage={emptyMessage} hasHeading={hasHeading}/>

  args = args ? args + '/0/0/0' : '0/0/0/0';

  const items = await getViewItems<Event>(view, itemsToDisplay, args.split('/'));

  if (items.length === 0) {
    if (emptyMessage) {
      return (
        <div>
          {emptyMessage}
        </div>
      )
    }
    return null;
  }

  return (
    <ul className="su-list-unstyled su-gap-2xl">
      {items.map(item =>
        <li
          key={item.id}
          className="su-border-b su-border-black-20 su-last:border-0 su-pb-10 su-last:pb-0 su-pt-10 su-first:pt-0"
        >
          <StanfordEventListItem node={item} h3Heading={hasHeading}/>
        </li>
      )}
    </ul>
  )
}
export default EventsListView;