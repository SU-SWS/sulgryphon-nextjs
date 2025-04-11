import {ReactNodeLike} from "prop-types"

import formatHtml from "@/lib/format-html"
import {DrupalLink} from "@/components/patterns/link"
import {ElementType, HTMLAttributes, JSX} from "react"
import {Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal.d"
import {twMerge} from "tailwind-merge"

type Props = HTMLAttributes<HTMLDivElement> & {
  video?: Maybe<ReactNodeLike>
  image?: Maybe<ReactNodeLike>
  caption?: Maybe<string>
  superHeader?: Maybe<string> | JSX.Element
  header?: Maybe<string> | JSX.Element
  footer?: Maybe<ReactNodeLike>
  footerClasses?: Maybe<string>
  body?: Maybe<string>
  link?: Maybe<LinkType>
  linkStyle?: Maybe<string>
  className?: Maybe<string>
  headerId?: string
  headingLevel?: Maybe<ElementType>
  hideHeading?: boolean
}

const Card = ({
  headerId,
  video,
  image,
  caption,
  superHeader,
  header,
  footer,
  footerClasses,
  body,
  link,
  linkStyle,
  headingLevel,
  hideHeading,
  ...props
}: Props) => {
  const Heading: ElementType = headingLevel || "h2"

  const linkAttributes: Record<string, string> = {}
  if (link?.attributes?.ariaLabel) linkAttributes["aria-label"] = link.attributes.ariaLabel

  if (headerId && link?.attributes?.ariaLabel && link.attributes.ariaLabel === header) {
    linkAttributes["aria-labelledby"] = headerId
    delete linkAttributes["aria-label"]
  }

  const CardWrapper = header ? "article" : "div"
  return (
    <CardWrapper
      {...props}
      aria-labelledby={header ? headerId : undefined}
      className={twMerge(
        "card block w-full border border-solid border-black-10 bg-white leading-display text-black shadow-md",
        props.className
      )}
    >
      {image && (
        <div className="relative h-fit w-full">
          <div className="relative aspect-[16/9] overflow-hidden" aria-hidden="true">
            {image}
          </div>
          {caption && (
            <div className="absolute bottom-0 z-10 w-full bg-black bg-opacity-80 p-10">
              <div className="mx-auto w-fit text-16 font-medium leading-normal text-white">{caption}</div>
            </div>
          )}
        </div>
      )}

      {video && <div className="relative aspect-[16/9] overflow-hidden">{video}</div>}

      <div className="card-body items-start px-24 py-30">
        {superHeader && <span className="type-0 mb-0 font-bold leading-display">{superHeader}</span>}

        {header && (
          <Heading
            id={headerId}
            className={twMerge("mb-03em text-24 font-bold tracking-[-0.2px]", hideHeading && "sr-only")}
          >
            {header}
          </Heading>
        )}

        {body && <div className="last:[&_p]:mb-0">{formatHtml(body)}</div>}

        {footer && (
          <div className={twMerge("rs-pt-0 text-18 font-normal leading-display", footerClasses)}>{footer}</div>
        )}

        {link?.url && <DrupalLink url={link.url} title={link.title} linkStyle={linkStyle} {...linkAttributes} />}
      </div>
    </CardWrapper>
  )
}
export default Card
