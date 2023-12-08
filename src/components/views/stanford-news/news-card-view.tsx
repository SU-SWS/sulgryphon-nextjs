import {getViewItems} from "@/components/views/view";
import {News} from "@/lib/drupal/drupal";
import CardList from "@/components/views/card-list";

interface Props {
  view: string
  args: string
  itemsToDisplay: number
  emptyMessage: string
  hasHeading: boolean
}

const NewsCardView = async ({view, args, itemsToDisplay, emptyMessage, hasHeading}: Props) => {
  args = args ? args + '/0/0/0' : '0/0/0/0';

  const items = await getViewItems<News>(view, itemsToDisplay, args.split('/'));
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
    <CardList items={items} h3Heading={hasHeading}/>
  )
}
export default NewsCardView;