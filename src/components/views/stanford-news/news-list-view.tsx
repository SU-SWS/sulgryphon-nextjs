import StanfordNewsListItem from "@/components/node/stanford-news/list-item";
import {NodeStanfordNews} from "@/lib/gql/__generated__/drupal.d";

interface Props {
  items: NodeStanfordNews[]
  hasHeading: boolean
}

const NewsListView = async ({items, hasHeading}: Props) => {
  return (
    <ul className="list-unstyled gap-2xl">
      {items.map(item =>
        <li
          key={item.id}
          className="border-b border-black-20 last:border-0 pb-10 last:pb-0 pt-10 first:pt-0"
        >
          <StanfordNewsListItem node={item} h3Heading={hasHeading}/>
        </li>
      )}
    </ul>
  )
}
export default NewsListView;