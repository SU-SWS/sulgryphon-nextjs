import Link from "@/components/patterns/elements/drupal-link"
import Image from "next/image"
import {buildUrl} from "@/lib/drupal/utils"
import {NodeStanfordNews} from "@/lib/gql/__generated__/drupal.d"

interface Props {
  node: NodeStanfordNews
  h3Heading?: boolean
}

const StanfordNewsCard = ({node, h3Heading, ...props}: Props) => {
  const goToUrl = node.suNewsSource?.url || node.path
  const featuredImageUrl = node.suNewsFeaturedMedia?.mediaImage.url
  const bannerImageUrl = node.suNewsBanner?.__typename === "MediaImage" && node.suNewsBanner.mediaImage.url
  const imageUrl = featuredImageUrl || bannerImageUrl

  const HeadingElement = h3Heading ? "h3" : "h2"
  return (
    <article {...props} className="flex flex-col">
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

      <HeadingElement className="type-0 order-last leading-cozy">
        <Link href={goToUrl} className="text-black-true underline hover:text-brick-dark hover:no-underline">
          {node.title}
        </Link>
      </HeadingElement>

      {node.suNewsTopics?.[0]?.name && <div className="mb-10 font-semibold">{node.suNewsTopics[0].name}</div>}
    </article>
  )
}
export default StanfordNewsCard
