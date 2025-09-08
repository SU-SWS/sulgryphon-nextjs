import SulLibraryCard from "@/components/node/sul-library/card"
import {NodeSulLibrary} from "@/lib/gql/__generated__/drupal.d"

interface Props {
  node: NodeSulLibrary
  h3Heading?: boolean
}

const SulLibraryListItem = ({node, ...props}: Props) => {
  // Use the enhanced card component for consistent display
  return <SulLibraryCard node={node} {...props} />
}

export default SulLibraryListItem
