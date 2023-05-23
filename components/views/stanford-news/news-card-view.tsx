import {getViewItems} from "@/components/views/view";
import StanfordNewsCard from "@/components/node/stanford-news/card";
import {News} from "@/lib/drupal/drupal";

interface Props {
  view: string
  args: string
  itemsToDisplay: number
  emptyMessage: string
}

const NewsCardView = async ({view, args, itemsToDisplay, emptyMessage}: Props) => {
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
    <div className="su-@container su-flex su-flex-wrap su-justify-around su-gap-2xl">
      {items.map(item =>
        <div key={item.id} className="su-min-w-[250px] @6xl:su-min-w-[400px] su-flex-1 su-max-w-[500px]">
          <StanfordNewsCard node={item}/>
        </div>
      )}
    </div>
  )
}
export default NewsCardView;