import {FeaturedCollectionParagraph} from "@/lib/drupal/drupal";
import Conditional from "@/components/utils/conditional";
import AboveHeaderBorder from "@/components/patterns/above-header-border";
import StanfordCard from "@/components/paragraph/stanford-card";
import Wave from "@/components/patterns/wave";
import {DrupalLink} from "@/components/patterns/link";

interface FeaturedCollectionProps {
  paragraph: FeaturedCollectionParagraph
  siblingCount?: number
}

const SulFeaturedCollection = ({paragraph, siblingCount = 1, ...props}: FeaturedCollectionProps) => {

  return (
    <section {...props}>
      <div className="su-max-w-1500 su-mx-auto su-px-40 2xl:su-px-0">
        {(paragraph.sul_collection__headline || paragraph.sul_collection__link?.url) &&
          <>
            <AboveHeaderBorder/>
            <header className="md:su-flex su-gap-2xl su-mb-80">

              <Conditional showWhen={paragraph.sul_collection__headline}>
                <h2 className="su-mb-0 su-type-5 su-flex-grow">{paragraph.sul_collection__headline}</h2>
              </Conditional>

              <div>
                <DrupalLink
                  url={paragraph.sul_collection__link?.url}
                  title={paragraph.sul_collection__link?.title}
                  style={paragraph.behavior_settings?.sul_feat_collections_styles?.link_display_style}
                />
              </div>
            </header>
          </>
        }

        <div className="su-relative">
          <ul className={"su-list-unstyled su-grid su-gap-xl " + (siblingCount > 0 ? '' : 'md:su-grid-cols-3')}>
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
      </div>
    </section>
  )
}
export default SulFeaturedCollection;