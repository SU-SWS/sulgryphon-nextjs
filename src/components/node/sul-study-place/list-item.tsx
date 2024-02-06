
import SulStudyPlaceCard from "./card";
import {NodeSulStudyPlace} from "@/lib/gql/__generated__/drupal";

const SulStudyPlaceListItem = ({node, ...props}: { node: NodeSulStudyPlace }) => {
  // For now, just return the card. Change this if designs come through.
  return <SulStudyPlaceCard node={node} {...props}/>
}
export default SulStudyPlaceListItem;