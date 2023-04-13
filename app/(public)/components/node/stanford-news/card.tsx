import Link from "next/link";
import {News} from "@/lib/drupal/drupal";
import Image from "next/image";

const StanfordNewsCard = ({node, ...props}: { node: News }) => {
  const imageUrl = node.su_news_banner?.field_media_image?.image_style_uri?.breakpoint_2xl_1x || node.su_news_featured_media?.field_media_image?.image_style_uri?.breakpoint_2xl_1x
  const placeholder = node.su_news_banner?.field_media_image?.uri.base64 || node.su_news_featured_media?.field_media_image?.uri.base64;

  return (
    <article {...props}>
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

      {node.su_news_topics?.[0]?.name &&
      <div className="su-font-semibold su-mb-20">
        {node.su_news_topics[0].name}
      </div>
      }
      <h2 className="su-text-m2">
        <Link href={node.path.alias} className="su-text-black-true hover:su-text-brick-dark su-underline hover:su-no-underline">
          {node.title}
        </Link>
      </h2>
    </article>
  )
}
export default StanfordNewsCard;