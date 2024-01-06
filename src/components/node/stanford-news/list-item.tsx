import Image from "next/image";
import Link from "@/components/patterns/elements/drupal-link";
import {News} from "@/lib/drupal/drupal";
import {formatDate} from "@/lib/format-date";
import {PropsWithoutRef} from "react";
import {buildUrl} from "@/lib/drupal/utils";

interface Props {
  node: News
  h3Heading?: boolean
}

const StanfordNewsListItem = ({node, h3Heading, ...props}: PropsWithoutRef<Props>) => {
  const HeadingElement = h3Heading ? 'h3' : 'h2';

  const featuredImageUrl = node.su_news_featured_media?.field_media_image?.uri.url
  const bannerImageUrl = node.su_news_banner?.type === 'media--image' && node.su_news_banner?.field_media_image?.uri.url;
  const imageUrl =  featuredImageUrl || bannerImageUrl

  const featuredPlaceholder =  node.su_news_featured_media?.field_media_image?.uri.base64
  const bannerPlaceholder = node.su_news_banner?.type === 'media--image' && node.su_news_banner?.field_media_image?.uri.base64;
  const placeholder = featuredPlaceholder || bannerPlaceholder || undefined

  const topics = node.su_news_topics?.filter(topic => !!topic?.name) || [];
  return (
    <article {...props}>
      <div className="text-18 mb-14">
        {node.su_news_publishing_date && <>{formatDate(node.su_news_publishing_date + ' 12:00:00')}</>}
      </div>
      <div className={"grid gap-2xl " + (imageUrl ? "grid-cols-3-1" : "")}>
        <div>
          <Link className="text-digital-red no-underline hover:underline" href={node.path?.alias ?? "#"}>
            <HeadingElement className="type-2">{node.title}</HeadingElement>
          </Link>
          {node.su_news_dek && <div className="rs-mb-1">{node.su_news_dek}</div>}
        </div>
        {imageUrl &&
          <div className="overflow-hidden aspect-[16/9] relative" aria-hidden="true">
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
      </div>
      {topics.map((cardTopic, index) =>
        <span key={cardTopic.id} className="mt-10 text-digital-red font-semibold text-19">
          {(index ? ', ' : '') + cardTopic.name}
        </span>
      )}
    </article>
  )
}

export default StanfordNewsListItem;