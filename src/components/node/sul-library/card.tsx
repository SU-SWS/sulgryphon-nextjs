import Link from "@/components/patterns/elements/drupal-link";
import {NodeSulLibrary} from "@/lib/gql/__generated__/drupal.d";

const SulLibraryCard = ({node, ...props}: {node: NodeSulLibrary}) => {
  return (
    <article className="shadow-lg" {...props}>
      <Link href={node.path}
                  className="no-underline text-cardinal-red hover:underline hover:text-black">
        <h2 className="text-cardinal-red">{node.title}</h2>
      </Link>
    </article>
  )
}
export default SulLibraryCard;