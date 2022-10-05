import {DrupalPublicationCitation, Publication} from "../../types/drupal";
import {DrupalLink} from "@/components/simple/link";
import {Rows} from "@/components/paragraphs/row";
import {MainContentLayout} from "@/components/layouts/main-content-layout";

interface PublicationNodeProps {
  node: Publication
}

export const NodeStanfordPublication = ({node, ...props}: PublicationNodeProps) => {
  return (
    <MainContentLayout>
      <article {...props}>
        {node.su_publication_topics && node.su_publication_topics.map(term=>
          <div key={term.id}>{term.name}</div>
        )}
        <h1>{node.title}</h1>

        {node.su_publication_components && <Rows rows={node.su_publication_components} rowField="su_pubs_components"/>}

        {node.su_publication_citation && <Citation citation={node.su_publication_citation}/>}
        {node.su_publication_cta &&
            <DrupalLink href={node.su_publication_cta.url}>{node.su_publication_cta.title}</DrupalLink>}
      </article>
    </MainContentLayout>
  )
}

export const NodeStanfordPublicationListItem = ({node, ...props}: PublicationNodeProps) => {
  return (
    <article {...props}>
      <DrupalLink href={node.path.alias}>
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </DrupalLink>
    </article>
  )
}

export const NodeStanfordPublicationCard = ({node, ...props}: PublicationNodeProps) => {
  return (
    <article className="su-shadow-lg" {...props}>
      <DrupalLink href={node.path.alias}
                  className="su-no-underline su-text-cardinal-red hover:su-underline hover:su-text-black">
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </DrupalLink>
    </article>
  )
}

interface CitationProps {
  citation: DrupalPublicationCitation
}

const Citation = ({citation}: CitationProps) => {
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
