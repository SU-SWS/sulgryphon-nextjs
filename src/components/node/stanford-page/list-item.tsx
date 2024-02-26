
import StanfordPageCard from "@/components/node/stanford-page/card";
import {NodeStanfordPage} from "@/lib/gql/__generated__/drupal.d";

interface Props {
  node: NodeStanfordPage
  h3Heading?: boolean
}
const StanfordPageListItem = ({node, ...props}: Props) => {
  // Without designs, use the card.
  return <StanfordPageCard node={node} {...props}/>
}
export default StanfordPageListItem;