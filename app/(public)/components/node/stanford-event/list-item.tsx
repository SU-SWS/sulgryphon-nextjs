import {Event} from "@/lib/drupal/drupal";
import StanfordEventCard from "@/components/node/stanford-event/card";

const StanfordEventListItem = ({node, ...props}: { node: Event }) => {
  // For now, just return the card. Change this if designs come through.
  return <StanfordEventCard node={node} {...props}/>
}
export default StanfordEventListItem;