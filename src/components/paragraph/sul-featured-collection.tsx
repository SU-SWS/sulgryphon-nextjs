"use client"

import Wave from "@/components/patterns/wave"
import {DrupalLink} from "@/components/patterns/link"
import {HTMLAttributes, useRef} from "react"
import OnlyIfCentered from "@/components/utils/only-if-centered"
import Card from "@/components/patterns/card"
import Oembed from "@/components/patterns/elements/oembed"
import Image from "next/image"
import {buildUrl} from "@/lib/drupal/utils"
import {MediaImage, ParagraphStanfordCard, Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal.d"
import {twMerge} from "tailwind-merge"

type Props = HTMLAttributes<HTMLTableSectionElement> & {
  headline?: Maybe<string>
  link?: Maybe<LinkType>
  cards: ParagraphStanfordCard[]
  styles?: {
    link_display_style?: Maybe<string>
  }
  fullWidth?: Maybe<boolean>
  headerId?: string
}

const SulFeaturedCollection = ({headerId, headline, link, cards, styles, fullWidth = true, ...props}: Props) => {
  const ref = useRef(null)

  const linkAttributes: Record<string, string> = {}
  if (link?.attributes?.ariaLabel) linkAttributes["aria-label"] = link.attributes.ariaLabel

  if (headerId && link?.attributes?.ariaLabel && link.attributes.ariaLabel === headline) {
    linkAttributes["aria-labelledby"] = headerId
    delete linkAttributes["aria-label"]
  }

  return (
    <section className="centered relative" ref={ref} {...props}>
      {headline && (
        <header className="mb-40 flex flex-row items-center justify-between gap-16">
          <h2 id={headerId} className="mb-0 shrink-0">
            {headline}
          </h2>
        </header>
      )}

      <div className="relative @container">
        <ul className="list-unstyled grid gap-xl @7xl:grid-cols-3">
          {cards.map(card => (
            <li key={card.id}>
              <CollectionCard
                header={card.suCardHeader}
                superHeader={card.suCardSuperHeader}
                body={card.suCardBody?.processed}
                link={card.suCardLink}
                image={card.suCardMedia?.__typename === "MediaImage" ? card.suCardMedia : undefined}
                videoUrl={card.suCardMedia?.__typename === "MediaVideo" ? card.suCardMedia.mediaOembedVideo : undefined}
              />
            </li>
          ))}
        </ul>

        {fullWidth && (
          <div className="absolute left-0 top-[130px] z-[-10] ml-[calc(-50vw+50%)] h-[calc(100%-260px)] w-screen bg-black-10">
            <div className="relative flex h-full w-full flex-col">
              <Wave className="rotate-180 -scale-x-100 transform" />
              <div className="flex-grow" />
              <Wave className="-scale-x-100 transform" />
            </div>
          </div>
        )}

        {!fullWidth && (
          <OnlyIfCentered elem={ref}>
            <div className="absolute left-0 top-[130px] z-[-10] ml-[calc(-50vw+50%)] h-[calc(100%-260px)] w-screen bg-black-10">
              <div className="relative flex h-full w-full flex-col">
                <Wave className="rotate-180 -scale-x-100 transform" />
                <div className="flex-grow" />
                <Wave className="-scale-x-100 transform" />
              </div>
            </div>
          </OnlyIfCentered>
        )}
      </div>

      {link?.url && (
        <DrupalLink
          {...linkAttributes}
          url={link?.url}
          title={link?.title}
          linkStyle={styles?.link_display_style}
          className={twMerge("mx-auto mt-0 mt-40", linkAttributes?.className)}
        />
      )}
    </section>
  )
}

const CollectionCard = ({
  header,
  superHeader,
  body,
  link,
  image,
  videoUrl,
}: {
  header?: Maybe<string>
  superHeader?: Maybe<string>
  body?: Maybe<string>
  link?: Maybe<LinkType>
  image?: Maybe<MediaImage>
  videoUrl?: Maybe<string>
}) => {
  const imageUrl = image?.mediaImage.url
  const imageAlt = image?.mediaImage.alt || ""

  return (
    <Card
      video={videoUrl && <Oembed url={videoUrl} className="h-full" />}
      image={
        imageUrl && (
          <Image
            className="object-cover object-center"
            src={buildUrl(imageUrl).toString()}
            alt={imageAlt}
            fill
            sizes="(max-width: 1700px) 100vw, 1500px"
          />
        )
      }
      header={header}
      superHeader={superHeader}
      body={body}
      link={link}
      headingLevel="h3"
    />
  )
}

export default SulFeaturedCollection
