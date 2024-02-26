
import {ParagraphRows} from "@/components/paragraph/rows/rows";
import {DrupalLinkButton} from "@/components/patterns/link";
import {NodeStanfordPublication} from "@/lib/gql/__generated__/drupal.d";

const StanfordPublication = async ({node, ...props}: { node: NodeStanfordPublication }) => {
  return (
    <article {...props}>
      {(node.suPublicationCitation?.__typename) &&
        <div className="text-16 md:text-18 2xl:text-19 rs-mb-2">
          {node.suPublicationCitation.__typename}
        </div>
      }

      <div className="lg:grid grid-cols-6 gap-[40px] rs-mb-7">
        {node.suPublicationComponents &&
          <div className="col-span-4">
            <div className="rs-mb-7 lg:w-11/12 ">
              <ParagraphRows items={node.suPublicationComponents}/>
            </div>
          </div>
        }

        <div className="col-span-2">
          <div className="lg:rs-pl-3 lg:border-l border-black-10">
            {node.suPublicationCitation?.suAuthor &&
                <div className="rs-mb-2">
                  <h2 className="text-16 md:text-18 2xl:text-19 mb-01em">Author(s)</h2>
                  <div>
                    {node.suPublicationCitation.suAuthor.map((author, index) =>
                      <div key={`citation-author-${index}`} className="text-16 md:text-18 2xl:text-19">
                        {author.given} {author.family}
                      </div>
                    )}
                  </div>
                </div>
            }

            {node.suPublicationCitation?.suPublisher &&
              <div className="rs-mb-2">
                <h2 className="text-16 md:text-18 2xl:text-19 mb-01em">Publisher</h2>
                <div className="text-16 md:text-18 2xl:text-19">
                  {node.suPublicationCitation.suPublisher}
                </div>
              </div>
            }

            {(node.suPublicationCitation?.__typename === 'SuArticleJournal' && node.suPublicationCitation.suJournalPublisher) &&
              <div className="rs-mb-2">
                <h2 className="text-16 md:text-18 2xl:text-19 mb-01em">Journal Name</h2>
                <div className="text-16 md:text-18 2xl:text-19">
                  {node.suPublicationCitation?.suJournalPublisher}
                </div>
              </div>
            }
          </div>

          {node.suPublicationCta?.url &&
              <div className="lg:rs-pl-3 rs-pt-2">
                <DrupalLinkButton href={node.suPublicationCta.url}>{node.suPublicationCta.title}</DrupalLinkButton>
              </div>
          }
        </div>
      </div>

      {node.suPublicationTopics &&
        <div className="border-t border-black-10">
          <h2 className="text-16 md:text-18 2xl:text-19 font-bold rs-pt-0">Related Topics</h2>
          <div className="text-16 md:text-18 2xl:text-19 rs-mb-2">
            {node.suPublicationTopics.map((term, index) =>
              <span key={term.id} className="text-digital-red text-16 md:text-18 2xl:text-19 rs-mb-2">
                {(index ? ', ' : '') + term.name}
              </span>
            )}
          </div>
        </div>
      }
    </article>
  )
}

export default StanfordPublication;