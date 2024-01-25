import Link from "@/components/patterns/elements/drupal-link";
import {CitationUnion, NodeStanfordPublication} from "@/lib/gql/__generated__/drupal";

const StanfordPublicationListItem = ({node, ...props}: {node:NodeStanfordPublication}) => {
  return (
    <article {...props}>
      <Link href={node.path}>
        <h2 className="text-cardinal-red">{node.title}</h2>
      </Link>
      {node.suPublicationCitation && <Citation citation={node.suPublicationCitation}/>}
    </article>
  )
}

const Citation = ({citation}: {citation: CitationUnion}) => {
  return (
    <>
      {citation.suAuthor && citation.suAuthor.map((author, index) =>
        <div key={`citation-author-${index}`}>
          {author.given} {author.family}
        </div>
      )}

      {citation.suPublisher}

    </>
  )
}

export default StanfordPublicationListItem;