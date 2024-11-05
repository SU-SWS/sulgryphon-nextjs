import SulStudyPlaceMetadata from "@/components/node/sul-study-place/sul-study-place-metadata"
import {NodeSulStudyPlace} from "@/lib/gql/__generated__/drupal.d"

type Props = {
  node: NodeSulStudyPlace
}
const SulStudyPlace = ({node}: Props) => {
  return (
    <div>
      <SulStudyPlaceMetadata node={node} /> Place of Study
    </div>
  )
}

export default SulStudyPlace
