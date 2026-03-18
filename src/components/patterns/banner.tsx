// banner.tsx
"use client"

import {ReactNodeLike} from "prop-types"
import Card from "@/components/patterns/card"
import {Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal.d"
import {ElementType, HTMLAttributes, useContext} from "react"
import {PageLayoutContext} from "@/components/layout/interior-page-layout" // 👈 Update import path

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
  const {hasSulSidebar} = useContext(PageLayoutContext)
  const hasCardText = header || superHeader || body || link

  // Adjust card max-width when SUL sidebar is present
  const cardMaxWidth = hasSulSidebar ? "xl:max-w-[50%]" : "lg:max-w-[50%]"

  const cardMaxHeight = hasSulSidebar ? "xl:max-h-500" : "lg:max-h-500"

  const cardMinHeight = hasSulSidebar ? "xl:min-h-[50rem]" : "lg:min-h-[50rem]"

  const cardPosition = hasSulSidebar ? "xl:absolute" : "lg:absolute"

  const cardBottom = hasSulSidebar ? "xl:bottom-36" : "lg:bottom-36"

  const cardTop = hasSulSidebar ? "xl:top-auto" : "lg:top-auto"

  return (
    <div className={`hero relative mx-auto h-full w-full ${cardMaxHeight}`} {...props}>
      <div className={`relative max-h-500 min-h-[30rem] w-full overflow-hidden bg-[grey] ${cardMinHeight}`}>
        {image}
      </div>

      {hasCardText && (
        <div
          className={`mx-auto block ${cardPosition} ${cardBottom} ${cardTop} ${overlayPosition === "right" ? "lg:right-36" : "lg:left-36"}`}
        >
          <div
            className={`card relative border border-solid border-black-10 bg-white leading-display text-black shadow ${cardMaxWidth}`}
          >
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
