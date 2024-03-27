import StanfordPublicationListItem from "@/components/node/stanford-publication/list-item";
import {NodeStanfordPublication} from "@/lib/gql/__generated__/drupal.d";

interface Props {
  items: NodeStanfordPublication[]
}

const PublicationsChicagoView = async ({items}: Props) => {

  return (
    <div className="mb-20">
      {items.map(item =>
        <div
          key={item.id}
          className="border-b border-black-20 last:border-0 pb-10 last:pb-0 pt-10 first:pt-0"
        >
          <StanfordPublicationListItem node={item}/>
        </div>
      )}
    </div>
  )
}
export default PublicationsChicagoView;