import Image from "next/image"
import Link from "@/components/patterns/elements/drupal-link"
import {buildUrl} from "@/lib/drupal/utils"
import {NodeStanfordPage} from "@/lib/gql/__generated__/drupal.d"

interface Props {
  node: NodeStanfordPage
  h3Heading?: boolean
}

const StanfordPageCard = ({node, h3Heading, ...props}: Props) => {
  const HeadingElement = h3Heading ? "h3" : "h2"

  const imageUrl = node.suPageImage?.mediaImage.url || node.suPageBanner?.suBannerImage?.mediaImage.url

  return (
    <article {...props}>
      {imageUrl && (
        <div className="relative mb-30 aspect-[16/9] overflow-hidden" aria-hidden="true">
          <Image
            className="object-cover object-center"
            src={buildUrl(imageUrl).toString()}
            alt=""
            fill
            sizes="(max-width: 1700px) 100vw, 1500px"
          />
        </div>
      )}

      <HeadingElement className="type-2 mb-20">
        <Link
          className="text-black underline active:text-digital-red active:no-underline hocus:text-brick-dark hocus:no-underline"
          href={node.path}
        >
          {node.title}
        </Link>
      </HeadingElement>

      <p>{node.suPageDescription}</p>
    </article>
  )
}

export default StanfordPageCard
