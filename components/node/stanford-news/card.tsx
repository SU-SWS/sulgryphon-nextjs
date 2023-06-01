import Link from "next/link";
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
    <article {...props} className="su-flex su-flex-col">
      {imageUrl &&
        <div className="su-overflow-hidden su-aspect-[4/3] su-relative su-mb-40" aria-hidden="true">
          <Image
            className="su-object-cover su-object-center"
            src={imageUrl}
            alt=""
            fill={true}
            placeholder={placeholder ? 'blur' : 'empty'}
            blurDataURL={placeholder}
          />
        </div>
      }

      <HeadingElement className="su-text-m2 su-order-last">
        <Link href={node.path?.alias ?? "#"}
              className="su-text-black-true hover:su-text-brick-dark su-underline hover:su-no-underline">
          {node.title}
        </Link>
      </HeadingElement>

      {node.su_news_topics?.[0]?.name &&
        <div className="su-font-semibold su-mb-20">
          {node.su_news_topics[0].name}
        </div>
      }


    </article>
  )
}
export default StanfordNewsCard;