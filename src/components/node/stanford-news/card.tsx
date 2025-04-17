import Link from "@/components/patterns/elements/drupal-link"
import Image from "next/image"
import {buildUrl} from "@/lib/drupal/utils"
import {NodeStanfordNews} from "@/lib/gql/__generated__/drupal.d"
import {formatDate} from "@/lib/format-date"

interface Props {
  node: NodeStanfordNews
  h3Heading?: boolean
}

const StanfordNewsCard = ({node, h3Heading, ...props}: Props) => {
  const goToUrl = node.suNewsSource?.url || node.path || "#"
  const featuredImageUrl = node.suNewsFeaturedMedia?.mediaImage.url
  const bannerImageUrl = node.suNewsBanner?.__typename === "MediaImage" && node.suNewsBanner.mediaImage.url
  const imageUrl = featuredImageUrl || bannerImageUrl

  const HeadingElement = h3Heading ? "h3" : "h2"
  return (
    <article {...props}>
      {imageUrl && (
        <div className="relative mb-10 aspect-[16/9] overflow-hidden" aria-hidden="true">
          <Image
            className="object-cover object-center"
            src={buildUrl(imageUrl).toString()}
            alt=""
            fill
            sizes="(max-width: 1700px) 100vw, 1500px"
          />
        </div>
      )}

      <div className="flex flex-col">
        <HeadingElement className="mb-0 text-18 font-bold sm:text-20">
          <Link href={goToUrl} className="text-black-true underline hover:text-brick-dark hover:no-underline">
            {node.title}
          </Link>
        </HeadingElement>

        {node.suNewsTopics?.[0]?.name && (
          <div className="order-first mb-0 text-16 font-semibold sm:text-18">{node.suNewsTopics[0].name}</div>
        )}
      </div>

      {node.suNewsPublishingDate && (
        <div className="text-16 sm:text-18">{formatDate(node.suNewsPublishingDate.time)}</div>
      )}
    </article>
  )
}
export default StanfordNewsCard
