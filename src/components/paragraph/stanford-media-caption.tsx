import Image from "next/image";

import {DrupalImageMedia, DrupalLinkType} from "@/lib/drupal/drupal";
import formatHtml from "@/lib/format-html";
import Oembed from "@/components/patterns/elements/oembed";
import Link from "@/components/patterns/elements/drupal-link";
import {PropsWithoutRef} from "react";

interface Props extends PropsWithoutRef<any> {
  image?: DrupalImageMedia
  videoUrl?: string
  caption?: string
  link?: DrupalLinkType
  fullWidth?: boolean
}

const StanfordMediaCaption = ({caption, image, videoUrl, link, fullWidth = true, ...props}: Props) => {

  const imageUrl = image?.image_style_uri.breakpoint_2xl_2x;
  const imageAlt = image?.resourceIdObjMeta.alt ?? '';
  const placeholder = image?.uri.base64;

  return (
    <figure className="relative centered" {...props}>
      {imageUrl &&
        <div className="overflow-hidden aspect-[16/9] relative mb-10">
          <Image
            className="object-cover object-center"
            src={imageUrl}
            alt={imageAlt}
            fill={true}
            placeholder={placeholder ? 'blur' : 'empty'}
            blurDataURL={placeholder}
          />
        </div>
      }

      {videoUrl &&
        <div className="overflow-hidden aspect-[16/9] relative">
          <Oembed url={videoUrl} className="h-full"/>
        </div>
      }

      {link &&
        <Link href={link.url} className="block text-right" {...link.options?.attributes}>
          {link.title}
        </Link>
      }

      {caption &&
        <figcaption className="text-right float-right text-19 leading">
          {formatHtml(caption)}
        </figcaption>
      }
    </figure>
  )
}
export default StanfordMediaCaption;