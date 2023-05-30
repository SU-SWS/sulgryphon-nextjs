import {getViewItems} from "@/components/views/view";
import {BasicPage} from "@/lib/drupal/drupal";
import CardList from "@/components/views/card-list";

interface Props {
  view: string
  args: string
  itemsToDisplay: number
  emptyMessage: string
}

const PageCardView = async ({view, args, itemsToDisplay, emptyMessage}: Props) => {
  args = args ? args + '/0/0/0' : '0/0/0/0';

  const items = await getViewItems<BasicPage>(view, itemsToDisplay, args.split('/'));
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
export default PageCardView;