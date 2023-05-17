import Image from "next/image";

import {DrupalImageMedia, DrupalLink} from "@/lib/drupal/drupal";
import formatHtml from "@/lib/format-html";
import Oembed from "@/components/patterns/oembed";
import Link from "next/link";
import {PropsWithoutRef} from "react";

interface Props extends PropsWithoutRef<any> {
  image?: DrupalImageMedia
  videoUrl?: string
  caption?: string
  link?: DrupalLink
  fullWidth?: boolean
}

const StanfordMediaCaption = ({caption, image, videoUrl, link, fullWidth = true, ...props}: Props) => {

  const imageUrl = image?.image_style_uri.breakpoint_2xl_2x;
  const imageAlt = image?.resourceIdObjMeta.alt ?? '';
  const placeholder = image?.uri.base64;

  return (
    <figure className={"su-relative su-max-w-[980px] su-w-full su-mx-auto" + (fullWidth ? " su-px-50 xl:su-px-0": "")} {...props}>
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
        <Link href={link.url} className="su-block su-text-right">
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