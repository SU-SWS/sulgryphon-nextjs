import {Publication} from "@/lib/drupal/drupal";
import Card from "@/components/patterns/card";
import Conditional from "@/components/utils/conditional";
import Link from "@/components/patterns/elements/drupal-link";

const StanfordPublicationCard = ({node, ...props}: { node: Publication }) => {
  const topics = node.su_publication_topics?.filter(topic => !!topic.name) ?? [];
  return (
    <article {...props}>
      <Card
        superHeader={
          <Conditional showWhen={node.su_publication_citation?.citation_type?.label}>
            <div className="text-16 md:text-18 2xl:text-19 rs-mb-2">
              {node.su_publication_citation?.citation_type?.label}
            </div>
          </Conditional>
        }
        header={
          <Link className="underline hocus:no-underline active:no-underline text-black hocus:text-brick-dark active:text-digital-red" href={node.path?.alias ?? "#"}>
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