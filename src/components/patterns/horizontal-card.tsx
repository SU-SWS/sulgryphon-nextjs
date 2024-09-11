"use client"

import {ReactNodeLike} from "prop-types"
import formatHtml from "@/lib/format-html"
import CardSprinkles from "@/components/patterns/card-sprinkles"
import {ElementType, HTMLAttributes, useRef} from "react"
import FullScreenBackground from "@/components/patterns/full-screen-background"
import Link from "@/components/patterns/elements/drupal-link"
import {Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal.d"
import {twMerge} from "tailwind-merge"

type CardProps = HTMLAttributes<HTMLDivElement> & {
  video?: Maybe<ReactNodeLike>
  image?: Maybe<ReactNodeLike>
  superHeader?: Maybe<any>
  header?: Maybe<any>
  footer?: Maybe<ReactNodeLike>
  body?: Maybe<string>
  link?: Maybe<LinkType>
  backgroundSprinkles?: "top_right" | "top_left" | "bottom_right" | "bottom_left"
  fullWidth?: Maybe<boolean>
  headerId?: string
  headingLevel?: Maybe<ElementType>
  hideHeading?: boolean
}

const HorizontalCard = ({
  headerId,
  video,
  image,
  superHeader,
  header,
  footer,
  body,
  link,
  headingLevel,
  fullWidth = true,
  backgroundSprinkles = "top_right",
  hideHeading,
  ...props
}: CardProps) => {
  const ref = useRef(null)
  const Heading: ElementType = headingLevel || "h2"

  const linkAttributes: Record<string, string> = {}
  if (link?.attributes?.ariaLabel) linkAttributes["aria-label"] = link.attributes.ariaLabel

  if (headerId && link?.attributes?.ariaLabel && link.attributes.ariaLabel === header) {
    linkAttributes["aria-labelledby"] = headerId
    delete linkAttributes["aria-label"]
  }

  return (
    <div className="relative" {...props} ref={ref}>
      {fullWidth && (
        <div className={"absolute left-0 top-0 z-[-10] ml-[calc(-50vw+50%)] h-full w-screen"}>
          <div className="relative h-full w-full bg-black-true" {...props}>
            <CardSprinkles position={backgroundSprinkles} />
          </div>
        </div>
      )}

      {!fullWidth && (
        <FullScreenBackground compareRef={ref} className="relative h-full w-full bg-black-true">
          <CardSprinkles position={backgroundSprinkles} />
        </FullScreenBackground>
      )}

      <div className="basefont-20 centered relative mt-[77px] pb-[7.2rem] pt-[5.8rem] leading-display text-white @container @6xl:mt-0 lg:px-80">
        <div className="grid items-center gap-2xl @6xl:grid-cols-2">
          {(image || video) && (
            <div className="relative mt-[-135px] aspect-[16/9] w-full overflow-hidden @6xl:mt-0">
              {image}
              {video}
            </div>
          )}

          <div className="">
            {superHeader && <span className="type-0 mb-0 font-bold leading-display underline">{superHeader}</span>}

            {header && (
              <Heading id={headerId} className={twMerge("type-4", hideHeading && "sr-only")}>
                {header}
              </Heading>
            )}

            {body && <div>{formatHtml(body)}</div>}

            {footer && <div className="rs-pt-0 text-18 font-normal leading-display text-digital-red">{footer}</div>}

            {link?.url && (
              <Link
                href={link.url}
                className="cta-button group rs-mt-neg1 block w-fit rounded-full border-2 border-digital-red bg-digital-red px-26 pb-11 pt-10 text-16 font-semibold leading-display text-white no-underline transition-colors hocus:bg-black-true hocus:text-white hocus:underline md:text-18"
                {...linkAttributes}
              >
                {link.title}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default HorizontalCard
