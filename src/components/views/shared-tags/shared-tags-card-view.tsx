import CardList from "@/components/views/card-list"
import {NodeUnion} from "@/lib/gql/__generated__/graphql"

interface Props {
  items: NodeUnion[]
  hasHeading: boolean
}

const SharedTagsCardView = async ({items, hasHeading}: Props) => {
  return <CardList items={items} h3Heading={hasHeading} />
}
export default SharedTagsCardView
