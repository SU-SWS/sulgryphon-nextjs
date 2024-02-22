import Link from "@/components/patterns/elements/drupal-link";
import {News} from "@/lib/drupal/drupal";
import Image from "next/image";
import {PropsWithoutRef} from "react";
import {buildUrl} from "@/lib/drupal/utils";

interface Props {
  node: News
  h3Heading?: boolean
}

const StanfordNewsCard = ({node, h3Heading, ...props}: PropsWithoutRef<Props>) => {
  const featuredImageUrl = node.su_news_featured_media?.field_media_image?.uri.url
  const bannerImageUrl = node.su_news_banner?.type === 'media--image' && node.su_news_banner?.field_media_image?.uri.url;
  const imageUrl =  featuredImageUrl || bannerImageUrl

  const featuredPlaceholder =  node.su_news_featured_media?.field_media_image?.uri.base64
  const bannerPlaceholder = node.su_news_banner?.type === 'media--image' && node.su_news_banner?.field_media_image?.uri.base64;
  const placeholder = featuredPlaceholder || bannerPlaceholder || undefined

  const HeadingElement = h3Heading ? 'h3' : 'h2';
  return (
    <article {...props} className="flex flex-col">
      {imageUrl &&
        <div className="overflow-hidden aspect-[16/9] relative mb-40" aria-hidden="true">
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
