import formatHtml from "@/lib/format-html";
import NodeCardDisplay from "@/components/node/node-card";
import {DrupalLinkButton} from "@/components/patterns/link";
import {PropsWithoutRef} from "react";
import AboveHeaderBorder from "@/components/patterns/above-header-border";
import {NodeUnion, Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal.d";
import {twMerge} from "tailwind-merge";

interface EntityProps extends PropsWithoutRef<any> {
  headline?: Maybe<string>
  description?: Maybe<string>
  link?: Maybe<LinkType>
  entities: NodeUnion[]
  headerId?: string
  styles?: {
    orientation?: Maybe<string>
    background?: Maybe<string>
  }
  hideHeading?: boolean
}

const StanfordEntity = async ({
  headerId,
  headline,
  description,
  link,
  styles,
  hideHeading,
  entities = [],
  ...props
}: EntityProps) => {

  const wrapperClasses = styles?.background === 'black' ? 'text-white py-40' : '';

  const linkAttributes: Record<string, string> = {};
  if (link?.attributes?.ariaLabel) linkAttributes['aria-label'] = link.attributes.ariaLabel;

  if (headerId && link?.attributes?.ariaLabel && link.attributes.ariaLabel === headline) {
    linkAttributes['aria-labelledby'] = headerId;
    delete linkAttributes['aria-label'];
  }

  const gridClasses = [
    '',
    '@7xl:grid-cols-2',
    '@7xl:grid-cols-2 @15xl:grid-cols-3',
  ]
  const gridClass = entities.length >= 3 ? gridClasses[2] : gridClasses[(entities.length % 3) - 1]

  return (
    <div className="@container relative centered" {...props}>
      <div className={wrapperClasses}>
        {headline &&
          <h2 id={headerId} className={twMerge("text-left type-5 mb-40", hideHeading && "sr-only")}>
            <AboveHeaderBorder/>
            {headline}
          </h2>
        }
        {description &&
          <div className="mb-40">{formatHtml(description)}</div>
        }

        {entities &&
          <div className={`mb-40 grid gap-[90px] ${gridClass}`} aria-live="polite">
            {entities.map(item =>
              <div key={item.id} className="mx-auto w-full">
                <NodeCardDisplay node={item} h3Heading={!!headline}/>
              </div>
            )}
          </div>
        }
        {link?.url &&
          <DrupalLinkButton href={link?.url} className="block mx-auto" {...linkAttributes}>
            {link.title}
          </DrupalLinkButton>
        }
      </div>
    </div>
  )

}


export default StanfordEntity;