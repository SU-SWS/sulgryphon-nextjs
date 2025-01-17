import {ReactNodeLike} from "prop-types"

import formatHtml from "@/lib/format-html"
import {DrupalLink} from "@/components/patterns/link"
import {ElementType, HTMLAttributes, JSX} from "react"
import {Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal.d"
import {twMerge} from "tailwind-merge"

type Props = HTMLAttributes<HTMLDivElement> & {
  video?: Maybe<ReactNodeLike>
  image?: Maybe<ReactNodeLike>
  caption?: string
  superHeader?: Maybe<string> | JSX.Element
  header?: Maybe<string> | JSX.Element
  footer?: Maybe<ReactNodeLike>
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
        "card basefont-20 block w-full border border-solid border-black-10 bg-white leading-display text-black shadow-md",
        props.className
      )}
    >
      {image && (
        <div className="relative h-fit w-full">
          <div className="relative aspect-[16/9] overflow-hidden" aria-hidden="true">
            {image}
          </div>
          <div className="absolute bottom-0 w-full bg-black bg-opacity-80">
            <div className="mx-auto w-fit max-w-200 py-5 text-16 font-semibold leading-normal text-white md:max-w-350">
              {caption}
            </div>
          </div>
        </div>
      )}

      {video && <div className="relative aspect-[16/9] overflow-hidden">{video}</div>}

      <div className="card-body rs-pt-2 rs-px-2 rs-pb-4 items-start">
        {superHeader && <span className="type-0 mb-0 font-bold leading-display">{superHeader}</span>}

        {header && (
          <Heading
            id={headerId}
            className={twMerge("type-1 mb-03em font-bold leading-tight", hideHeading && "sr-only")}
          >
            {header}
          </Heading>
        )}

        {body && <div>{formatHtml(body)}</div>}

        {footer && <div className="rs-pt-0 text-18 font-normal leading-display">{footer}</div>}

        {link?.url && <DrupalLink url={link.url} title={link.title} linkStyle={linkStyle} {...linkAttributes} />}
      </div>
    </CardWrapper>
  )
}
export default Card
