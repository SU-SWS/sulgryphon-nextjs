"use client"

import Link from "@/components/patterns/elements/drupal-link"
import useIsCentered from "@/lib/hooks/useIsCentered"
import {HTMLAttributes, useRef} from "react"
import {Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal.d"
import {twMerge} from "tailwind-merge"
import clsx from "clsx"
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

const SulButton = ({headerId, headline, link, styles, fullWidth = true, ...props}: Props) => {
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
      className={twMerge(
        "relative",
        clsx({
          "w-full": !fullWidth || !isCentered,
          "full-screen": fullWidth || isCentered,
          centered: isCtaVariant,
        })
      )}
      ref={ref}
      {...props}
    >
      <div
        className={twMerge(
          "py-50",
          clsx({
            "bg-black-true": isBlackBackground,
            "bg-black-10": !isBlackBackground,
            "w-screen": fullWidth || isCentered,
            "h-fit w-fit rounded border-2 border-black-10 bg-fog-light px-10 py-6 lg:ml-auto": isCtaVariant,
          })
        )}
      >
        <div
          className={twMerge(
            "centered",
            clsx({
              "flex flex-row gap-10": isCtaVariant,
            })
          )}
        >
          {headline && (
            <h2
              id={headerId}
              className={twMerge(
                "shrink-0 text-center",
                clsx({
                  "text-white": isBlackBackground,
                  "type-3": !isCtaVariant,
                  "type-0 mb-0 font-semibold": isCtaVariant,
                })
              )}
            >
              {headline}
            </h2>
          )}

          {link?.url && (
            <Link
              href={link.url}
              className={twMerge(
                "mx-auto block w-fit text-center",
                clsx({
                  button: !isCtaVariant,
                  group: isCtaVariant,
                })
              )}
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
