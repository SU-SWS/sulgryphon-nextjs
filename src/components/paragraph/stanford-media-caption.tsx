import Image from "next/image";
import formatHtml from "@/lib/format-html";
import Oembed from "@/components/patterns/elements/oembed";
import Link from "@/components/patterns/elements/drupal-link";
import {HTMLAttributes} from "react";
import {buildUrl} from "@/lib/drupal/utils";
import {MediaImage, Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal.d";

interface Props extends HTMLAttributes<HTMLElement>{
  image?: Maybe<MediaImage>
  videoUrl?: Maybe<string>
  caption?: Maybe<string>
  link?: Maybe<LinkType>
}

const StanfordMediaCaption = ({caption, image, videoUrl, link, ...props}: Props) => {

  const imageUrl = image?.mediaImage.url;
  const imageAlt = image?.mediaImage.alt || '';

  const linkAttributes: Record<string, string> = {};
  if (link?.attributes?.ariaLabel) linkAttributes['aria-label'] = link.attributes.ariaLabel;

  return (
    <figure className="relative centered" {...props}>
      {imageUrl &&
        <div className="overflow-hidden aspect-[16/9] relative mb-10">
          <Image
            className="object-cover object-center"
            src={buildUrl(imageUrl).toString()}
            alt={imageAlt}
            fill
            sizes="(max-width: 900px) 100vw, 1500px"
          />
        </div>
      }

      {videoUrl &&
        <div className="overflow-hidden aspect-[16/9] relative">
          <Oembed url={videoUrl} className="h-full"/>
        </div>
      }

      {link?.url &&
        <div className='text-right'>
          <Link href={link.url}
                className="hocus:underline transition-colors hover:bg-black-10 focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
                {...linkAttributes}>
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