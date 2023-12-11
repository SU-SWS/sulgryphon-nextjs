import Link from "@/components/patterns/elements/drupal-link";
import {News} from "@/lib/drupal/drupal";
import Image from "next/image";
import {PropsWithoutRef} from "react";

interface Props {
  node: News
  h3Heading?: boolean
}

const StanfordNewsCard = ({node, h3Heading, ...props}: PropsWithoutRef<Props>) => {
  const imageUrl = node.su_news_featured_media?.field_media_image?.image_style_uri?.breakpoint_2xl_1x || node.su_news_banner?.field_media_image?.image_style_uri?.breakpoint_2xl_1x
  const placeholder = node.su_news_featured_media?.field_media_image?.uri.base64 || node.su_news_banner?.field_media_image?.uri.base64;
  const HeadingElement = h3Heading ? 'h3' : 'h2';
  return (
    <article {...props} className="flex flex-col">
      {imageUrl &&
        <div className="overflow-hidden aspect-[4/3] relative mb-40" aria-hidden="true">
          <Image
            className="object-cover object-center"
            src={imageUrl}
            alt=""
            fill={true}
            placeholder={placeholder ? 'blur' : 'empty'}
            blurDataURL={placeholder}
          />
        </div>
      }

      <HeadingElement className="text-m2 order-last">
        <Link href={node.path?.alias ?? "#"}
              className="text-black-true hover:text-brick-dark underline hover:no-underline">
          {node.title}
        </Link>
      </HeadingElement>

      {node.su_news_topics?.[0]?.name &&
        <div className="font-semibold mb-20">
          {node.su_news_topics[0].name}
        </div>
      }


    </article>
  )
}
export default StanfordNewsCard;