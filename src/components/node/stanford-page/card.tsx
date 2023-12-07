import Image from "next/image";
import Link from "@/components/patterns/elements/drupal-link";
import {BasicPage} from "@/lib/drupal/drupal";
import {PropsWithoutRef} from "react";

interface Props {
  node: BasicPage
  h3Heading?: boolean
}

const StanfordPageCard = ({node, h3Heading, ...props}: PropsWithoutRef<Props>) => {
  const HeadingElement = h3Heading ? 'h3' : 'h2';
  const imageUrl = node.su_page_image?.field_media_image?.image_style_uri?.breakpoint_2xl_1x || node.su_page_banner?.su_banner_image?.field_media_image?.image_style_uri?.breakpoint_2xl_1x;
  const placeholder = node.su_page_image?.field_media_image?.uri.base64 || node.su_page_banner?.su_banner_image?.field_media_image?.uri.base64;
  return (
    <article {...props}>
      {imageUrl &&
        <div className="su-overflow-hidden su-aspect-[16/9] su-relative su-mb-30" aria-hidden="true">
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


      <HeadingElement className="su-text-m2 su-mb-20">
        <Link
          className="su-underline hocus:su-no-underline active:su-no-underline su-text-black hocus:su-text-brick-dark active:su-text-digital-red"
          href={node.path?.alias ?? "#"}>
          {node.title}
        </Link>
      </HeadingElement>

      <p>{node.su_page_description}</p>
    </article>
  )
}

export default StanfordPageCard;