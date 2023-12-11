import {Event} from "@/lib/drupal/drupal";
import StanfordEventCard from "@/components/node/stanford-event/card";
import {PropsWithoutRef} from "react";

interface Props {
  node: Event
  h3Heading?: boolean
}

const StanfordEventListItem = ({node, ...props}: PropsWithoutRef<Props>) => {
  // For now, just return the card. Change this if designs come through.
  return <StanfordEventCard node={node} {...props}/>
}
export default StanfordEventListItem;