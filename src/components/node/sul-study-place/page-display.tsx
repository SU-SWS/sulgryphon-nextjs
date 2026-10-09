import {NodeSulStudyPlace} from "@/lib/gql/__generated__/graphql"
import NodePageMetadata from "../node-page-metadata"
import {getCleanDescription} from "@/lib/text-tools"

type Props = {
  node: NodeSulStudyPlace
}
const SulStudyPlace = ({node}: Props) => {
  return (
    <div>
      <NodePageMetadata
        pageTitle={node.title}
        metatags={node.metatag}
        url={node.path}
        backupDescription={getCleanDescription(node.sulStudyAdditionalInfo?.processed)}
      />
      Place of Study
    </div>
  )
}

export default SulStudyPlace
