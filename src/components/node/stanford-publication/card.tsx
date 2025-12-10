import Card from "@/components/patterns/card"
import Link from "@/components/patterns/elements/drupal-link"
import {NodeStanfordPublication} from "@/lib/gql/__generated__/drupal.d"

const StanfordPublicationCard = ({node, ...props}: {node: NodeStanfordPublication}) => {
  const topics = node.suPublicationTopics?.filter(topic => !!topic?.name) || []
  return (
    <article {...props}>
      <Card
        superHeader={
          <div className="rs-mb-2 text-16 md:text-18 2xl:text-19">{node.suPublicationCitation?.__typename}</div>
        }
        header={
          <Link
            className="text-black underline active:text-digital-red active:no-underline hocus:text-brick-dark hocus:no-underline"
            href={node.path || "#"}
          >
            {node.title}
          </Link>
        }
        footer={
          <div>
            {topics.map((topic, index) => (
              <span key={topic.uuid}>{(index ? ", " : "") + topic.name}</span>
            ))}
          </div>
        }
      />
    </article>
  )
}
export default StanfordPublicationCard
