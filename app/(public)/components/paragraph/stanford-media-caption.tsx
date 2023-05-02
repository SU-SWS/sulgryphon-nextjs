import Image from "next/image";

import {DrupalImageMedia, DrupalLink} from "@/lib/drupal/drupal";
import formatHtml from "@/lib/format-html";
import Oembed from "@/components/patterns/oembed";
import Link from "next/link";
import {PropsWithoutRef} from "react";

interface Props extends PropsWithoutRef<any>{
  image?: DrupalImageMedia
  videoUrl?: string
  caption?: string
  link?: DrupalLink
  siblingCount?: number
}

const StanfordMediaCaption = ({caption, image, videoUrl, link, siblingCount, ...props}: Props) => {

  const imageUrl = image?.image_style_uri.breakpoint_2xl_2x;
  const imageAlt = image?.resourceIdObjMeta.alt ?? '';
  const placeholder = image?.uri.base64;

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

      {link &&
        <Link href={link.url} className="su-block su-mx-auto">
          {link.title}
        </Link>
      }

      {caption &&
        <figcaption className="su-text-right su-float-right su-text-19 su-leading">
          {formatHtml(caption)}
        </figcaption>
      }
    </figure>
  )
}
export default StanfordMediaCaption;