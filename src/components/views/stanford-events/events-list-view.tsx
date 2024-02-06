import EventsCardView from "@/components/views/stanford-events/events-card-view";
import {NodeStanfordEvent} from "@/lib/gql/__generated__/drupal";

interface Props {
  items: NodeStanfordEvent[]
  hasHeading: boolean
}

const EventsListView = async ({items, hasHeading}: Props) => {
  return <EventsCardView items={items} hasHeading={hasHeading}/>
}
export default EventsListView;