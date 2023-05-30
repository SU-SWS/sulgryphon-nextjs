import {getViewItems} from "@/components/views/view";
import {Event} from "@/lib/drupal/drupal";
import CardList from "@/components/views/card-list";

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
    <CardList items={items}/>
  )
}
export default EventsCardView;