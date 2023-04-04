"use client";

import Conditional from "@/components/utils/conditional";
import AboveHeaderBorder from "@/components/patterns/above-header-border";
import StanfordCard from "@/components/paragraph/stanford-card";
import Wave from "@/components/patterns/wave";
import {DrupalLink} from "@/components/patterns/link";
import {CardParagraph, DrupalLink as DrupalLinkProps} from "@/lib/drupal/drupal"
import {PropsWithoutRef, useRef} from "react";
import OnlyIfCentered from "@/components/utils/only-if-centered";

interface Props extends PropsWithoutRef<any> {
  headline?: string
  link?: DrupalLinkProps
  cards: CardParagraph[]
  styles?: {
    link_display_style?: string
  }
  siblingCount?: number
}

const SulFeaturedCollection = ({headline, link, cards, styles, siblingCount = 1, ...props}: Props) => {
  const ref = useRef(null);

  return (
    <section {...props}>
      <div ref={ref} className="su-max-w-1500 su-mx-auto su-px-40 2xl:su-px-0">
        {(headline || link?.url) &&
          <>
            <AboveHeaderBorder/>
            <header className="md:su-flex su-gap-2xl su-mb-80">

              <Conditional showWhen={headline}>
                <h2 className="su-mb-0 su-type-5 su-flex-grow">{headline}</h2>
              </Conditional>

              <div>
                <DrupalLink
                  url={link?.url}
                  title={link?.title}
                  style={styles?.link_display_style}
                />
              </div>
            </header>
          </>
        }

        <div className="su-relative">
          <ul className={"su-list-unstyled su-grid su-gap-xl " + (siblingCount > 0 ? '' : 'md:su-grid-cols-3')}>
            {cards.map(card =>
              <li key={card.id}>
                <StanfordCard paragraph={card}/>
              </li>
            )}

          </ul>

          <OnlyIfCentered elem={ref}>
            <div
              className="su-absolute su-z-[-10] su-w-screen su-h-[calc(100%-260px)] su-top-[130px] su-left-0 su-ml-[calc(-50vw+50%)] su-bg-black-10">
              <div className="su-relative su-w-full su-h-full su-flex su-flex-col">
                <Wave className="su-rotate-180 su-transform su--scale-x-100"/>
                <div className="su-flex-grow"/>
                <Wave className="su-transform su--scale-x-100"/>
              </div>
            </div>
          </OnlyIfCentered>
        </div>
      </div>
    </section>
  )
}
export default SulFeaturedCollection;