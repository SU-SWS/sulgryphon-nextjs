import Link from "next/link";
import {Library} from "../../../../src/types/drupal";

const SulLibraryListItem = ({node, ...props}: {node: Library}) => {
  return (
    <article {...props}>
      <Link href={node.path.alias}>
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </Link>
    </article>
  )
}

export default SUlLibraryListItem;