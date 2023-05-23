import {getViewItems} from "@/components/views/view";
import {Event} from "@/lib/drupal/drupal";
import StanfordEventListItem from "@/components/node/stanford-event/list-item";

interface Props {
  view: string
  args: string
  itemsToDisplay: number
  emptyMessage: string
}

const EventsListView = async ({view, args, itemsToDisplay, emptyMessage}: Props) => {
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
    <div>
      {items.map(item =>
        <div
          key={item.id}
          className="su-border-b su-border-black-20 su-last:border-0 su-pb-10 su-last:pb-0 su-pt-10 su-first:pt-0"
        >
          <StanfordEventListItem node={item}/>
        </div>
      )}
    </div>
  )
}
export default EventsListView;