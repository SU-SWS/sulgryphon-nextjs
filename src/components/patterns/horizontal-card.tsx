"use client"
import formatHtml from "@/lib/format-html"
import {ElementType, HTMLAttributes, useRef, ReactNode} from "react"
import Link from "@/components/patterns/elements/drupal-link"
import {Maybe, Link as LinkType} from "@/lib/gql/__generated__/graphql"
import {twMerge} from "tailwind-merge"
import {clsx} from "clsx"
import RosetteIcon from "./icons/RosetteIcon"

type CardProps = HTMLAttributes<HTMLDivElement> & {
  video?: Maybe<ReactNode>
  image?: Maybe<ReactNode>
  caption?: Maybe<string>
  cardBgColor?: "fog_light" | "cardinal_red"
  hideRosette?: Maybe<boolean>
  superHeader?: Maybe<string>
  header?: Maybe<string>
  footer?: Maybe<ReactNode>
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
        "@container relative",
        clsx({
          "bg-cardinal-red text-white": cardBgColor === "cardinal_red",
          "bg-fog-light text-black-true": cardBgColor !== "cardinal_red",
        }),
        props.className
      )}
    >
      <div className="@container relative w-full rs-p-1 leading-display @6xl:rs-px-5 @8xl:centered @8xl:py-[5.6rem] @13xl:px-0">
        <div className="grid items-center gap-2xl @9xl:grid-cols-2 @10xl:gap-30">
          {(image || video) && (
            <div className="relative h-fit w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden @8xl:aspect-[5/3]">
                {image}
                {video}
              </div>
              {caption && (
                <div className="absolute bottom-0 z-10 w-full bg-black/80 p-10">
                  <div className="text-16 leading-normal font-medium text-white">{caption}</div>
                </div>
              )}
            </div>
          )}
          <div>
            <div className="mb-16 flex flex-row flex-wrap items-center gap-16 @8xl:flex-nowrap">
              {!hideRosette && <RosetteIcon height={64} width={64} className="object-contain" />}
              <div>
                {superHeader && (
                  <span className="mb-0 text-16 leading-display font-normal uppercase md:text-18">{superHeader}</span>
                )}

                {header && (
                  <Heading
                    id={headerId}
                    className={twMerge("word-break mb-0 text-26 md:text-28", hideHeading && "sr-only")}
                  >
                    {header}
                  </Heading>
                )}
              </div>
            </div>
            <div className={clsx({"m-0 @10xl:rs-ml-2": !hideRosette})}>
              {body && (
                <div
                  className={clsx("[&_p]:text-20", {
                    "[&_a:not(.cta-button)]:text-white [&_a:not(.cta-button)]:hocus:text-black-true":
                      cardBgColor === "cardinal_red",
                  })}
                >
                  {formatHtml(body, cardBgColor === "cardinal_red")}
                </div>
              )}

              {footer && <div className="rs-pt-0 text-18 leading-display font-normal text-digital-red">{footer}</div>}

              {link?.url && (
                <Link
                  href={link.url}
                  className={twMerge(
                    "cta-button group mt-32 block w-fit rounded-full border-2 px-26 pt-10 pb-11 text-24 leading-display font-semibold no-underline transition-colors md:text-18 hocus:underline",
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
