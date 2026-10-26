"use client"

import Link from "@/components/patterns/elements/drupal-link"
import useIsCentered from "@/lib/hooks/useIsCentered"
import {HTMLAttributes, useRef} from "react"
import {Maybe, Link as LinkType} from "@/lib/gql/__generated__/graphql"
import cn from "@/lib/utils/className"
import {ChevronDoubleRightIcon} from "@heroicons/react/20/solid"

type Props = HTMLAttributes<HTMLDivElement> & {
  headline?: Maybe<string>
  link: LinkType
  styles?: {
    background?: Maybe<string>
  }
  headerId?: string
  fullWidth?: Maybe<boolean>
}

const SulButton = ({headerId, headline, link, styles, fullWidth, ...props}: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const isCentered = useIsCentered(ref)

  const isBlackBackground = !styles?.background?.includes("gray")
  const isCtaVariant = styles?.background === "gray-cta"

  const linkAttributes: Record<string, string> = {}
  if (link?.attributes?.ariaLabel) linkAttributes["aria-label"] = link.attributes.ariaLabel

  if (headerId && link?.attributes?.ariaLabel && link.attributes.ariaLabel === headline) {
    linkAttributes["aria-labelledby"] = headerId
    delete linkAttributes["aria-label"]
  }

  return (
    <div
      className={cn("relative", {
        "w-full": !fullWidth || !isCentered || isCtaVariant,
        "full-screen": fullWidth && isCentered && !isCtaVariant,
        centered: isCtaVariant,
      })}
      ref={ref}
      {...props}
    >
      <div
        className={cn("py-50", {
          "bg-black-true": isBlackBackground,
          "bg-black-10": !isBlackBackground,
          "w-screen": fullWidth && isCentered && !isCtaVariant,
          "h-fit w-fit rounded-[0.3rem] border-2 border-black-10 bg-fog-light px-10 py-6 lg:ml-auto": isCtaVariant,
        })}
      >
        <div
          className={cn("centered", {
            "flex flex-row gap-10": isCtaVariant,
          })}
        >
          {headline && (
            <h2
              id={headerId}
              className={cn("shrink-0 text-center", {
                "text-white": isBlackBackground,
                "type-3": !isCtaVariant,
                "mb-0 type-0 font-semibold": isCtaVariant,
              })}
            >
              {headline}
            </h2>
          )}

          {link?.url && (
            <Link
              href={link.url}
              className={cn("mx-auto block w-fit text-center", {
                button: !isCtaVariant,
                group: isCtaVariant,
              })}
              {...linkAttributes}
            >
              {link.title}
              {isCtaVariant && (
                <span className="whitespace-nowrap">
                  &#65279;
                  <ChevronDoubleRightIcon
                    width="20"
                    className="ml-2 inline transition duration-500 ease-in-out group-hover:translate-x-02em group-focus:translate-x-02em"
                  />
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default SulButton
