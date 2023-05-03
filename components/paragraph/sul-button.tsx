"use client";

import {DrupalLink} from "@/lib/drupal/drupal";
import Link from "next/link";
import Conditional from "@/components/utils/conditional";
import useIsCentered from "@/lib/hooks/useIsCentered";
import {PropsWithoutRef, useRef} from "react";

interface Props extends PropsWithoutRef<any> {
  headline?: string
  link: DrupalLink
  styles?: {
    background?: string
  }
}

const SulButton = ({headline, link, styles, fullWidth = true, ...props}: Props) => {
  const isGray = styles?.background == 'gray';
  const ref = useRef(null);
  const isCentered = useIsCentered(ref)

  return (
    <div className={"su-relative" + ((!fullWidth || !isCentered) ? " su-w-full " : " su-full-screen ") } ref={ref} {...props}>
      <div
        className={"su-py-50 " + (isGray ? "su-bg-black-10" : "su-bg-black-true")}>
        <div className="su-cc">
          <Conditional showWhen={headline}>
            <h2 className={"su-text-center su-text-m3 " + (!isGray ? 'su-text-white' : '')}>
              {headline}
            </h2>
          </Conditional>

          <Link scroll href={link.url} className="su-button su-block su-mx-auto su-text-center su-w-fit">
            {link.title}
          </Link>
        </div>
      </div>
    </div>
  )
}


export default SulButton;