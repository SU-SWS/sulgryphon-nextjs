import PageCardView from "@/components/views/stanford-page/page-card-view"
import {NodeStanfordPage} from "@/lib/gql/__generated__/drupal.d"

interface Props {
  items: NodeStanfordPage[]
  hasHeading: boolean
}

const PageListView = async ({items, hasHeading}: Props) => {
  return <PageCardView items={items} hasHeading={hasHeading} />
}
export default PageListView
