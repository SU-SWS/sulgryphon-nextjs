import Image from "next/image";
import Link from "@/components/patterns/elements/drupal-link";
import {BasicPage} from "@/lib/drupal/drupal";
import {PropsWithoutRef} from "react";
import {buildUrl} from "@/lib/drupal/utils";

interface Props {
  node: BasicPage
  h3Heading?: boolean
}

const StanfordPageCard = ({node, h3Heading, ...props}: PropsWithoutRef<Props>) => {
  const HeadingElement = h3Heading ? 'h3' : 'h2';

  const imageUrl = node.su_page_image?.field_media_image.uri.url || node.su_page_banner?.su_banner_image?.field_media_image.uri.url;
  const placeholder = node.su_page_image?.field_media_image?.uri.base64 || node.su_page_banner?.su_banner_image?.field_media_image?.uri.base64;
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
            placeholder={placeholder ? 'blur' : 'empty'}
            blurDataURL={placeholder}
          />
        </div>
      }


      <HeadingElement className="text-m2 mb-20">
        <Link
          className="underline hocus:no-underline active:no-underline text-black hocus:text-brick-dark active:text-digital-red"
          href={node.path?.alias ?? "#"}>
          {node.title}
        </Link>
      </HeadingElement>

      <p>{node.su_page_description}</p>
    </article>
  )
}

export default StanfordPageCard;