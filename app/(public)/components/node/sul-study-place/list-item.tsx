import {StudyPlace} from "@/lib/drupal/drupal";
import SulStudyPlaceCard from "./card";

const SulStudyPlaceListItem = ({node, ...props}: { node: StudyPlace }) => {
  // For now, just return the card. Change this if designs come through.
  return <SulStudyPlaceCard node={node} {...props}/>
}
export default SulStudyPlaceListItem;