import {ReactNodeLike} from "prop-types";

import formatHtml from "@/lib/format-html";
import {DrupalLink} from "@/components/patterns/link";
import {ElementType} from "react";
import {Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal";

interface CardProps {
  video?: Maybe<ReactNodeLike>
  image?: Maybe<ReactNodeLike>
  superHeader?: Maybe<any>
  header?: Maybe<any>
  footer?: Maybe<ReactNodeLike>
  body?: Maybe<string>
  link?: Maybe<LinkType>
  linkStyle?: Maybe<string>
  className?: Maybe<string>
  headerId?: string
  headingLevel?: Maybe<string>
}

const Card = ({
  headerId,
  video,
  image,
  superHeader,
  header,
  footer,
  body,
  link,
  linkStyle,
  headingLevel = 'h3'
}: CardProps) => {
  const Heading: ElementType = headingLevel === 'h2' ? 'h2' : 'h3';

  const linkAttributes: Record<string, string> = {};
  if (link?.attributes?.ariaLabel) linkAttributes['link-attributes'] = link.attributes.ariaLabel;

  if (headerId && link?.attributes?.ariaLabel && link.attributes.ariaLabel === header) {
    linkAttributes['aria-labelledby'] = headerId;
    delete linkAttributes['aria-label'];
  }
  return (
    <div
      className="card block w-full basefont-23 leading-display bg-white text-black border border-solid border-black-10 shadow-md">

      {(image) &&
        <div className="overflow-hidden aspect-[16/9] relative" aria-hidden="true">
          {image}
        </div>
      }

      {(video) &&
        <div className="overflow-hidden aspect-[16/9] relative">
          {video}
        </div>
      }

      <div className="card-body items-start rs-px-2 rs-pt-2 rs-pb-4">
        {(superHeader) &&
          <span className="type-0 mb-0 leading-display font-bold">
              {superHeader}
            </span>
        }

        {(header) &&
          <Heading id={headerId} className="leading-tight font-bold type-2 mb-03em">
            {header}
          </Heading>
        }

        {(body) &&
          <div>
            {formatHtml(body)}
          </div>
        }

        {(footer) &&
          <div className="leading-display text-18 rs-pt-0 font-normal">
            {footer}
          </div>
        }

        {link?.url &&
          <DrupalLink
            url={link.url}
            title={link.title}
            style={linkStyle}
            {...linkAttributes}
          />
        }
      </div>
    </div>
  )

}
export default Card;
