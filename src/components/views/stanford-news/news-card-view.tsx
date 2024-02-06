import CardList from "@/components/views/card-list";
import {NodeStanfordNews} from "@/lib/gql/__generated__/drupal";

interface Props {
  items: NodeStanfordNews[]
  hasHeading: boolean
}

const NewsCardView = async ({items, hasHeading}: Props) => {
  return (
    <CardList items={items} h3Heading={hasHeading}/>
  )
}
export default NewsCardView;