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
      className="card block w-full basefont-23 leading-display bg-white text-black border border-solid border-black-10 shadow-md">

      <Conditional showWhen={image}>
        <div className="overflow-hidden aspect-[16/9] relative" aria-hidden="true">
          {image}
        </div>
      </Conditional>

      <Conditional showWhen={video}>
        <div className="overflow-hidden aspect-[16/9] relative">
          {video}
        </div>
      </Conditional>

      <div className="card-body items-start rs-px-2 rs-pt-2 rs-pb-4">
        <Conditional showWhen={superHeader}>
            <span className="type-0 mb-0 leading-display font-bold">
              {superHeader}
            </span>
        </Conditional>

        <Conditional showWhen={header}>
          <Heading id={headerId} className="leading-tight font-bold type-2 mb-03em">
            {header}
          </Heading>
        </Conditional>

        <Conditional showWhen={body}>
          <div>
            {formatHtml(body)}
          </div>
        </Conditional>

        <Conditional showWhen={footer}>
          <div className="leading-display text-18 rs-pt-0 font-normal">
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
