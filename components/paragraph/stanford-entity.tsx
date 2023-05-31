import formatHtml from "@/lib/format-html";
import NodeCardDisplay from "@/components/node/node-card";
import {DrupalLinkButton} from "@/components/patterns/link";
import {PropsWithoutRef} from "react";
import {DrupalLinkType} from "@/lib/drupal/drupal";
import {DrupalNode} from "next-drupal";
import AboveHeaderBorder from "@/components/patterns/above-header-border";
import fetchComponents from "@/lib/fetch-components";

interface EntityProps extends PropsWithoutRef<any> {
  headline?: string
  description?: string
  link?: DrupalLinkType
  entities: DrupalNode[]
  fullWidth?: boolean
  styles?: {
    orientation?: string
    background
  }
}

const StanfordEntity = async ({headline, description, link, styles, entities = [], fullWidth = true, ...props}: EntityProps) => {
  const items = await fetchComponents<DrupalNode[]>(entities ?? []);
  const entityItems = items.filter(item => item)

  const wrapperClasses = styles?.background === 'black' ? 'su-text-white su-py-40' : '';

  return (
    // @ts-ignore
    <div className="su-@container su-relative su-centered" {...props}>
      <div className={wrapperClasses}>
        {headline &&
          <h2 className="su-text-left su-type-5 su-mb-40">
            <AboveHeaderBorder/>
            {headline}
          </h2>
        }
        {description &&
          <div className="su-mb-40">{formatHtml(description)}</div>
        }

        {entities &&
          <div className="su-mb-40 su-flex su-flex-wrap su-gap-2xl su-justify-around" aria-live="polite">
            {entityItems.map((item, i) =>
              <div key={item.id} className="su-min-w-[250px] @6xl:su-min-w-[400px] su-flex-1">
                <NodeCardDisplay node={item}/>
              </div>
            )}
          </div>
        }
        {link?.url &&
          <DrupalLinkButton href={link?.url} className="su-block su-mx-auto" {...link.options?.attributes}>
            {link.title}
          </DrupalLinkButton>
        }
      </div>
    </div>
  )

}


export default StanfordEntity;