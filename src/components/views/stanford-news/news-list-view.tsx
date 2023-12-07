import {getViewItems} from "@/components/views/view";
import {News} from "@/lib/drupal/drupal";
import StanfordNewsListItem from "@/components/node/stanford-news/list-item";

interface Props {
  view: string
  args: string
  itemsToDisplay: number
  emptyMessage: string
  hasHeading: boolean
}

const NewsListView = async ({view, args, itemsToDisplay, emptyMessage, hasHeading}: Props) => {
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
    <ul className="su-list-unstyled su-gap-2xl">
      {items.map(item =>
        <li
          key={item.id}
          className="su-border-b su-border-black-20 last:su-border-0 su-pb-10 last:su-pb-0 su-pt-10 first:su-pt-0"
        >
          <StanfordNewsListItem node={item} h3Heading={hasHeading}/>
        </li>
      )}
    </ul>
  )
}
export default NewsListView;