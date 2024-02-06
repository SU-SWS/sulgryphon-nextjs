import Image from "next/image";

import {DrupalImageMedia, DrupalLinkType} from "@/lib/drupal/drupal";
import formatHtml from "@/lib/format-html";
import Oembed from "@/components/patterns/elements/oembed";
import Link from "@/components/patterns/elements/drupal-link";
import {HTMLAttributes} from "react";
import {buildUrl} from "@/lib/drupal/utils";

interface Props extends HTMLAttributes<HTMLDivElement>{
  image?: DrupalImageMedia
  videoUrl?: string
  caption?: string
  link?: DrupalLinkType
}

const StanfordMediaCaption = ({caption, image, videoUrl, link, ...props}: Props) => {

  const imageUrl = image?.uri.url;
  const imageAlt = image?.resourceIdObjMeta.alt ?? '';
  const placeholder = image?.uri.base64;

  return (
    <figure className="relative centered" {...props}>
      {imageUrl &&
        <div className="overflow-hidden aspect-[16/9] relative mb-10">
          <Image
            className="object-cover object-center"
            src={buildUrl(imageUrl).toString()}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px"
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
          <div className='text-right'>
            <Link href={link.url}
                  className="hocus:underline transition-colors hover:bg-black-10 focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
                  {...link.options?.attributes}>
              {link.title}
            </Link>
          </div>
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
