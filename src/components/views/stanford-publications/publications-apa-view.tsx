import StanfordPublicationListItem from "@/components/node/stanford-publication/list-item"
import {NodeStanfordPublication} from "@/lib/gql/__generated__/drupal.d"

interface Props {
  items: NodeStanfordPublication[]
}

const PublicationsApaView = async ({items}: Props) => {
  return (
    <ul className="list-unstyled flex flex-wrap justify-between gap-2xl">
      {items.map(item => (
        <li key={item.id} className="min-w-[250px] flex-1">
          <StanfordPublicationListItem node={item} key={item.id} />
        </li>
      ))}
    </ul>
  )
}
export default PublicationsApaView
