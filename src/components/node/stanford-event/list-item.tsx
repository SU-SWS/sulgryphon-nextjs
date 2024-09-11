import StanfordEventCard from "@/components/node/stanford-event/card"
import {NodeStanfordEvent} from "@/lib/gql/__generated__/drupal.d"

interface Props {
  node: NodeStanfordEvent
  h3Heading?: boolean
}

const StanfordEventListItem = ({node, ...props}: Props) => {
  // For now, just return the card. Change this if designs come through.
  return <StanfordEventCard node={node} {...props} />
}
export default StanfordEventListItem
