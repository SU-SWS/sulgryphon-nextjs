import Embed from "react-tiny-oembed";
import Image from "next/image";

import {MediaCaptionParagraph} from "../../types/drupal";
import {DrupalLink} from "@/components/simple/link";
import formatHtml from "@/lib/format-html";

interface StanfordMediaCaptionProps {
  paragraph: MediaCaptionParagraph
  siblingCount?: number
}

export const StanfordMediaCaption = ({paragraph, siblingCount, ...props}: StanfordMediaCaptionProps) => {

  const videoUrl = paragraph.su_media_caption_media?.field_media_oembed_video;
  const imageUrl = paragraph.su_media_caption_media?.field_media_image?.image_style_uri.breakpoint_2xl_2x;

  return (
    <figure className="su-text-right" {...props}>

      {imageUrl &&
          <div className="su-overflow-hidden su-aspect-[16/9] su-relative su-mb-10">
            <Image
                className="su-object-cover su-object-center"
                src={imageUrl}
                alt={paragraph.su_media_caption_media.field_media_image.resourceIdObjMeta.alt}
                fill={true}
            />
          </div>
      }

      {videoUrl &&
          <div className="su-overflow-hidden su-aspect-[16/9] su-relative">
            <Embed url={videoUrl}/>
          </div>
      }

      {paragraph.su_media_caption_link &&
          <DrupalLink href={paragraph.su_media_caption_link.url} className="su-block su-mx-auto">
            {paragraph.su_media_caption_link.title}
          </DrupalLink>
      }

      {paragraph.su_media_caption_caption &&
          <figcaption className="su-float-right su-text-[16px]">
            {formatHtml(paragraph.su_media_caption_caption?.processed)}
          </figcaption>
      }
    </figure>
  )
}