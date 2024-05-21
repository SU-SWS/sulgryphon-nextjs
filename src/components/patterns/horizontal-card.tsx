"use client";

import {ReactNodeLike} from "prop-types";
import formatHtml from "@/lib/format-html";
import CardSprinkles from "@/components/patterns/card-sprinkles";
import {ElementType, HTMLAttributes, useRef} from "react";
import FullScreenBackground from "@/components/patterns/full-screen-background";
import Link from "@/components/patterns/elements/drupal-link";
import {Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal.d";
import {twMerge} from "tailwind-merge";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  video?: Maybe<ReactNodeLike>
  image?: Maybe<ReactNodeLike>
  superHeader?: Maybe<any>
  header?: Maybe<any>
  footer?: Maybe<ReactNodeLike>
  body?: Maybe<string>
  link?: Maybe<LinkType>
  backgroundSprinkles?: 'top_right' | 'top_left' | 'bottom_right' | 'bottom_left'
  fullWidth?: Maybe<boolean>
  headerId?: string
  headingLevel?: Maybe<ElementType>
  hideHeading?: boolean
}

const HorizontalCard = ({
  headerId,
  video,
  image,
  superHeader,
  header,
  footer,
  body,
  link,
  headingLevel,
  fullWidth = true,
  backgroundSprinkles = 'top_right',
  hideHeading,
  ...props
}: CardProps) => {
  const ref = useRef(null);
  const Heading: ElementType = headingLevel || 'h2';

  const linkAttributes: Record<string, string> = {};
  if (link?.attributes?.ariaLabel) linkAttributes['aria-label'] = link.attributes.ariaLabel;

  if (headerId && link?.attributes?.ariaLabel && link.attributes.ariaLabel === header) {
    linkAttributes['aria-labelledby'] = headerId;
    delete linkAttributes['aria-label'];
  }

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
        className="@container centered relative basefont-18 leading-display text-white mt-[77px] @6xl:mt-0 pt-[5.8rem] pb-[7.2rem] lg:px-80">

        <div className="grid @6xl:grid-cols-2 gap-2xl items-center">
          {(image || video) &&
            <div
              className="w-full overflow-hidden aspect-[16/9] relative mt-[-135px] @6xl:mt-0">
              {image}
              {video}
            </div>
          }

          <div className="">
            {(superHeader) &&
              <span className="type-0 mb-0 leading-display font-bold underline">{superHeader}</span>
            }

            {(header) &&
              <Heading id={headerId} className={twMerge("text-m4", hideHeading && "sr-only")}>{header}</Heading>
            }

            {(body) &&
              <div>{formatHtml(body)}</div>
            }

            {(footer) &&
              <div
                className="leading-display text-18 rs-pt-0 text-digital-red font-normal">{footer}</div>
            }

            {link?.url &&
              <Link
                href={link.url}
                className="border-2 border-digital-red rounded-full cta-button font-semibold leading-display block w-fit no-underline hocus:underline group transition-colors px-26 pt-10 pb-11 text-16 md:text-18 text-white hocus:bg-black-true hocus:text-white rs-mt-neg1 bg-digital-red"
                {...linkAttributes}
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
