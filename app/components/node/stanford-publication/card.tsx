import {Publication} from "../../../../src/types/drupal";
import Card from "../../patterns/card";
import Conditional from "../../utils/conditional";
import Link from "next/link";

const StanfordPublicationCard = ({node, ...props}: { node: Publication }) => {
  const topics = node.su_publication_topics?.filter(topic => topic.name?.length > 0) ?? [];
  return (
    <article {...props}>
      <Card
        superHeader={
          <Conditional showWhen={node.su_publication_citation?.citation_type?.label}>
            <div className="su-text-16 md:su-text-18 2xl:su-text-19 su-rs-mb-2">
              {node.su_publication_citation?.citation_type?.label}
            </div>
          </Conditional>
        }
        header={
          <Link className="su-text-black hover:su-underline" href={node.path.alias}>
            {node.title}
          </Link>
        }
        footer={
          <div>
            {topics.map((topic, index) =>
              <span key={topic.id}>
                {(index ? ', ' : '') + topic.name}
              </span>
            )}
          </div>
        }
      />
    </article>
  )
}
export default StanfordPublicationCard;