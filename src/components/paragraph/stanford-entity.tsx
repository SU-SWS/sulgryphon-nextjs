import formatHtml from "@/lib/format-html";
import NodeCardDisplay from "@/components/node/node-card";
import {DrupalLinkButton} from "@/components/patterns/link";
import {PropsWithoutRef} from "react";
import {DrupalLinkType, StanfordNode} from "@/lib/drupal/drupal";
import {DrupalNode} from "next-drupal";
import AboveHeaderBorder from "@/components/patterns/above-header-border";
import fetchComponents from "@/lib/fetch-components";

interface EntityProps extends PropsWithoutRef<any> {
  headline?: string
  description?: string
  link?: DrupalLinkType
  entities: DrupalNode[]
  fullWidth?: boolean
  headerId?: string
  styles?: {
    orientation?: string
    background?: string
  }
}

const StanfordEntity = async ({headerId, headline, description, link, styles, entities = [], fullWidth = true, ...props}: EntityProps) => {
  const items = await fetchComponents<StanfordNode>(entities || []);
  const entityItems = items.filter(item => !!item?.id)

  const wrapperClasses = styles?.background === 'black' ? 'text-white py-40' : '';

  if (headerId && link?.options?.attributes?.['aria-label'] && link?.options?.attributes?.['aria-label'] === headline) {
    link.options.attributes['aria-labelledby'] = headerId;
    delete link?.options?.attributes?.['aria-label'];
  }

  const gridClasses = [
    '',
    '@7xl:grid-cols-1-1',
    '@7xl:grid-cols-1-1 @15xl:grid-cols-1-1-1',
  ]
  const gridClass = entityItems.length >= 3 ? gridClasses[2] : gridClasses[(entityItems.length % 3) - 1]

  return (
    <div className="@container relative centered" {...props}>
      <div className={wrapperClasses}>
        {headline &&
          <h2 id={headerId} className="text-left type-5 mb-40">
            <AboveHeaderBorder/>
            {headline}
          </h2>
        }
        {description &&
          <div className="mb-40">{formatHtml(description)}</div>
        }

        {entities &&
          <div className={`mb-40 grid gap-[90px] ${gridClass}`} aria-live="polite">
            {entityItems.map((item, i) =>
              <div key={item.id} className="mx-auto w-full">
                <NodeCardDisplay node={item} h3Heading={!!headline}/>
              </div>
            )}
          </div>
        }
        {link?.url &&
          <DrupalLinkButton href={link?.url} className="block mx-auto" {...link.options?.attributes}>
            {link.title}
          </DrupalLinkButton>
        }
      </div>
    </div>
  )

}


export default StanfordEntity;