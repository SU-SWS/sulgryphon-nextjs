"use client";

import {ReactNodeLike} from "prop-types";
import formatHtml from "@/lib/format-html";
import Conditional from "@/components/utils/conditional";
import {DrupalLink} from "@/components/patterns/link";
import {
  TopRightSprinkles,
  TopLeftSprinkles,
  BottomLeftSprinkles,
  BottomRightSprinkles
} from "@/components/patterns/card-sprinkles";
import {useRef} from "react";
import FullScreenBackground from "@/components/patterns/full-screen-background";

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
  linkStyle?: string
  className?: string
  backgroundSprinkles?: string
}

const HorizontalCard = ({video, image, superHeader, header, footer, body, link, linkStyle, backgroundSprinkles = 'top_right', ...props}: CardProps) => {
  const ref = useRef(null);

  return (
    <div {...props} ref={ref}>

      <FullScreenBackground compareRef={ref} className="su-relative su-w-full su-h-full su-bg-black-true">
        {(backgroundSprinkles == 'top_right') && <TopRightSprinkles/>}
        {(backgroundSprinkles == 'top_left') && <TopLeftSprinkles/>}
        {(backgroundSprinkles == 'bottom_right') && <BottomRightSprinkles/>}
        {(backgroundSprinkles == 'bottom_left') && <BottomLeftSprinkles/>}
      </FullScreenBackground>

      <div className="su-max-w-1500 su-mx-auto su-relative su-basefont-23 su-leading-display su-text-white su-flex su-mt-[9rem] md:su-px-80 md:su-pb-80 md:su-pt-120 su-p-40 su-flex-wrap">
        <div className={"su-w-full md:su-w-1/2 md:su-mt-0 sm:su-mt-[-14rem] su-mt-[-9rem]"}>
          <Conditional showWhen={image || video}>
            <div className="su-overflow-hidden su-aspect-[16/9] su-relative">
              {image}
              {video}
            </div>
          </Conditional>
        </div>

        <div className="card-body su-items-start md:su-rs-px-2 su-rs-pt-2 su-rs-pb-4 su-w-full md:su-w-1/2 su-pb-32 su-pb-64 su-z-10">
          <Conditional showWhen={superHeader}>
            <span className="su-type-0 su-mb-0 su-leading-display su-font-bold su-underline">{superHeader}</span>
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

          {link?.url &&
            <DrupalLink url={link.url} style={linkStyle}>
              {link.title}
            </DrupalLink>
          }

        </div>
      </div>
    </div>
  )
}
export default HorizontalCard;
