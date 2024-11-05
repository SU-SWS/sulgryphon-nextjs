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
  sprinklePosition?: "top_right" | "top_left" | "bottom_right" | "bottom_left"
  image?: Maybe<MediaImage>
  videoUrl?: Maybe<string>
  orientation?: Maybe<string>
  fullWidth?: Maybe<boolean>
  headerId?: string
  singleRow?: Maybe<boolean>
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
  videoUrl,
  linkStyle,
  sprinklePosition,
  orientation,
  headingTag = "h2",
  fullWidth = true,
  singleRow = false,
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
      className={twMerge("relative", !isHorizontal ? "centered mx-auto w-full lg:max-w-[980px]" : "p-0 md:rs-pt-5")}
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
          header={header}
          superHeader={superHeader}
          body={body}
          link={link}
          backgroundSprinkles={sprinklePosition}
          fullWidth={singleRow && fullWidth}
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
