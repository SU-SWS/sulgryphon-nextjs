import Image from "next/image"

import Card from "@/components/patterns/card"
import HorizontalCard from "@/components/patterns/horizontal-card"
import Oembed from "@/components/patterns/elements/oembed"
import {buildUrl} from "@/lib/drupal/utils"
import {MediaImage, Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal.d"
import {ElementType, HTMLAttributes} from "react"
import {twMerge} from "tailwind-merge"

type Props = HTMLAttributes<HTMLDivElement> & {
  header?: Maybe<string>
  superHeader?: Maybe<string>
  body?: Maybe<string>
  link?: Maybe<LinkType>
  linkStyle?: Maybe<string>
  cardBgColor?: "fog_light" | "cardinal_red"
  image?: Maybe<MediaImage>
  caption?: Maybe<string>
  videoUrl?: Maybe<string>
  orientation?: Maybe<string>
  headerId?: string
  headingTag?: ElementType
  hideHeading?: boolean
}

const StanfordCard = ({
  headerId,
  header,
  superHeader,
  body,
  link,
  image,
  caption,
  videoUrl,
  linkStyle,
  cardBgColor,
  orientation,
  headingTag = "h2",
  hideHeading,
  ...props
}: Props) => {
  const isHorizontal = orientation === "horizontal"

  const imageUrl = image?.mediaImage.url
  const imageAlt = image?.mediaImage.alt || ""

  if (headerId && link?.attributes?.ariaLabel && link?.attributes?.ariaLabel === header) {
    link.attributes.ariaLabelledBy = headerId
    delete link.attributes.ariaLabel
  }

  return (
    <div
      className={twMerge(
        "relative",
        !isHorizontal ? "centered mx-auto w-full lg:max-w-[980px]" : "p-0 md:rs-pt-5 lg:p-0"
      )}
      {...props}
    >
      {isHorizontal && (
        <HorizontalCard
          video={videoUrl && <Oembed url={videoUrl} className="h-full" />}
          image={
            imageUrl && (
              <Image
                className="object-cover object-center"
                src={buildUrl(imageUrl).toString()}
                alt={imageAlt}
                fill
                sizes="(max-width: 1700px) 100vw, 1500px"
              />
            )
          }
          caption={caption}
          header={header}
          superHeader={superHeader}
          body={body}
          link={link}
          cardBgColor={cardBgColor}
          headerId={headerId}
          headingLevel={headingTag}
          hideHeading={hideHeading}
        />
      )}

      {!isHorizontal && (
        <Card
          video={videoUrl && <Oembed url={videoUrl} className="h-full" />}
          image={
            imageUrl && (
              <Image
                className="object-cover object-center"
                src={buildUrl(imageUrl).toString()}
                alt={imageAlt}
                fill
                sizes="(max-width: 1700px) 100vw, 1500px"
              />
            )
          }
          caption={caption}
          header={header}
          superHeader={superHeader}
          body={body}
          link={link}
          linkStyle={linkStyle}
          headerId={headerId}
          headingLevel={headingTag}
          hideHeading={hideHeading}
        />
      )}
    </div>
  )
}
export default StanfordCard
