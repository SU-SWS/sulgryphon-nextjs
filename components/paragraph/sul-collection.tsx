"use client";

import {CollectionCardParagraph} from "@/lib/drupal/drupal";
import {PropsWithoutRef, useEffect, useId, useState} from "react";
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
  const [displayedCard, setDisplayedCard] = useState(cards[0].id)

  useEffect(() => {
    // Avoid settings the focus when rendering the component.
    if (document?.activeElement && document.activeElement.id === elementId + 'button-' + displayedCard) {
      document.getElementById(elementId + 'card-' + displayedCard)?.focus();
    }
  }, [displayedCard])

  return (
    <section className="su-relative su-centered su-@container" aria-labelledby={`${elementId}-heading`} {...props}>
      <Conditional showWhen={heading}>
        <AboveHeaderBorder/>
        <h2 id={`${elementId}-heading`} className="su-type-5">{heading}</h2>
      </Conditional>

      <div className="su-w-full su-flex su-flex-col su-gap-lg @5xl:su-flex-row">
        <div className="@5xl:su-w-1/3" role="tablist" aria-labelledby={`${elementId}-heading`}>
          {cards.map(card =>
            <button
              type="button"
              key={'button-' + card.id}
              id={elementId + 'button-' + card.id}
              className={"su-py-20 su-pl-10 su-mb-2 su-w-full su-text-left " + (displayedCard === card.id ? 'su-bg-archway su-text-white su-underline hocus:su-no-underline' : 'hocus:su-underline')}
              onClick={() => setDisplayedCard(card.id)}
              aria-selected={displayedCard === card.id}
              role="tab"
              aria-controls={elementId + 'card-' + card.id}
            >
              {card.sul_card_info}
            </button>
          )}
        </div>

        <div className="@5xl:su-w-2/3">
          {cards.map(card =>
            <div
              key={'card-' + card.id}
              id={elementId + 'card-' + card.id}
              className={displayedCard === card.id ? 'su-block' : 'su-hidden'}
              tabIndex={-1}
              role="tabpanel"
              aria-labelledby={elementId + 'button-' + card.id}
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
            </div>
          )}
        </div>
      </div>
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