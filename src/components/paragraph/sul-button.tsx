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
  const ref = useRef(null);
  const isCentered = useIsCentered(ref)

  if (headerId && link?.options?.attributes?.['aria-label'] && link?.options?.attributes?.['aria-label'] === headline) {
    link.options.attributes['aria-labelledby'] = headerId;
    delete link?.options?.attributes?.['aria-label'];
  }

  return (
    <div className={"su-relative" + ((!fullWidth || !isCentered) ? " su-w-full " : " su-full-screen ") } ref={ref} {...props}>
      <div
        className={"su-py-50 " + (isGray ? "su-bg-black-10" : "su-bg-black-true")}>
        <div className="su-centered">
          <Conditional showWhen={headline}>
            <h2 id={headerId} className={"su-text-center su-text-m3 " + (!isGray ? 'su-text-white' : '')}>
              {headline}
            </h2>
          </Conditional>

          <Link href={link.url} className="su-button su-block su-mx-auto su-text-center su-w-fit" {...link.options?.attributes}>
            {link.title}
          </Link>
        </div>
      </div>
    </div>
  )
}


export default SulButton;