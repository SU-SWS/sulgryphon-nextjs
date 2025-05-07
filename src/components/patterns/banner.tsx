import {ReactNodeLike} from "prop-types"
import Card from "@/components/patterns/card"
import {Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal.d"
import {ElementType, HTMLAttributes} from "react"

type BannerProps = HTMLAttributes<HTMLDivElement> & {
  image?: Maybe<ReactNodeLike>
  superHeader?: Maybe<string>
  header?: Maybe<string>
  body?: Maybe<string>
  link?: Maybe<LinkType>
  overlayPosition?: Maybe<string>
  headerId?: string
  headingTag?: ElementType
  hideHeading?: boolean
}

const Banner = ({
  headerId,
  image,
  header,
  superHeader,
  body,
  link,
  overlayPosition,
  headingTag,
  hideHeading,
  ...props
}: BannerProps) => {
  const hasCardText = header || superHeader || body || link

  return (
    <div className="hero relative mx-auto h-full w-full lg:max-h-500" {...props}>
      <div className="relative max-h-500 min-h-[30rem] w-full overflow-hidden bg-[grey] lg:min-h-[50rem]">{image}</div>

      {hasCardText && (
        <div
          className={`mx-auto block lg:absolute lg:bottom-36 lg:top-auto ${overlayPosition === "right" ? "lg:right-36" : "lg:left-36"}`}
        >
          <div className="card relative border border-solid border-black-10 bg-white leading-display text-black shadow lg:max-w-[50%]">
            <Card
              header={header}
              superHeader={superHeader}
              body={body}
              link={link}
              headerId={headerId}
              headingLevel={headingTag}
              hideHeading={hideHeading}
            />
          </div>
        </div>
      )}
    </div>
  )
}
export default Banner
