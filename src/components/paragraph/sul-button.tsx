"use client"

import Link from "@/components/patterns/elements/drupal-link"
import useIsCentered from "@/lib/hooks/useIsCentered"
import {HTMLAttributes, useRef} from "react"
import {Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal.d"

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
  const isGray = styles?.background == "gray"
  const ref = useRef<HTMLDivElement>(null)
  const isCentered = useIsCentered(ref)

  const linkAttributes: Record<string, string> = {}
  if (link?.attributes?.ariaLabel) linkAttributes["aria-label"] = link.attributes.ariaLabel

  if (headerId && link?.attributes?.ariaLabel && link.attributes.ariaLabel === headline) {
    linkAttributes["aria-labelledby"] = headerId
    delete linkAttributes["aria-label"]
  }

  return (
    <div className={"relative" + (!fullWidth || !isCentered ? " w-full" : " full-screen")} ref={ref} {...props}>
      <div className={"py-50 " + (isGray ? "bg-black-10" : "bg-black-true")}>
        <div className="centered">
          {headline && (
            <h2 id={headerId} className={"type-3 text-center " + (!isGray ? "text-white" : "")}>
              {headline}
            </h2>
          )}

          {link?.url && (
            <Link href={link.url} className="button mx-auto block w-fit text-center" {...linkAttributes}>
              {link.title}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default SulButton
