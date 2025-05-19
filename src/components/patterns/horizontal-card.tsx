"use client"
import {ReactNodeLike} from "prop-types"
import formatHtml from "@/lib/format-html"
import {ElementType, HTMLAttributes, useRef} from "react"
import Link from "@/components/patterns/elements/drupal-link"
import {Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal.d"
import {twMerge} from "tailwind-merge"
import {clsx} from "clsx"
import RosetteIcon from "./icons/RosetteIcon"

type CardProps = HTMLAttributes<HTMLDivElement> & {
  video?: Maybe<ReactNodeLike>
  image?: Maybe<ReactNodeLike>
  caption?: Maybe<string>
  cardBgColor?: "fog_light" | "cardinal_red"
  hideRosette?: Maybe<boolean>
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
  hideRosette,
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

  return (
    <div
      {...props}
      ref={ref}
      className={twMerge(
        "relative",
        clsx({
          "bg-cardinal-red text-white": cardBgColor === "cardinal_red",
          "bg-fog-light text-black-true": cardBgColor !== "cardinal_red",
        }),
        props.className
      )}
    >
      <div className="rs-px-5 relative w-full py-[5.6rem] leading-display @container @6xl:centered lg:px-80">
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
            <div className="mb-16 flex flex-row flex-wrap items-center gap-16 @6xl:flex-nowrap">
              {!hideRosette && <RosetteIcon height={64} width={64} className="object-contain" />}
              <div>
                {superHeader && (
                  <span className="mb-0 text-20 font-semibold uppercase leading-display">{superHeader}</span>
                )}

                {header && (
                  <Heading
                    id={headerId}
                    className={twMerge("word-break lg:text-32 mb-0 text-26 md:text-28", hideHeading && "sr-only")}
                  >
                    {header}
                  </Heading>
                )}
              </div>
            </div>
            <div className={clsx(!hideRosette && "m-0 @10xl:rs-ml-2")}>
              {body && (
                <div
                  className={twMerge(
                    "[&_p]:text-20",
                    cardBgColor === "cardinal_red" && "[&_a]:text-white hocus:[&_a]:text-black-true"
                  )}
                >
                  {formatHtml(body)}
                </div>
              )}

              {footer && <div className="rs-pt-0 text-18 font-normal leading-display text-digital-red">{footer}</div>}

              {link?.url && (
                <Link
                  href={link.url}
                  className={twMerge(
                    "cta-button group mt-32 block w-fit rounded-full border-2 px-26 pb-11 pt-10 text-24 font-semibold leading-display no-underline transition-colors hocus:underline md:text-18",
                    clsx({
                      "border-white bg-white text-cardinal-red hocus:bg-black-true hocus:text-white":
                        cardBgColor === "cardinal_red",
                      "border-cardinal-red bg-cardinal-red text-white hocus:bg-black-true hocus:text-white":
                        cardBgColor !== "cardinal_red",
                    })
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
