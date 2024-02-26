import Image from "next/image";

import Card from "@/components/patterns/card";
import HorizontalCard from "@/components/patterns/horizontal-card";
import Oembed from "@/components/patterns/elements/oembed";
import {buildUrl} from "@/lib/drupal/utils";
import {MediaImage, Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal.d";
import {HTMLAttributes} from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  header?: Maybe<string>
  superHeader?: Maybe<string>
  body?: Maybe<string>
  link?: Maybe<LinkType>
  linkStyle?: Maybe<string>
  sprinklePosition?: "top_right" | "top_left" | "bottom_right" | "bottom_left"
  image?: Maybe<MediaImage>
  videoUrl?: Maybe<string>
  orientation?: Maybe<string>
  fullWidth?: Maybe<boolean>
  headerId?: string
  singleRow?: Maybe<boolean>
}

const StanfordCard = ({headerId, header, superHeader, body, link, image, videoUrl, linkStyle, sprinklePosition, orientation, fullWidth = true, singleRow = false, ...props}: Props) => {
  const isHorizontal = orientation === 'horizontal';

  const imageUrl = image?.mediaImage.url;
  const imageAlt = image?.mediaImage.alt || '';

  if (headerId && link?.attributes?.ariaLabel && link?.attributes?.ariaLabel === header) {
    link.attributes.ariaLabelledBy = headerId;
    delete link.attributes.ariaLabel
  }

  return (
    <div className={"relative" + (!isHorizontal ? " centered lg:max-w-[980px] w-full mx-auto": "")} {...props}>
      {isHorizontal &&
        <HorizontalCard
          video={videoUrl && <Oembed url={videoUrl} className="h-full"/>}
          image={imageUrl && <Image
            className="object-cover object-center"
            src={buildUrl(imageUrl).toString()}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px"
          />}
          header={header}
          superHeader={superHeader}
          body={body}
          link={link}
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
            src={buildUrl(imageUrl).toString()}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px"
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
