import Link from "@/components/patterns/elements/drupal-link";
import {Library} from "@/lib/drupal/drupal";

const SulLibraryListItem = ({node, ...props}: {node: Library}) => {
  return (
    <article {...props}>
      <Link href={node.path?.alias ?? "#"}>
        <h2 className="text-cardinal-red">{node.title}</h2>
      </Link>
    </article>
  )
}

export default SulLibraryListItem;