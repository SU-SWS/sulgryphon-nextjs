"use client"
import Image from "next/image"
import {ReactNodeLike} from "prop-types"
import formatHtml from "@/lib/format-html"
import {ElementType, HTMLAttributes, useRef} from "react"
import Link from "@/components/patterns/elements/drupal-link"
import {Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal.d"
import {twMerge} from "tailwind-merge"

type CardProps = HTMLAttributes<HTMLDivElement> & {
  video?: Maybe<ReactNodeLike>
  image?: Maybe<ReactNodeLike>
  caption?: Maybe<string>
  cardBgColor?: Maybe<string> // @TODO TBD BASED ON BACKEND
  superHeader?: Maybe<string>
  header?: Maybe<string>
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
  caption,
  cardBgColor, // @TODO TBD BASED ON BACKEND
  superHeader,
  header,
  footer,
  body,
  link,
  headingLevel,
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

  let bgColor = "bg-cardinal-red"
  let btnColor = "bg-white text-cardinal-red hocus:bg-black-true hocus:text-white border-white"

  switch (cardBgColor) {
    case "fog-light":
      bgColor = "bg-fog-light"
      btnColor = "bg-cardinal-red text-white border-cardinal-red hocus:bg-black-true hocus:text-white"
      break
  }

  return (
    <div {...props} ref={ref} className={twMerge("relative", bgColor, props.className)}>
      <div className="rs-mt-5 rs-py-5 centered relative w-full leading-display text-white @container @6xl:mt-0 xl:px-0">
        <div className="grid items-center gap-2xl @6xl:grid-cols-2 md:gap-[8.8rem]">
          {(image || video) && (
            <div className="relative h-fit w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                {image}
                {video}
              </div>
              {caption && (
                <div className="absolute bottom-0 z-10 w-full bg-black bg-opacity-80 p-10">
                  <div className="mx-auto w-fit text-16 font-medium leading-normal text-white">
                    Image Caption{caption}
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <div className="mb-16 flex flex-row items-center gap-16">
              <Image src="/card-rosette.png" alt="" className="object-contain" height={80} width={80} />
              <div>
                {superHeader && <span className="type-0 mb-0 font-bold leading-display underline">{superHeader}</span>}

                {header && (
                  <Heading id={headerId} className={twMerge("text-32 mb-0", hideHeading && "sr-only")}>
                    {header}
                  </Heading>
                )}
              </div>
            </div>

            {body && <div className="[&_p]:text-20">{formatHtml(body)}</div>}

            {footer && <div className="rs-pt-0 text-18 font-normal leading-display text-digital-red">{footer}</div>}

            {link?.url && (
              <Link
                href={link.url}
                className={twMerge(
                  "cta-button group mt-32 block w-fit rounded-full border-2 px-26 pb-11 pt-10 text-16 font-semibold leading-display text-white no-underline transition-colors hocus:underline md:text-18",
                  btnColor
                )}
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
