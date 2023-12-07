import "server-only";

import {Publication, StanfordParagraph} from "@/lib/drupal/drupal";
import Conditional from "@/components/utils/conditional";
import {ParagraphRows} from "@/components/paragraph/rows/rows";
import {DrupalLinkButton} from "@/components/patterns/link";
import fetchComponents from "@/lib/fetch-components";

const StanfordPublication = async ({node, ...props}: { node: Publication }) => {

  node.su_publication_components = await fetchComponents<StanfordParagraph>(node.su_publication_components ?? []);
  node.su_publication_components = node.su_publication_components.filter(item => item?.id?.length > 0);

  const getMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {month: 'long'});
  };

  return (
    <article {...props}>
      <Conditional showWhen={node.su_publication_citation?.citation_type?.label}>
        <div className="text-16 md:text-18 2xl:text-19 rs-mb-2">
          {node.su_publication_citation?.citation_type?.label}
        </div>
      </Conditional>

      <div className="lg:grid grid-cols-6 gap-[40px] rs-mb-7">
        <Conditional showWhen={node.su_publication_components.length > 0}>
          <div className="col-span-4">
            <div className="rs-mb-7 lg:w-11/12 ">
              <ParagraphRows items={node.su_publication_components}/>
            </div>
          </div>
        </Conditional>

        <div className="col-span-2">
          <div className="lg:rs-pl-3 lg:border-l border-black-10">
            {(node.su_publication_citation?.su_author && node.su_publication_citation?.su_author.length > 0) &&
                <div className="rs-mb-2">
                  <h2 className="text-16 md:text-18 2xl:text-19 mb-01em">Author(s)</h2>
                  <div>
                    {node.su_publication_citation?.su_author.map((author, index) =>
                      <div key={`citation-author-${index}`} className="text-16 md:text-18 2xl:text-19">
                        {author.given} {author.family}
                      </div>
                    )}
                  </div>
                </div>
            }

            <Conditional showWhen={node.su_publication_citation?.su_publisher}>
              <div className="rs-mb-2">
                <h2 className="text-16 md:text-18 2xl:text-19 mb-01em">Publisher</h2>
                <div className="text-16 md:text-18 2xl:text-19">
                  {node.su_publication_citation?.su_publisher}
                </div>
              </div>
            </Conditional>

            <Conditional showWhen={node.su_publication_citation?.su_journal_publisher}>
              <div className="rs-mb-2">
                <h2 className="text-16 md:text-18 2xl:text-19 mb-01em">Journal Name</h2>
                <div className="text-16 md:text-18 2xl:text-19">
                  {node.su_publication_citation?.su_journal_publisher}
                </div>
              </div>
            </Conditional>

            <Conditional showWhen={node.su_publication_citation?.su_year}>
              <div className="rs-mb-2">
                <h2 className="text-16 md:text-18 2xl:text-19 mb-01em">Publication Date</h2>
                {(node.su_publication_citation?.su_month && node.su_publication_citation?.su_day) &&
                  <div className="text-16 md:text-18 2xl:text-19">
                    {getMonthName(node.su_publication_citation?.su_month)} {node.su_publication_citation?.su_day}, {node.su_publication_citation?.su_year}
                  </div>
                }
                <Conditional showWhen={node.su_publication_citation?.su_month && !node.su_publication_citation?.su_day}>
                  {node.su_publication_citation?.su_month}, {node.su_publication_citation?.su_year}
                </Conditional>
                <Conditional
                  showWhen={!node.su_publication_citation?.su_month && !node.su_publication_citation?.su_day}>
                  {node.su_publication_citation?.su_year}
                </Conditional>
              </div>
            </Conditional>

            <Conditional showWhen={node.su_publication_citation?.su_genre}>
              <div className="rs-mb-2">
                <h2 className="text-16 md:text-18 2xl:text-19 mb-01em">Type of Dissertation</h2>
                <div className="text-16 md:text-18 2xl:text-19">
                  {node.su_publication_citation?.su_genre}
                </div>
              </div>
            </Conditional>

            <Conditional showWhen={node.su_publication_citation?.su_doi}>
              <div className="rs-mb-2">
                <h2 className="text-16 md:text-18 2xl:text-19 mb-01em">DOI</h2>
                <div className="text-16 md:text-18 2xl:text-19">
                  {node.su_publication_citation?.su_doi}
                </div>
              </div>
            </Conditional>
          </div>

          {node.su_publication_cta &&
              <div className="lg:rs-pl-3 rs-pt-2">
                <DrupalLinkButton href={node.su_publication_cta.url}>{node.su_publication_cta.title}</DrupalLinkButton>
              </div>
          }
        </div>
      </div>

      <Conditional showWhen={node.su_publication_topics && node.su_publication_topics.length > 0}>
        <div className="border-t border-black-10">
          <h2 className="text-16 md:text-18 2xl:text-19 font-bold rs-pt-0">Related Topics</h2>
          <div className="text-16 md:text-18 2xl:text-19 rs-mb-2">
            {node.su_publication_topics && node.su_publication_topics.map((term, index) =>
              <span key={term.id}
                    className="text-digital-red text-16 md:text-18 2xl:text-19 rs-mb-2">{(index ? ', ' : '') + term.name}</span>
            )}
          </div>
        </div>
      </Conditional>
    </article>
  )
}

export default StanfordPublication;