"use client";

import {CollectionCardParagraph} from "@/lib/drupal/drupal";
import {PropsWithoutRef, useId} from "react";
import Conditional from "@/components/utils/conditional";
import AboveHeaderBorder from "@/components/patterns/above-header-border";
import Card from "@/components/patterns/card";
import Oembed from "@/components/patterns/elements/oembed";
import Image from "next/image";
import {Tabs} from "@/components/patterns/elements/tabs";
import {Item} from "react-stately";

interface CollectionProps extends PropsWithoutRef<any> {
  cards: CollectionCardParagraph[]
  heading?: string
  fullWidth?: boolean
}

const SulCollection = ({cards, heading, fullWidth = true, ...props}: CollectionProps) => {
  const elementId = useId()

  return (
    <section className="su-relative su-centered su-@container" aria-labelledby={`${elementId}-heading`} {...props}>
      <Conditional showWhen={heading}>
        <AboveHeaderBorder/>
        <h2 id={`${elementId}-heading`} className="su-type-5">{heading}</h2>
      </Conditional>


      <Tabs
        className="su-flex su-gap-lg"
        aria-labelledby={`${elementId}-heading`}
        orientation="vertical"
        tabListClass="@5xl:su-w-1/3"
        tabClass="su-py-20 su-pl-10 su-mb-2 su-w-full su-text-left hocus:su-underline su-cursor-pointer aria-selected:su-bg-archway aria-selected:su-text-white"
        tabPanelClass="@5xl:su-w-2/3"
      >
        {cards.map(card =>
          <Item
            key={'button-' + card.id}
            title={card.sul_card_info}
          >
            <CollectionCard
              header={card.sul_card.su_card_header}
              superHeader={card.sul_card.su_card_super_header}
              body={card.sul_card.su_card_body}
              link={card.sul_card.su_card_link}
              image={card.sul_card.su_card_media?.field_media_image}
              videoUrl={card.sul_card.su_card_media?.field_media_oembed_video}
              headerId={`${elementId}-card-${card.id}-header`}
            />
          </Item>
        )}
      </Tabs>
    </section>
  )
}

const CollectionCard = ({header, superHeader, body, link, image, videoUrl, headerId}) => {
  const imageUrl = image?.image_style_uri.breakpoint_2xl_2x;
  const imageAlt = image?.resourceIdObjMeta.alt ?? '';
  const placeholder = image?.uri.base64;

  return (
    <Card
      headerId={headerId}
      video={videoUrl && <Oembed url={videoUrl} className="su-h-full"/>}
      image={imageUrl && <Image
        className="su-object-cover su-object-center"
        src={imageUrl}
        alt={imageAlt}
        fill={true}
        placeholder={placeholder ? 'blur' : 'empty'}
        blurDataURL={placeholder}
      />}
      header={header}
      superHeader={superHeader}
      body={body}
      link={link}
    />
  )
}
export default SulCollection;