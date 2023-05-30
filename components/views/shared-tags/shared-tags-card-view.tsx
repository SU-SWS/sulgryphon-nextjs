import {getViewItems} from "@/components/views/view";
import {DrupalNode} from "next-drupal";
import CardList from "@/components/views/card-list";

interface Props {
  view: string
  args: string
  itemsToDisplay: number
  emptyMessage: string
}

const SharedTagsCardView = async ({view, args, itemsToDisplay, emptyMessage}: Props) => {
  args = args ? args : '';

  const items = await getViewItems<DrupalNode>(view, itemsToDisplay, args.split('/'));

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
export default SharedTagsCardView;