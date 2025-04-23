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
  cardBgColor?: "fog_light" | "cardinal_red" // @TODO TBD BASED ON BACKEND
  superHeader?: Maybe<string>
  header?: Maybe<string>
  footer?: Maybe<ReactNodeLike>
  body?: Maybe<string>
  link?: Maybe<LinkType>
  headerId?: string
  headingLevel?: Maybe<ElementType>
  hideHeading?: boolean
}

const HorizontalCard = ({
  headerId,
  video,
  image,
  caption,
  cardBgColor,
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

  let headingTypography = "text-32 m,d:text-36 lg:text-40"
  switch (headingLevel) {
    case "h3":
      headingTypography = "text-26 md:text-28 lg:text-32"
      break
    case "h4":
      headingTypography = "text-20"
      break
  }

  const linkAttributes: Record<string, string> = {}
  if (link?.attributes?.ariaLabel) linkAttributes["aria-label"] = link.attributes.ariaLabel

  if (headerId && link?.attributes?.ariaLabel && link.attributes.ariaLabel === header) {
    linkAttributes["aria-labelledby"] = headerId
    delete linkAttributes["aria-label"]
  }
  let bgColor = "bg-fog-light text-black-true"
  let btnColor = "bg-cardinal-red text-white border-cardinal-red hocus:bg-black-true hocus:text-white"
  let linkColor = ""

  switch (cardBgColor) {
    case "cardinal_red":
      bgColor = "bg-cardinal-red text-white"
      btnColor = "bg-white text-cardinal-red hocus:bg-black-true hocus:text-white border-white"
      linkColor = "[&_a]:text-white hocus:[&_a]:text-black-true"
      break
  }

  return (
    <div {...props} ref={ref} className={twMerge("relative", bgColor, props.className)}>
      <div className="rs-p-5 relative w-full leading-display @container @6xl:centered lg:px-80">
        <div className="grid items-center gap-2xl @6xl:grid-cols-2 @10xl:gap-[8.8rem]">
          {(image || video) && (
            <div className="relative h-fit w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                {image}
                {video}
              </div>
              {caption && (
                <div className="absolute bottom-0 z-10 w-full bg-black bg-opacity-80 p-10">
                  <div className="text-16 font-medium leading-normal text-white">{caption}</div>
                </div>
              )}
            </div>
          )}

          <div>
            <div className="mb-16 flex flex-row items-center gap-16">
              <Image src="/card-rosette.png" alt="" className="object-contain" height={80} width={80} />
              <div>
                {superHeader && (
                  <span className="mb-0 text-20 font-semibold uppercase leading-display">{superHeader}</span>
                )}

                {header && (
                  <Heading id={headerId} className={twMerge("mb-0", headingTypography, hideHeading && "sr-only")}>
                    {header}
                  </Heading>
                )}
              </div>
            </div>
            <div className="m-0 @10xl:rs-ml-2">
              {body && <div className={twMerge("[&_p]:text-20", linkColor)}>{formatHtml(body)}</div>}

              {footer && <div className="rs-pt-0 text-18 font-normal leading-display text-digital-red">{footer}</div>}

              {link?.url && (
                <Link
                  href={link.url}
                  className={twMerge(
                    "cta-button group mt-32 block w-fit rounded-full border-2 px-26 pb-11 pt-10 text-24 font-semibold leading-display no-underline transition-colors hocus:underline md:text-18",
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
    </div>
  )
}
export default HorizontalCard
