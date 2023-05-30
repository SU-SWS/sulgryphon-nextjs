import {getViewItems} from "@/components/views/view";
import StanfordPublicationListItem from "@/components/node/stanford-publication/list-item";
import {Publication} from "@/lib/drupal/drupal";

interface Props {
  view: string
  args: string
  itemsToDisplay: number
  emptyMessage: string
}

const PublicationsApaView = async ({view, args, itemsToDisplay, emptyMessage}: Props) => {
  args = args ? args + '/0/0/0' : '0/0/0/0';

  const items = await getViewItems<Publication>(view, itemsToDisplay, args.split('/'));
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
    <ul className="su-list-unstyled su-flex su-flex-wrap su-justify-between su-gap-2xl">
      {items.map(item =>
        <li key={item.id} className="flex-1 min-w-[250px]">
          <StanfordPublicationListItem node={item} key={item.id}/>
        </li>
      )}
    </ul>
  )
}
export default PublicationsApaView;