import {BasicPage} from "@/lib/drupal/drupal";
import StanfordPageCard from "@/components/node/stanford-page/card";
import {PropsWithoutRef} from "react";
interface Props {
  node: BasicPage
  h3Heading?: boolean
}
const StanfordPageListItem = ({node, ...props}: PropsWithoutRef<Props>) => {
  // Without designs, use the card.
  return <StanfordPageCard node={node} {...props}/>
}
export default StanfordPageListItem;