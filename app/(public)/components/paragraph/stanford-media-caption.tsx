import Image from "next/image";

import {MediaCaptionParagraph} from "@/lib/drupal/drupal";
import formatHtml from "@/lib/format-html";
import Oembed from "../patterns/oembed";
import Link from "next/link";

interface StanfordMediaCaptionProps {
  paragraph: MediaCaptionParagraph
  siblingCount?: number
}

const StanfordMediaCaption = ({paragraph, siblingCount, ...props}: StanfordMediaCaptionProps) => {

  const videoUrl = paragraph.su_media_caption_media?.field_media_oembed_video;
  const imageUrl = paragraph.su_media_caption_media?.field_media_image?.image_style_uri.breakpoint_2xl_2x;
  const imageAlt = paragraph.su_media_caption_media?.field_media_image?.resourceIdObjMeta.alt ?? '';
  const placeholder = paragraph.su_media_caption_media?.field_media_image?.uri.base64;

  return (
    <figure {...props}>
      {imageUrl &&
        <div className="su-overflow-hidden su-aspect-[16/9] su-relative su-mb-10">
          <Image
            className="su-object-cover su-object-center"
            src={imageUrl}
            alt={imageAlt}
            fill={true}
            placeholder={placeholder ? 'blur' : 'empty'}
            blurDataURL={placeholder}
          />
        </div>
      }

      {videoUrl &&
        <div className="su-overflow-hidden su-aspect-[16/9] su-relative">
          <Oembed url={videoUrl} className="su-h-full"/>
        </div>
      }

      {paragraph.su_media_caption_link &&
        <Link href={paragraph.su_media_caption_link.url} className="su-block su-mx-auto">
          {paragraph.su_media_caption_link.title}
        </Link>
      }

      {paragraph.su_media_caption_caption &&
        <figcaption className="su-text-right su-float-right su-text-19 su-leading">
          {formatHtml(paragraph.su_media_caption_caption?.processed)}
        </figcaption>
      }
    </figure>
  )
}
export default StanfordMediaCaption;