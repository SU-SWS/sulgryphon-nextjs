"use client";

import {CollectionParagraph} from "@/lib/drupal/drupal";
import {useEffect, useId, useState} from "react";
import Conditional from "../utils/conditional";
import AboveHeaderBorder from "../patterns/above-header-border";
import StanfordCard from "./stanford-card";

interface CollectionProps {
  paragraph: CollectionParagraph
  siblingCount?: number
}

const SulCollection = ({paragraph, siblingCount = 0}: CollectionProps) => {
  const elementId = useId()
  const [displayedCard, setDisplayedCard] = useState(paragraph.sul_collection_card[0].id)

  useEffect(() => {
    // Avoid settings the focus when rendering the component.
    if (document?.activeElement && document.activeElement.id === elementId + 'button-' + displayedCard) {
      document.getElementById(elementId + 'card-' + displayedCard)?.focus();
    }
  }, [displayedCard])

  return (
    <section aria-labelledby={paragraph.id}>
      <Conditional showWhen={paragraph.sul_collection_heading}>
        <AboveHeaderBorder/>
        <h2 id={paragraph.id} className="su-type-5">{paragraph.sul_collection_heading}</h2>
      </Conditional>

      <div className={"su-gap-lg " + (siblingCount > 0 ? '' : 'lg:su-flex')}>
        <ul className={"su-list-unstyled " + (siblingCount > 0 ? '' : 'lg:su-w-1/3')}>
          {paragraph.sul_collection_card.map(card =>
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
          {paragraph.sul_collection_card.map(card =>
            <li key={'card-' + card.id} id={elementId + 'card-' + card.id}
                className={displayedCard === card.id ? 'su-block' : 'su-hidden'} tabIndex={-1}>
              <StanfordCard paragraph={card.sul_card}/>
            </li>
          )}
        </ul>
      </div>
    </section>
  )
}
export default SulCollection;