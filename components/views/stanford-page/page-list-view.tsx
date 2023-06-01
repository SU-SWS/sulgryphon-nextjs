import StanfordPageListItem from "@/components/node/stanford-page/list-item";
import {getViewItems} from "@/components/views/view";
import {BasicPage} from "@/lib/drupal/drupal";
import PageCardView from "@/components/views/stanford-page/page-card-view";

interface Props {
  view: string
  args: string
  itemsToDisplay: number
  emptyMessage: string
  hasHeading: boolean
}

const PageListView = async ({view, args, itemsToDisplay, emptyMessage, hasHeading}: Props) => {
  /* @ts-expect-error Async Server Component */
  return <PageCardView view={view} args={args} itemsToDisplay={itemsToDisplay} emptyMessage={emptyMessage} hasHeading={hasHeading}/>

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
    <ul className="su-list-unstyled su-gap-2xl">
      {items.map(item =>
        <li
          key={item.id}
          className="su-border-b su-border-black-20 last:su-border-0 su-pb-10 last:su-pb-0 su-pt-10 first:su-pt-0"
        >
          <StanfordPageListItem node={item} h3Heading={hasHeading}/>
        </li>
      )}
    </ul>
  )
}
export default PageListView;