"use client";

import {CollectionCardParagraph} from "@/lib/drupal/drupal";
import {PropsWithoutRef, useEffect, useId, useState} from "react";
import Conditional from "../utils/conditional";
import AboveHeaderBorder from "../patterns/above-header-border";
import StanfordCard from "./stanford-card";

interface CollectionProps extends PropsWithoutRef<any> {
  cards: CollectionCardParagraph[]
  heading?: string
  siblingCount?: number
}

const SulCollection = ({cards, heading, siblingCount = 0, ...props}: CollectionProps) => {
  const elementId = useId()
  const [displayedCard, setDisplayedCard] = useState(cards[0].id)

  useEffect(() => {
    // Avoid settings the focus when rendering the component.
    if (document?.activeElement && document.activeElement.id === elementId + 'button-' + displayedCard) {
      document.getElementById(elementId + 'card-' + displayedCard)?.focus();
    }
  }, [displayedCard])

  console.log(cards);
  return (
    <section aria-labelledby={`${elementId}-heading`} {...props}>
      <Conditional showWhen={heading}>
        <AboveHeaderBorder/>
        <h2 id={`${elementId}-heading`} className="su-type-5">{heading}</h2>
      </Conditional>

      <div className={"su-gap-lg " + (siblingCount > 0 ? '' : 'lg:su-flex')}>
        <ul className={"su-list-unstyled " + (siblingCount > 0 ? '' : 'lg:su-w-1/3')}>
          {cards.map(card =>
            <li key={'button-' + card.id}>
              <button
                id={elementId + 'button-' + card.id}
                className={"su-py-20 su-pl-10 su-mb-2 su-w-full su-text-left " + (displayedCard === card.id ? 'su-bg-black-20 su-text-archway-light' : '')}
                onClick={() => setDisplayedCard(card.id)}
              >
                {card.sul_card_info}
              </button>
            </li>
          )}
        </ul>

        <ul className={"su-list-unstyled " + (siblingCount > 0 ? '' : 'lg:su-w-2/3')}>
          {cards.map(card =>
            <li
              key={'card-' + card.id}
              id={elementId + 'card-' + card.id}
              className={displayedCard === card.id ? 'su-block' : 'su-hidden'}
              tabIndex={-1}
            >
              <StanfordCard
                header={card.sul_card.su_card_header}
                superHeader={card.sul_card.su_card_super_header}
                body={card.sul_card.su_card_body}
                link={card.sul_card.su_card_link}
                image={card.sul_card.su_card_media?.field_media_image}
                videoUrl={card.sul_card.su_card_media?.field_media_oembed_video}
              />
            </li>
          )}
        </ul>
      </div>
    </section>
  )
}
export default SulCollection;