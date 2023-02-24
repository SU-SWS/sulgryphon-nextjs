import {ReactNodeLike} from "prop-types";
import Link from "next/link";

import formatHtml from "@/lib/format-html";
import {DrupalLinkButton} from "@/components/simple/link";
import Conditional from "@/components/simple/conditional";

interface CardProps {
  video?: ReactNodeLike
  image?: ReactNodeLike
  superHeader?: any
  header?: any
  footer?: ReactNodeLike
  body?: string
  link?: {
    url: string
    title: string
  }
  linkStyle?: any
  className?: string
  horizontal?: boolean
}

export const Card = ({video, image, superHeader, header, footer, body, link, linkStyle, horizontal = false, ...props}: CardProps) => {
  return (
    <div {...props}
         className={`card su-block su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border su-border-solid su-border-black-10 su-shadow-md ${props.className ?? ''}`}>

      <Conditional showWhen={image}>
        <div className="su-overflow-hidden su-aspect-[16/9] su-relative" aria-hidden="true">
          {image}
        </div>
      </Conditional>

      <Conditional showWhen={video}>
        <div className="su-overflow-hidden su-aspect-[16/9] su-relative">
          {video}
        </div>
      </Conditional>

      <div className="card-body su-items-start su-rs-px-2 su-rs-pt-2 su-rs-pb-4">
        <Conditional showWhen={superHeader}>
          <span className="su-type-0 su-mb-0 su-leading-display su-font-bold">{superHeader}</span>
        </Conditional>

        <Conditional showWhen={header}>
          <h3 className="su-leading-display su-font-sans su-font-bold su-type-2 su-mb-03em">{header}</h3>
        </Conditional>

        <Conditional showWhen={body}>
          <div>{formatHtml(body)}</div>
        </Conditional>

        <Conditional showWhen={footer}>
          <div className="su-leading-display su-text-18 su-rs-pt-0 su-text-digital-red su-font-normal">{footer}</div>
        </Conditional>

        {console.log(linkStyle)}
        {console.log(horizontal)}

        {(link && linkStyle !== 'action') &&
            <DrupalLinkButton href={link.url}>
              {link.title}
            </DrupalLinkButton>
        }

        {(link && linkStyle === 'action') &&
            <Link href={link.url}>
              {link.title}
            </Link>
        }

      </div>
    </div>
  )

}
