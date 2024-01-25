"use client";

import Link from "@/components/patterns/elements/drupal-link";
import useIsCentered from "@/lib/hooks/useIsCentered";
import {HTMLAttributes, useRef} from "react";
import {Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal";

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
  const isGray = styles?.background == 'gray';
  const ref = useRef<HTMLDivElement>(null);
  const isCentered = useIsCentered(ref)

  const linkAttributes: Record<string, string> = {};
  if (link?.attributes?.ariaLabel) linkAttributes['link-attributes'] = link.attributes.ariaLabel;

  if (headerId && link?.attributes?.ariaLabel && link.attributes.ariaLabel === headline) {
    linkAttributes['aria-labelledby'] = headerId;
    delete linkAttributes['aria-label'];
  }

  return (
    <div className={"relative" + ((!fullWidth || !isCentered) ? " w-full " : " full-screen ")} ref={ref} {...props}>
      <div
        className={"py-50 " + (isGray ? "bg-black-10" : "bg-black-true")}>
        <div className="centered">
          {(headline) &&
            <h2 id={headerId} className={"text-center text-m3 " + (!isGray ? 'text-white' : '')}>
              {headline}
            </h2>
          }

          {link?.url &&
            <Link href={link.url} className="button block mx-auto text-center w-fit" {...linkAttributes}>
              {link.title}
            </Link>
          }
        </div>
      </div>
    </div>
  )
}


export default SulButton;