"use client";

import {HTMLAttributes, useId} from "react";
import AboveHeaderBorder from "@/components/patterns/above-header-border";
import Card from "@/components/patterns/card";
import Oembed from "@/components/patterns/elements/oembed";
import Image from "next/image";
import {Tabs} from "@/components/patterns/elements/tabs";
import {Item} from "react-stately";
import {buildUrl} from "@/lib/drupal/utils";
import {Maybe, MediaImage, ParagraphCollectionCard, Link as LinkType} from "@/lib/gql/__generated__/drupal";

type Props = HTMLAttributes<HTMLDivElement> & {
  cards?: Maybe<ParagraphCollectionCard[]>
  heading?: Maybe<string>
}

const SulCollection = ({cards, heading, ...props}: Props) => {
  const elementId = useId()

  return (
    <section className="relative centered @container" aria-labelledby={`${elementId}-heading`} {...props}>
      {heading &&
        <>
          <AboveHeaderBorder/>
          <h2 id={`${elementId}-heading`} className="type-5">{heading}</h2>
        </>
      }


      <Tabs
        className="flex gap-lg"
        aria-labelledby={`${elementId}-heading`}
        orientation="vertical"
        tabListClass="@5xl:w-1/3"
        tabClass="py-20 pl-10 mb-2 w-full text-left hocus:underline cursor-pointer aria-selected:bg-archway aria-selected:text-white"
        tabPanelClass="@5xl:w-2/3"
      >
        {cards?.map(card =>
          <Item
            key={'button-' + card.id}
            title={card.sulCardInfo}
          >
            <CollectionCard
              header={card.sulCard?.suCardHeader}
              superHeader={card.sulCard?.suCardSuperHeader}
              body={card.sulCard?.suCardBody?.processed}
              link={card.sulCard?.suCardLink}
              image={card.sulCard?.suCardMedia?.__typename === 'MediaImage' ? card.sulCard.suCardMedia : undefined}
              videoUrl={card.sulCard?.suCardMedia?.__typename === 'MediaVideo' ? card.sulCard.suCardMedia.mediaOembedVideo : undefined}
              headerId={`${elementId}-card-${card.id}-header`}
            />
          </Item>
        )}
      </Tabs>
    </section>
  )
}

const CollectionCard = ({header, superHeader, body, link, image, videoUrl, headerId}: {
  header?: Maybe<string>
  superHeader?: Maybe<string>
  body?: Maybe<string>
  link?: Maybe<LinkType>
  image?: MediaImage
  videoUrl?: Maybe<string>
  headerId?: string
}) => {
  const imageUrl = image?.mediaImage.url
  const imageAlt = image?.mediaImage.alt || '';

  return (
    <Card
      headerId={headerId}
      video={videoUrl && <Oembed url={videoUrl} className="h-full"/>}
      image={imageUrl && <Image
        className="object-cover object-center"
        src={buildUrl(imageUrl).toString()}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 1500px"
      />}
      header={header}
      superHeader={superHeader}
      body={body}
      link={link}
    />
  )
}
export default SulCollection;