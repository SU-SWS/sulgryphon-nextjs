import CardList from "@/components/views/card-list";
import {NodeStanfordPerson} from "@/lib/gql/__generated__/drupal";

interface Props {
  items: NodeStanfordPerson[]
  hasHeading: boolean
}

const PersonCardView = async ({items, hasHeading}: Props) => {
  return (
    <CardList items={items} h3Heading={hasHeading}/>
  )
}
export default PersonCardView;