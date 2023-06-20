"use client";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {CollectionCardParagraph} from "@/lib/drupal/drupal";
import {PropsWithoutRef, useId} from "react";
import Conditional from "@/components/utils/conditional";
import AboveHeaderBorder from "@/components/patterns/above-header-border";
import Card from "@/components/patterns/card";
import Oembed from "@/components/patterns/oembed";
import Image from "next/image";

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

      <Tabs className="su-w-full su-flex su-flex-col su-gap-lg @5xl:su-flex-row" selectedTabClassName="su-bg-archway su-text-white">
        <TabList className="@5xl:su-w-1/3 su-list-unstyled" aria-labelledby={`${elementId}-heading`} aria-orientation="vertical">
          {cards.map(card =>
            <Tab
              key={'button-' + card.id}
              className="su-py-20 su-pl-10 su-mb-2 su-w-full su-text-left hocus:su-underline su-cursor-pointer"
            >
              {card.sul_card_info}
            </Tab>
          )}
        </TabList>

        <div className="@5xl:su-w-2/3">
          {cards.map(card =>
            <TabPanel key={'card-' + card.id}>
              <CollectionCard
                header={card.sul_card.su_card_header}
                superHeader={card.sul_card.su_card_super_header}
                body={card.sul_card.su_card_body}
                link={card.sul_card.su_card_link}
                image={card.sul_card.su_card_media?.field_media_image}
                videoUrl={card.sul_card.su_card_media?.field_media_oembed_video}
                headerId={`${elementId}-card-${card.id}-header`}
              />
            </TabPanel>
          )}
        </div>
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