"use client";

import {DrupalLinkType} from "@/lib/drupal/drupal";
import Link from "@/components/patterns/elements/drupal-link";
import Conditional from "@/components/utils/conditional";
import useIsCentered from "@/lib/hooks/useIsCentered";
import {PropsWithoutRef, useRef} from "react";

interface Props extends PropsWithoutRef<any> {
  headline?: string
  link: DrupalLinkType
  styles?: {
    background?: string
  }
  headerId?: string
}

const SulButton = ({headerId, headline, link, styles, fullWidth = true, ...props}: Props) => {
  const isGray = styles?.background == 'gray';
  const ref = useRef<HTMLDivElement>(null);
  const isCentered = useIsCentered(ref)

  if (headerId && link?.options?.attributes?.['aria-label'] && link?.options?.attributes?.['aria-label'] === headline) {
    link.options.attributes['aria-labelledby'] = headerId;
    delete link?.options?.attributes?.['aria-label'];
  }

  return (
    <div className={"relative" + ((!fullWidth || !isCentered) ? " w-full " : " full-screen ") } ref={ref} {...props}>
      <div
        className={"py-50 " + (isGray ? "bg-black-10" : "bg-black-true")}>
        <div className="centered">
          <Conditional showWhen={headline}>
            <h2 id={headerId} className={"text-center text-m3 " + (!isGray ? 'text-white' : '')}>
              {headline}
            </h2>
          </Conditional>

          <Link href={link.url} className="button block mx-auto text-center w-fit" {...link.options?.attributes}>
            {link.title}
          </Link>
        </div>
      </div>
    </div>
  )
}


export default SulButton;