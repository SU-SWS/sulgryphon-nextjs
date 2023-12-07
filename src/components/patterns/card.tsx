import {ReactNodeLike} from "prop-types";

import formatHtml from "@/lib/format-html";
import Conditional from "@/components/utils/conditional";
import {DrupalLink} from "@/components/patterns/link";
import {DrupalLinkType} from "@/lib/drupal/drupal";
import {ElementType} from "react";

interface CardProps {
  video?: ReactNodeLike
  image?: ReactNodeLike
  superHeader?: any
  header?: any
  footer?: ReactNodeLike
  body?: string
  link?: DrupalLinkType
  linkStyle?: string
  className?: string
  headerId?: string
  headingLevel?: string
}

const Card = ({headerId, video, image, superHeader, header, footer, body, link, linkStyle, headingLevel = 'h3', ...props}: CardProps) => {
  const Heading: ElementType = headingLevel === 'h2' ? 'h2' : 'h3';
  if (headerId && link?.options?.attributes?.['aria-label'] && link?.options?.attributes?.['aria-label'] === header) {
    link.options.attributes['aria-labelledby'] = headerId;
    delete link?.options?.attributes?.['aria-label'];
  }
  return (
    <div
      className="card su-block su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border su-border-solid su-border-black-10 su-shadow-md">

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
            <span className="su-type-0 su-mb-0 su-leading-display su-font-bold">
              {superHeader}
            </span>
        </Conditional>

        <Conditional showWhen={header}>
          <Heading id={headerId} className="su-leading-tight su-font-bold su-type-2 su-mb-03em">
            {header}
          </Heading>
        </Conditional>

        <Conditional showWhen={body}>
          <div>
            {formatHtml(body)}
          </div>
        </Conditional>

        <Conditional showWhen={footer}>
          <div className="su-leading-display su-text-18 su-rs-pt-0 su-font-normal">
            {footer}
          </div>
        </Conditional>

        <DrupalLink
          url={link?.url}
          title={link?.title}
          style={linkStyle}
          {...link?.options?.attributes}
        />
      </div>
    </div>
  )

}
export default Card;
