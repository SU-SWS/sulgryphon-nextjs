import Image from "next/image";
import Link from "next/link";
import {News} from "@/lib/drupal/drupal";
import {formatDate} from "@/lib/format-date";

const StanfordNewsListItem = ({node, ...props}: { node: News }) => {
  const imageUrl = node.su_news_featured_media?.field_media_image?.image_style_uri?.breakpoint_2xl_1x || node.su_news_banner?.field_media_image?.image_style_uri?.breakpoint_2xl_1x
  const placeholder = node.su_news_featured_media?.field_media_image?.uri.base64 || node.su_news_banner?.field_media_image?.uri.base64;

  const topics = node.su_news_topics?.filter(topic => topic.name?.length > 0) ?? [];
  return (
    <article {...props}>
      <div className="su-text-18 su-mb-14">
        {node.su_news_publishing_date && <>{formatDate(node.su_news_publishing_date + ' 12:00:00')}</>}
      </div>
      <div className={"su-grid su-gap-2xl " + (imageUrl ? "su-grid-cols-3-1" : "")}>
        <div>
          <Link className="su-text-digital-red su-no-underline hover:su-underline" href={node.path?.alias ?? "#"}>
            <h2 className="su-type-2">{node.title}</h2>
          </Link>
          {node.su_news_dek && <div className="su-rs-mb-1">{node.su_news_dek}</div>}
        </div>
        {imageUrl &&
          <div className="su-overflow-hidden su-aspect-[16/9] su-relative" aria-hidden="true">
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
      </div>
      {topics.map((cardTopic, index) =>
        <span key={cardTopic.id} className="su-mt-10 su-text-digital-red su-font-semibold su-text-19">
          {(index ? ', ' : '') + cardTopic.name}
        </span>
      )}
    </article>
  )
}

export default StanfordNewsListItem;