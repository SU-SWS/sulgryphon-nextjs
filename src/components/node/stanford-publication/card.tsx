
import Card from "@/components/patterns/card";
import Link from "@/components/patterns/elements/drupal-link";
import {NodeStanfordPublication} from "@/lib/gql/__generated__/drupal.d";

const StanfordPublicationCard = ({node, ...props}: { node: NodeStanfordPublication }) => {
  const topics = node.suPublicationTopics?.filter(topic => !!topic?.name) || [];
  return (
    <article {...props}>
      <Card
        superHeader={
            <div className="text-16 md:text-18 2xl:text-19 rs-mb-2">
              {node.suPublicationCitation?.__typename}
            </div>
        }
        header={
          <Link className="underline hocus:no-underline active:no-underline text-black hocus:text-brick-dark active:text-digital-red" href={node.path}>
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