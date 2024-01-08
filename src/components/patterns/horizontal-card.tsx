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
  className?: string
  backgroundSprinkles?: 'top_right' | 'top_left' | 'bottom_right' | 'bottom_left'
  fullWidth?: boolean
  headerId?: string
  headingLevel?: string
}

const HorizontalCard = ({headerId, video, image, superHeader, header, footer, body, link, headingLevel = 'h2', fullWidth = true, backgroundSprinkles = 'top_right', ...props}: CardProps) => {
  const ref = useRef(null);
  const Heading: ElementType = headingLevel === 'h2' ? 'h2' : 'h3';
  return (
    <div className="relative" {...props} ref={ref}>

      {fullWidth &&
        <div
          className={"w-screen ml-[calc(-50vw+50%)] absolute z-[-10] h-full top-0 left-0"}>
          <div className="relative w-full h-full bg-black-true" {...props}>
            <CardSprinkles position={backgroundSprinkles}/>
          </div>
        </div>
      }

      {!fullWidth &&
        <FullScreenBackground compareRef={ref} className="relative w-full h-full bg-black-true">
          <CardSprinkles position={backgroundSprinkles}/>
        </FullScreenBackground>
      }

      <div
        className="@container centered relative basefont-23 leading-display text-white mt-[77px] @6xl:mt-0 pt-[5.8rem] pb-[7.2rem] lg:px-80">

        <div className="grid @6xl:grid-cols-2 gap-2xl items-center">
          <Conditional showWhen={image || video}>
            <div
              className="w-full overflow-hidden aspect-[16/9] relative mt-[-135px] @6xl:mt-0">
              {image}
              {video}
            </div>
          </Conditional>

          <div className="">
            <Conditional showWhen={superHeader}>
              <span className="type-0 mb-0 leading-display font-bold underline">{superHeader}</span>
            </Conditional>

            <Conditional showWhen={header}>
              <Heading id={headerId} className="text-m5">{header}</Heading>
            </Conditional>

            <Conditional showWhen={body}>
              <div>{formatHtml(body)}</div>
            </Conditional>

            <Conditional showWhen={footer}>
              <div
                className="leading-display text-18 rs-pt-0 text-digital-red font-normal">{footer}</div>
            </Conditional>

            {link?.url &&
              <Link
                href={link.url}
                className="border-2 border-digital-red rounded-full cta-button font-semibold leading-display block w-fit no-underline hocus:underline group transition-colors px-26 pt-10 pb-11 text-16 md:text-20 text-white hocus:bg-black-true hocus:text-white rs-mt-neg1 bg-digital-red"
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
