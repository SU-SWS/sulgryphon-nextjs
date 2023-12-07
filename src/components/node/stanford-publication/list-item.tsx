import Link from "@/components/patterns/elements/drupal-link";
import {DrupalPublicationCitation, Publication} from "@/lib/drupal/drupal";

const StanfordPublicationListItem = ({node, ...props}: {node:Publication}) => {
  return (
    <article {...props}>
      <Link href={node.path?.alias ?? "#"}>
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </Link>
      {node.su_publication_citation && <Citation citation={node.su_publication_citation}/>}
    </article>
  )
}

const Citation = ({citation}: {citation: DrupalPublicationCitation}) => {
  return (
    <>
      {citation.su_author && citation.su_author.map((author, index) =>
        <div key={`citation-author-${index}`}>
          {author.given} {author.family}
        </div>
      )}

      {citation.su_publisher}
      {citation.su_page}

    </>
  )
}

export default StanfordPublicationListItem;