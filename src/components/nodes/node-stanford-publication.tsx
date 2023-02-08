import {DrupalPublicationCitation, Publication} from "../../types/drupal";
import Link from "next/link";
import {DrupalLinkButton} from "@/components/simple/link";
import {Rows} from "@/components/paragraphs/row";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import Conditional from "../simple/conditional";

interface PublicationNodeProps {
  node: Publication
}

export const NodeStanfordPublication = ({node, ...props}: PublicationNodeProps) => {

  const getMonthName = monthNumber => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', { month: 'long' });
  };

  return (
    <MainContentLayout pageTitle={node.title}>
      {console.log('node', node)}
      <article {...props}>
        <Conditional showWhen={node.su_publication_citation.citation_type}>
          <div className="su-text-16 md:su-text-18 2xl:su-text-19 su-rs-mb-2">
            {node.su_publication_citation.citation_type.resourceIdObjMeta.drupal_internal__target_id}
          </div>
        </Conditional>

        <div className="lg:su-grid su-grid-cols-6 su-gap-[40px] su-rs-mb-7">
          <Conditional showWhen={node.su_publication_components.length > 0}>
            <div className="su-col-span-4">
              <div className="su-rs-mb-7 md:su-w-11/12 ">
                {node.su_publication_components && <Rows rows={node.su_publication_components} rowField="su_pubs_components"/>}
              </div>
            </div>
          </Conditional>

          <div className="su-col-span-2">
            <div className="lg:su-rs-pl-3 lg:su-border-l su-border-black-10">
              <Conditional showWhen={node.su_publication_citation.su_author.length > 0}>
                <div className="su-rs-mb-2">
                    <h2 className="su-text-16 md:su-text-18 2xl:su-text-19">Author(s)</h2>
                    <div>
                      {node.su_publication_citation.su_author && node.su_publication_citation.su_author.map((author, index) =>
                        <div key={`citation-author-${index}`}>
                          {author.given} {author.family}
                        </div>
                      )}
                    </div>
                </div>
              </Conditional>

              <Conditional showWhen={node.su_publication_citation.su_publisher}>
                <div className="su-rs-mb-2">
                  <h2 className="su-text-16 md:su-text-18 2xl:su-text-19">Publisher</h2>
                  {node.su_publication_citation.su_publisher}
                </div>
              </Conditional>

              <Conditional showWhen={node.su_publication_citation.su_year}>
                <div className="su-rs-mb-4">
                  <h2 className="su-text-16 md:su-text-18 2xl:su-text-19">Publication Date</h2>
                  <Conditional showWhen={node.su_publication_citation.su_month && node.su_publication_citation.su_day}>
                    {getMonthName(node.su_publication_citation.su_month)} {node.su_publication_citation.su_day}, {node.su_publication_citation.su_year}
                  </Conditional>
                  <Conditional showWhen={node.su_publication_citation.su_month && !node.su_publication_citation.su_day}>
                    {node.su_publication_citation.su_month}, {node.su_publication_citation.su_year}
                  </Conditional>
                  <Conditional showWhen={!node.su_publication_citation.su_month && !node.su_publication_citation.su_day}>
                    {node.su_publication_citation.su_year}
                  </Conditional>
                </div>
              </Conditional>
            </div>

            {node.su_publication_cta &&
              <div className="lg:su-rs-pl-3">
                <DrupalLinkButton href={node.su_publication_cta.url}>{node.su_publication_cta.title}</DrupalLinkButton>
              </div>            
            }
          </div>
        </div>
        
        <Conditional showWhen={node.su_publication_topics.length > 0}>
          <div className="su-border-t su-border-black-10">
            <h2 className="su-text-16 md:su-text-18 2xl:su-text-19 su-font-bold su-rs-pt-0">Related Topics</h2>
            <div className="su-text-16 md:su-text-18 2xl:su-text-19 su-rs-mb-2">
              {node.su_publication_topics && node.su_publication_topics.map((term, index) =>
                <span key={term.id} className="su-text-digital-red su-text-16 md:su-text-18 2xl:su-text-19 su-rs-mb-2">{(index ? ', ' : '') + term.name}</span>
              )}
            </div>
          </div>
        </Conditional>
      </article>
    </MainContentLayout>
  )
}

export const NodeStanfordPublicationListItem = ({node, ...props}: PublicationNodeProps) => {
  return (
    <article {...props}>
      <Link href={node.path.alias}>
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </Link>
    </article>
  )
}

export const NodeStanfordPublicationCard = ({node, ...props}: PublicationNodeProps) => {
  return (
    <article className="su-shadow-lg" {...props}>
      <Link href={node.path.alias}
                  className="su-no-underline su-text-cardinal-red hover:su-underline hover:su-text-black">
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </Link>
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
