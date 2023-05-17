import Image from "next/image";

import {DrupalImageMedia, DrupalLink} from "@/lib/drupal/drupal";
import Card from "@/components/patterns/card";
import HorizontalCard from "@/components/patterns/horizontal-card";
import Oembed from "@/components/patterns/oembed";
import {PropsWithoutRef} from "react";

interface Props extends PropsWithoutRef<any> {
  header?: string
  superHeader?: string
  body?: string
  link?: DrupalLink
  linkStyle?: string
  sprinklePosition?: string
  image?: DrupalImageMedia
  videoUrl?: string
  orientation?: string
  fullWidth?: boolean
  className?: string
}

const StanfordCard = ({header, superHeader, body, link, image, videoUrl, linkStyle, sprinklePosition, orientation, fullWidth = true, singleRow = false, ...props}: Props) => {
  const isHorizontal = orientation === 'horizontal';
  const isHorizontalAndSingle = isHorizontal && singleRow;

  const imageUrl = image?.image_style_uri.breakpoint_2xl_2x;
  const imageAlt = image?.resourceIdObjMeta.alt ?? '';
  const placeholder = image?.uri.base64;

  return (
    <div className={"su-relative" + (!isHorizontal ? " su-max-w-[980px] su-w-full su-mx-auto": "") + ((!isHorizontal && fullWidth) ? " su-px-50 xl:su-px-0": "")} {...props}>
      {isHorizontalAndSingle &&
        <HorizontalCard
          video={videoUrl && <Oembed url={videoUrl} className="su-h-full"/>}
          image={imageUrl && <Image
            className="su-object-cover su-object-center"
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
        />
      }

      {!isHorizontalAndSingle &&
        <Card
          video={videoUrl && <Oembed url={videoUrl} className="su-h-full"/>}
          image={imageUrl && <Image
            className="su-object-cover su-object-center"
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
        />
      }
    </div>
  )

}
export default StanfordCard;
