import Image from "next/image"
import Link from "@/components/patterns/elements/drupal-link"
import {formatDate} from "@/lib/format-date"
import {buildUrl} from "@/lib/drupal/utils"
import {NodeStanfordNews} from "@/lib/gql/__generated__/drupal.d"

interface Props {
  node: NodeStanfordNews
  h3Heading?: boolean
}

const StanfordNewsListItem = ({node, h3Heading, ...props}: Props) => {
  const HeadingElement = h3Heading ? "h3" : "h2"

  const featuredImageUrl = node.suNewsFeaturedMedia?.mediaImage.url
  const bannerImageUrl = node.suNewsBanner?.__typename === "MediaImage" && node.suNewsBanner.mediaImage.url
  const imageUrl = featuredImageUrl || bannerImageUrl

  const goToUrl = node.suNewsSource?.url || node.path || "#"
  return (
    <article {...props}>
      <div className="mb-14 text-18">
        {node.suNewsPublishingDate && <>{formatDate(node.suNewsPublishingDate.time)}</>}
      </div>
      <div className={"grid gap-2xl " + (imageUrl ? "grid-cols-3-1" : "")}>
        <div>
          <Link className="text-digital-red no-underline hover:underline" href={goToUrl}>
            <HeadingElement className="type-2">{node.title}</HeadingElement>
          </Link>
          {node.suNewsDek && <div className="rs-mb-1">{node.suNewsDek}</div>}
        </div>
        {imageUrl && (
          <div className="relative aspect-[16/9] overflow-hidden" aria-hidden="true">
            <Image
              className="object-cover object-center"
              src={buildUrl(imageUrl).toString()}
              alt=""
              fill
              sizes="(max-width: 1700px) 100vw, 1500px"
            />
          </div>
        )}
      </div>
      {node.suNewsTopics?.map((cardTopic, index) => (
        <span key={cardTopic.id} className="mt-10 text-19 font-semibold text-digital-red">
          {(index ? ", " : "") + cardTopic.name}
        </span>
      ))}
    </article>
  )
}

export default StanfordNewsListItem
