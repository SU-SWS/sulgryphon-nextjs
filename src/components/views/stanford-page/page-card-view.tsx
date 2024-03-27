import CardList from "@/components/views/card-list";
import {NodeStanfordPage} from "@/lib/gql/__generated__/drupal.d";

interface Props {
  items: NodeStanfordPage[]
  hasHeading: boolean
}

const PageCardView = async ({items, hasHeading}: Props) => {
  return (
    <CardList items={items} h3Heading={hasHeading}/>
  )
}
export default PageCardView;