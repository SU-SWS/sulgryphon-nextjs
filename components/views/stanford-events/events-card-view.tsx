import {getViewItems} from "@/components/views/view";
import StanfordEventCard from "@/components/node/stanford-event/card";
import {Event} from "@/lib/drupal/drupal";

interface Props {
  view: string
  args: string
  itemsToDisplay: number
  emptyMessage: string
}

const EventsCardView = async ({view, args, itemsToDisplay, emptyMessage}: Props) => {

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
    <div className="su-@container su-flex su-flex-wrap su-justify-around su-gap-2xl">
      {items.map(item =>
        <div key={item.id} className="su-min-w-[250px] @6xl:su-min-w-[400px] su-flex-1 su-max-w-[500px]">
          <StanfordEventCard node={item} key={item.id}/>
        </div>
      )}
    </div>
  )
}
export default EventsCardView;