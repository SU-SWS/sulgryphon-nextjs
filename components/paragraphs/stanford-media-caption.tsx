import {DrupalImage} from "@/components/simple/image";
import {Oembed} from "@/components/simple/oembed";
import {DrupalLink} from "@/components/simple/link";
import formatHtml from "@/lib/format-html";
import {MediaCaptionParagraph} from "../../types/drupal";

interface StanfordMediaCaptionProps {
  paragraph: MediaCaptionParagraph
  siblingCount?: number
}

export const StanfordMediaCaption = ({paragraph, siblingCount, ...props}: StanfordMediaCaptionProps) => {

  const mediaName = paragraph.su_media_caption_media?.name;
  const videoUrl = paragraph.su_media_caption_media?.field_media_oembed_video;
  const imageUrl = paragraph.su_media_caption_media?.field_media_image?.uri?.url;

  return (
    <figure className="su-text-right" {...props}>

      {imageUrl &&
          <div className="su-overflow-hidden su-aspect-[16/9] su-relative">
              <DrupalImage
                  src={imageUrl}
                  alt={paragraph.su_media_caption_media.field_media_image.resourceIdObjMeta.alt}
                  height={paragraph.su_media_caption_media?.field_media_image?.resourceIdObjMeta?.height ?? '400'}
                  width={paragraph.su_media_caption_media?.field_media_image?.resourceIdObjMeta?.width ?? '800'}
                  layout="responsive"
              />
          </div>
      }

      {videoUrl &&
          <div className="su-overflow-hidden su-aspect-[16/9] su-relative">
              <Oembed className="su-w-full su-h-full" src={videoUrl} title={mediaName}/>
          </div>
      }

      {paragraph.su_media_caption_link &&
          <DrupalLink href={paragraph.su_media_caption_link.url} className="su-block su-mx-auto">
            {paragraph.su_media_caption_link.title}
          </DrupalLink>
      }

      {paragraph.su_media_caption_caption &&
          <figcaption className="">
            {formatHtml(paragraph.su_media_caption_caption?.processed)}
          </figcaption>
      }
    </figure>
  )
}