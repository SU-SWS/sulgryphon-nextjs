import Link from "@/components/patterns/elements/drupal-link"
import {NodeSulLibrary} from "@/lib/gql/__generated__/drupal.d"

const SulLibraryListItem = ({node, ...props}: {node: NodeSulLibrary}) => {
  return (
    <article {...props}>
      <Link href={node.path || "#"}>
        <h2 className="text-cardinal-red">{node.title}</h2>
      </Link>
    </article>
  )
}

export default SulLibraryListItem
