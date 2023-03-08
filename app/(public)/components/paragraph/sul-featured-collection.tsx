import Link from "next/link";
import {ChevronRightIcon} from "@heroicons/react/20/solid";

import {FeaturedCollectionParagraph} from "@/lib/drupal/drupal";
import Conditional from "@/components/utils/conditional";
import AboveHeaderBorder from "@/components/patterns/above-header-border";
import StanfordCard from "@/components/paragraph/stanford-card";
import Wave from "@/components/patterns/wave";

interface FeaturedCollectionProps {
  paragraph: FeaturedCollectionParagraph
  siblingCount?: number
}

const SulFeaturedCollection = ({paragraph, siblingCount = 1}: FeaturedCollectionProps) => {

  return (
    <section className="su-px-40 2xl:su-px-0 su-max-w-1500 su-mx-auto">
      {(paragraph.sul_collection__headline || paragraph.sul_collection__link?.url) &&
          <>
            <AboveHeaderBorder/>
            <header className="md:su-flex su-justify-between su-mb-80">
              <Conditional showWhen={paragraph.sul_collection__headline}>
                <h2 className="su-mb-0">{paragraph.sul_collection__headline}</h2>
              </Conditional>
              <Conditional showWhen={paragraph.sul_collection__link?.url}>
                <Link href={paragraph.sul_collection__link?.url ?? '#'} className="su-mt-auto">
                  {paragraph.sul_collection__link?.title}
                  <ChevronRightIcon className="su-inline" width={20}/>
                </Link>
              </Conditional>
            </header>
          </>
      }

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