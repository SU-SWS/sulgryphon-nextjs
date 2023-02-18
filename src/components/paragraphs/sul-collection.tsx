import {CollectionParagraph} from "../../types/drupal";
import {StanfordCard} from "@/components/paragraphs/stanford-card";
import {useEffect, useId, useState} from "react";
import {AboveHeaderBorder} from "@/components/simple/above-header-border";
import Conditional from "@/components/simple/conditional";

interface CollectionProps {
  paragraph: CollectionParagraph
  siblingCount?: number
}

export const SulCollection = ({paragraph, siblingCount}: CollectionProps) => {
  const elementId = useId()
  const [displayedCard, setDisplayedCard] = useState(paragraph.sul_collection_card[0].id)

  useEffect(() => {
    // Avoid settings the focus when rendering the component.
    if (document.activeElement.id === elementId + 'button-' + displayedCard) {
      document.getElementById(elementId + 'card-' + displayedCard).focus();
    }
  }, [displayedCard])

  return (
    <section aria-labelledby={paragraph.id}>
      <Conditional showWhen={paragraph.sul_collection_heading}>
        <AboveHeaderBorder/>
        <h2 id={paragraph.id}>{paragraph.sul_collection_heading}</h2>
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
