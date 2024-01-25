import Image from "next/image";
import Link from "@/components/patterns/elements/drupal-link";
import {buildUrl} from "@/lib/drupal/utils";
import {NodeStanfordPage} from "@/lib/gql/__generated__/drupal";

interface Props {
  node: NodeStanfordPage
  h3Heading?: boolean
}

const StanfordPageCard = ({node, h3Heading, ...props}: Props) => {
  const HeadingElement = h3Heading ? 'h3' : 'h2';

  const imageUrl = node.suPageImage?.mediaImage.url || node.suPageBanner?.suBannerImage?.mediaImage.url

  return (
    <article {...props}>
      {imageUrl &&
        <div className="overflow-hidden aspect-[16/9] relative mb-30" aria-hidden="true">
          <Image
            className="object-cover object-center"
            src={buildUrl(imageUrl).toString()}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px"
          />
        </div>
      }


      <HeadingElement className="text-m2 mb-20">
        <Link
          className="underline hocus:no-underline active:no-underline text-black hocus:text-brick-dark active:text-digital-red"
          href={node.path}>
          {node.title}
        </Link>
      </HeadingElement>

      <p>{node.suPageDescription}</p>
    </article>
  )
}

export default StanfordPageCard;