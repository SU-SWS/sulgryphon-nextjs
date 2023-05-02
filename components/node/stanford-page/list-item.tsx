import {BasicPage} from "@/lib/drupal/drupal";
import StanfordPageCard from "@/components/node/stanford-page/card";

const StanfordPageListItem = ({node, ...props}: { node: BasicPage }) => {
  // Without designs, use the card.
  return <StanfordPageCard node={node} {...props}/>
}
export default StanfordPageListItem;