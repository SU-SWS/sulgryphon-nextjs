import Link from "@/components/patterns/elements/drupal-link"
import {NodeSulLibrary} from "@/lib/gql/__generated__/drupal.d"

const SulLibraryCard = ({node, ...props}: {node: NodeSulLibrary}) => {
  return (
    <article className="shadow-lg" {...props}>
      <Link href={node.path} className="text-cardinal-red no-underline hover:text-black hover:underline">
        <h2 className="text-cardinal-red">{node.title}</h2>
      </Link>
    </article>
  )
}
export default SulLibraryCard
