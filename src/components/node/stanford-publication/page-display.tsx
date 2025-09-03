import Rows from "@/components/paragraph/rows/rows"
import {DrupalLinkButton} from "@/components/patterns/link"
import {NodeStanfordPublication} from "@/lib/gql/__generated__/drupal.d"

const StanfordPublication = async ({node, ...props}: {node: NodeStanfordPublication}) => {
  return (
    <article {...props} aria-labelledby={node.id}>
      {node.suPublicationCitation?.__typename && (
        <div className="rs-mb-2 text-16 md:text-18 2xl:text-19">{node.suPublicationCitation.__typename}</div>
      )}

      <div className="rs-mb-7 grid-cols-6 gap-[40px] lg:grid">
        {node.suPublicationComponents && (
          <div className="col-span-4">
            <div className="rs-mb-7 lg:w-11/12">
              <Rows components={node.suPublicationComponents} />
            </div>
          </div>
        )}

        <div className="col-span-2">
          <div className="border-black-10 lg:rs-pl-3 lg:border-l">
            {node.suPublicationCitation?.suAuthor && (
              <div className="rs-mb-2">
                <h2 className="mb-01em text-16 md:text-18 2xl:text-19">Author(s)</h2>
                <div>
                  {node.suPublicationCitation.suAuthor.map((author, index) => (
                    <div key={`citation-author-${index}`} className="text-16 md:text-18 2xl:text-19">
                      {author.given} {author.family}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {node.suPublicationCitation?.suPublisher && (
              <div className="rs-mb-2">
                <h2 className="mb-01em text-16 md:text-18 2xl:text-19">Publisher</h2>
                <div className="text-16 md:text-18 2xl:text-19">{node.suPublicationCitation.suPublisher}</div>
              </div>
            )}

            {node.suPublicationCitation?.__typename === "CitationSuArticleJournal" &&
              node.suPublicationCitation.suJournalPublisher && (
                <div className="rs-mb-2">
                  <h2 className="mb-01em text-16 md:text-18 2xl:text-19">Journal Name</h2>
                  <div className="text-16 md:text-18 2xl:text-19">{node.suPublicationCitation?.suJournalPublisher}</div>
                </div>
              )}
          </div>

          {node.suPublicationCta?.url && (
            <div className="rs-pt-2 lg:rs-pl-3">
              <DrupalLinkButton href={node.suPublicationCta.url}>{node.suPublicationCta.title}</DrupalLinkButton>
            </div>
          )}
        </div>
      </div>

      {node.suPublicationTopics && (
        <div className="border-t border-black-10">
          <h2 className="rs-pt-0 text-16 font-bold md:text-18 2xl:text-19">Related Topics</h2>
          <div className="rs-mb-2 text-16 md:text-18 2xl:text-19">
            {node.suPublicationTopics.map((term, index) => (
              <span key={term.id} className="rs-mb-2 text-16 text-digital-red md:text-18 2xl:text-19">
                {(index ? ", " : "") + term.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

export default StanfordPublication
