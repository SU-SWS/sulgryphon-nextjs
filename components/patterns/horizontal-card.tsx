"use client";

import {ReactNodeLike} from "prop-types";
import formatHtml from "@/lib/format-html";
import Conditional from "@/components/utils/conditional";
import CardSprinkles from "@/components/patterns/card-sprinkles";
import {ElementType, useRef} from "react";
import FullScreenBackground from "@/components/patterns/full-screen-background";
import Link from "@/components/patterns/elements/drupal-link";
import {DrupalLinkType} from "@/lib/drupal/drupal";

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
  backgroundSprinkles?: string
  fullWidth?: boolean
  headerId?: string
  headingLevel?: string
}

const HorizontalCard = ({headerId, video, image, superHeader, header, footer, body, link, linkStyle, headingLevel = 'h2', fullWidth = true, backgroundSprinkles = 'top_right', ...props}: CardProps) => {
  const ref = useRef(null);
  const Heading: ElementType = headingLevel === 'h2' ? 'h2' : 'h3';
  return (
    <div className="su-relative" {...props} ref={ref}>

      {fullWidth &&
        <div
          className={"su-w-screen su-ml-[calc(-50vw+50%)] su-absolute su-z-[-10] su-h-full su-top-0 su-left-0"}>
          <div className="su-relative su-w-full su-h-full su-bg-black-true" {...props}>
            <CardSprinkles position={backgroundSprinkles}/>
          </div>
        </div>
      }

      {!fullWidth &&
        <FullScreenBackground compareRef={ref} className="su-relative su-w-full su-h-full su-bg-black-true">
          <CardSprinkles position={backgroundSprinkles}/>
        </FullScreenBackground>
      }

      <div
        className="su-@container su-centered su-relative su-basefont-23 su-leading-display su-text-white su-mt-[77px] @6xl:su-mt-0 su-pt-[5.8rem] su-pb-[7.2rem] lg:su-px-80">

        <div className="su-grid @6xl:su-grid-cols-2 su-gap-2xl su-items-center">
          <Conditional showWhen={image || video}>
            <div
              className="su-w-full su-overflow-hidden su-aspect-[16/9] su-relative su-mt-[-135px] @6xl:su-mt-0">
              {image}
              {video}
            </div>
          </Conditional>

          <div className="">
            <Conditional showWhen={superHeader}>
              <span className="su-type-0 su-mb-0 su-leading-display su-font-bold su-underline">{superHeader}</span>
            </Conditional>

            <Conditional showWhen={header}>
              <Heading id={headerId} className="su-text-m5">{header}</Heading>
            </Conditional>

            <Conditional showWhen={body}>
              <div>{formatHtml(body)}</div>
            </Conditional>

            <Conditional showWhen={footer}>
              <div
                className="su-leading-display su-text-18 su-rs-pt-0 su-text-digital-red su-font-normal">{footer}</div>
            </Conditional>

            {link?.url &&
              <Link
                href={link.url}
                className="su-border-2 su-border-digital-red su-rounded-full su-cta-button su-font-semibold su-leading-display su-block su-w-fit su-no-underline hocus:su-underline su-group su-transition-colors su-px-26 su-pt-10 su-pb-11 su-text-16 md:su-text-20 su-text-white hocus:su-bg-black-true hocus:su-text-white su-rs-mt-neg1 su-bg-digital-red"
                {...link.options?.attributes}
              >
                {link.title}
              </Link>
            }

          </div>
        </div>
      </div>
    </div>
  )
}
export default HorizontalCard;
