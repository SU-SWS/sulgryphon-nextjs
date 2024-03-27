import CardList from "@/components/views/card-list";
import {NodeStanfordEvent} from "@/lib/gql/__generated__/drupal.d";

interface Props {
  items: NodeStanfordEvent[]
  hasHeading: boolean
}

const EventsCardView = async ({items, hasHeading}: Props) => {
  return (
    <CardList items={items} h3Heading={hasHeading}/>
  )
}
export default EventsCardView;