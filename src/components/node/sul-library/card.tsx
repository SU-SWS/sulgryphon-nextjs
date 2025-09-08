import Image from "next/image"
import Link from "@/components/patterns/elements/drupal-link"
import {buildUrl} from "@/lib/drupal/utils"
import {NodeSulLibrary} from "@/lib/gql/__generated__/drupal.d"
import {getFirstText} from "@/lib/text-tools"

interface Props {
  node: NodeSulLibrary
  h3Heading?: boolean
}

const SulLibraryCard = ({node, h3Heading, ...props}: Props) => {
  const HeadingElement = h3Heading ? "h3" : "h2"

  const imageUrl = node.suLibraryContactImg?.mediaImage.url || node.suLibraryBanner?.mediaImage.url

  // Use dedicated page description field, fall back to extracting from paragraphs
  const description = node.suPageDescription || getFirstText(node.suLibraryParagraphs)

  return (
    <article className="shadow-lg" {...props}>
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

      <div className="p-20">
        <HeadingElement className="mb-20 text-24 font-bold">
          <Link
            className="text-cardinal-red underline active:text-digital-red active:no-underline hocus:text-brick-dark hocus:no-underline"
            href={node.path || "#"}
          >
            {node.title}
          </Link>
        </HeadingElement>

        {description && <p>{description}</p>}
      </div>
    </article>
  )
}
export default SulLibraryCard
