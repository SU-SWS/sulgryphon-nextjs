import formatHtml from "@/lib/format-html"
import {DrupalLink} from "@/components/patterns/link"
import {ElementType, HTMLAttributes, JSX, ReactNode} from "react"
import {Maybe, Link as LinkType} from "@/lib/gql/__generated__/graphql"
import {twMerge} from "tailwind-merge"

type Props = HTMLAttributes<HTMLDivElement> & {
  video?: Maybe<ReactNode>
  image?: Maybe<ReactNode>
  caption?: Maybe<string>
  superHeader?: Maybe<string> | JSX.Element
  header?: Maybe<string> | JSX.Element
  footer?: Maybe<ReactNode>
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

  // Use headerId if provided, otherwise generate one from header
  // Use provided headerId only if it doesn't look like a mangled RSC ID
  const isValidId = headerId && !headerId.startsWith("_S_")
  const actualHeadingId = isValidId
    ? headerId
    : typeof header === "string"
      ? header
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "")
      : undefined

  const linkAttributes: Record<string, string> = {}
  if (link?.attributes?.ariaLabel) linkAttributes["aria-label"] = link.attributes.ariaLabel

  if (actualHeadingId && link?.attributes?.ariaLabel && link.attributes.ariaLabel === header) {
    linkAttributes["aria-labelledby"] = actualHeadingId
    delete linkAttributes["aria-label"]
  }

  // Extract the header text for aria-label
  const headerText = typeof header === "string" ? header : undefined

  // Remove aria-labelledby and aria-label from props to prevent conflicts
  const {["aria-labelledby"]: removedLabelledBy, ["aria-label"]: removedLabel, ...restProps} = props

  const CardWrapper = header ? "article" : "div"
  return (
    <CardWrapper
      {...restProps}
      aria-label={headerText}
      className={twMerge(
        "card block w-full border border-solid border-black-10 bg-white leading-display text-black shadow-md",
        props.className
      )}
    >
      {image && (
        <div className="relative h-fit w-full">
          <div className="relative aspect-[16/9]">{image}</div>
          {caption && (
            <div className="absolute bottom-0 z-10 w-full bg-black/80 p-10">
              <div className="mx-auto w-fit text-16 leading-normal font-medium text-white">{caption}</div>
            </div>
          )}
        </div>
      )}

      {video && <div className="relative aspect-[16/9] overflow-hidden">{video}</div>}

      <div className="card-body items-start px-24 py-30">
        {superHeader && <span className="mb-0 type-0 leading-display font-bold">{superHeader}</span>}

        {header && (
          <Heading
            id={actualHeadingId}
            className={twMerge("mb-03em text-24 font-bold tracking-[-0.2px]", hideHeading && "sr-only")}
          >
            {header}
          </Heading>
        )}

        {body && <div className="[&_p]:last:mb-0">{formatHtml(body)}</div>}

        {footer && (
          <div
            className={twMerge(
              // In Tailwind v3 a caller's padding (e.g. "p-0") always beat Decanter's rs-* spacing; keep that.
              !/(^|\s)(\S+:)?p[ty]?-/.test(footerClasses || "") && "rs-pt-0",
              "text-18 leading-display font-normal",
              footerClasses
            )}
          >
            {footer}
          </div>
        )}

        {link?.url && <DrupalLink url={link.url} title={link.title} linkStyle={linkStyle} {...linkAttributes} />}
      </div>
    </CardWrapper>
  )
}
export default Card
