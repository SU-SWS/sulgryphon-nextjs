import Link from "next/link";
import {ChevronRightIcon} from "@heroicons/react/20/solid";

import {FeaturedCollectionParagraph} from "../../../src/types/drupal";
import Conditional from "../utils/conditional";
import AboveHeaderBorder from "../patterns/above-header-border";
import StanfordCard from "./stanford-card";
import Wave from "../patterns/wave";

interface FeaturedCollectionProps {
  paragraph: FeaturedCollectionParagraph
  siblingCount?: number
}

const SulFeaturedCollection = async ({paragraph, siblingCount}: FeaturedCollectionProps) => {

  return (
    <section className="su-max-w-1500 su-mx-auto">
      <Conditional showWhen={paragraph.sul_collection__headline || paragraph.sul_collection__link.url}>
        <AboveHeaderBorder/>
        <header className="md:su-flex su-justify-between su-mb-80">
          <Conditional showWhen={paragraph.sul_collection__headline}>
            <h2 className="su-mb-0">{paragraph.sul_collection__headline}</h2>
          </Conditional>
          <Conditional showWhen={paragraph.sul_collection__link.url}>
            <Link href={paragraph.sul_collection__link.url} className="su-mt-auto">
              {paragraph.sul_collection__link.title}
              <ChevronRightIcon className="su-inline" width={20}/>
            </Link>
          </Conditional>
        </header>
      </Conditional>

      <div className="su-relative">
        <ul className={"su-list-unstyled su-grid-cols-3 su-gap-xl " + (siblingCount > 0 ? '' : 'md:su-grid')}>
          {paragraph.sul_collection__cards.map(card =>
            <li key={card.id}>
              <StanfordCard paragraph={card}/>
            </li>
          )}

        </ul>

        <div
          className="su-absolute su-z-[-10] su-w-screen su-h-[calc(100%-260px)] su-top-[130px] su-left-0 su-ml-[calc(-50vw+50%)] su-bg-black-10">
          <div className="su-relative su-w-full su-h-full su-flex su-flex-col">
            <Wave className="su-rotate-180 su-transform su--scale-x-100"/>
            <div className="su-flex-grow"/>
            <Wave className="su-transform su--scale-x-100"/>
          </div>
        </div>
      </div>

    </section>
  )
}
export default SulFeaturedCollection;