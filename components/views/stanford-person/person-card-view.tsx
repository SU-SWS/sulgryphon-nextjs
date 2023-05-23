import {getViewItems} from "@/components/views/view";
import {Person} from "@/lib/drupal/drupal";
import StanfordPersonCard from "@/components/node/stanford-person/card";

interface Props {
  view: string
  args: string
  itemsToDisplay: number
  emptyMessage: string
}

const PersonCardView = async ({view, args, itemsToDisplay, emptyMessage}: Props) => {
  args = args ? args + '/0/0/0' : '0/0/0/0';

  const items = await getViewItems<Person>(view, itemsToDisplay, args.split('/'));
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
          <StanfordPersonCard node={item} key={item.id}/>
        </div>
      )}
    </div>
  )
}
export default PersonCardView;