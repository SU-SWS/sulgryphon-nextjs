import Image from "next/image";

import {DrupalImageMedia, DrupalLinkType} from "@/lib/drupal/drupal";
import Card from "@/components/patterns/card";
import HorizontalCard from "@/components/patterns/horizontal-card";
import Oembed from "@/components/patterns/elements/oembed";
import {PropsWithoutRef} from "react";

interface Props extends PropsWithoutRef<any> {
  header?: string
  superHeader?: string
  body?: string
  link?: DrupalLinkType
  linkStyle?: string
  sprinklePosition: "top_right" | "top_left" | "bottom_right" | "bottom_left"
  image?: DrupalImageMedia
  videoUrl?: string
  orientation?: string
  fullWidth?: boolean
  className?: string
  headerId?: string
}

const StanfordCard = ({headerId, header, superHeader, body, link, image, videoUrl, linkStyle, sprinklePosition, orientation, fullWidth = true, singleRow = false, ...props}: Props) => {
  const isHorizontal = orientation === 'horizontal';

  const imageUrl = image?.image_style_uri.breakpoint_2xl_2x;
  const imageAlt = image?.resourceIdObjMeta.alt ?? '';
  const placeholder = image?.uri.base64;



  if (headerId && link?.options?.attributes?.['aria-label'] && link?.options?.attributes?.['aria-label'] === header) {
    link.options.attributes['aria-labelledby'] = headerId;
    delete link?.options?.attributes?.['aria-label'];
  }

  return (
    <div className={"relative" + (!isHorizontal ? " centered lg:max-w-[980px] w-full mx-auto": "")} {...props}>
      {isHorizontal &&
        <HorizontalCard
          video={videoUrl && <Oembed url={videoUrl} className="h-full"/>}
          image={imageUrl && <Image
            className="object-cover object-center"
            src={imageUrl}
            alt={imageAlt}
            fill={true}
            placeholder={placeholder ? 'blur' : 'empty'}
            blurDataURL={placeholder}
          />}
          header={header}
          superHeader={superHeader}
          body={body}
          link={link}
          linkStyle={linkStyle}
          backgroundSprinkles={sprinklePosition}
          fullWidth={singleRow && fullWidth}
          headerId={headerId}
        />
      }

      {!isHorizontal &&
        <Card
          video={videoUrl && <Oembed url={videoUrl} className="h-full"/>}
          image={imageUrl && <Image
            className="object-cover object-center"
            src={imageUrl}
            alt={imageAlt}
            fill={true}
            placeholder={placeholder ? 'blur' : 'empty'}
            blurDataURL={placeholder}
          />}
          header={header}
          superHeader={superHeader}
          body={body}
          link={link}
          linkStyle={linkStyle}
          headerId={headerId}
        />
      }
    </div>
  )

}
export default StanfordCard;
