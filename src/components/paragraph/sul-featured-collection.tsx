"use client";

import AboveHeaderBorder from "@/components/patterns/above-header-border";
import Wave from "@/components/patterns/wave";
import {DrupalLink} from "@/components/patterns/link";
import {HTMLAttributes, useRef} from "react";
import OnlyIfCentered from "@/components/utils/only-if-centered";
import Card from "@/components/patterns/card";
import Oembed from "@/components/patterns/elements/oembed";
import Image from "next/image";
import {buildUrl} from "@/lib/drupal/utils";
import {MediaImage, ParagraphStanfordCard, Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal.d";

type Props = HTMLAttributes<HTMLTableSectionElement> & {
  headline?: Maybe<string>
  link?: Maybe<LinkType>
  cards: ParagraphStanfordCard[]
  styles?: {
    link_display_style?: Maybe<string>
  }
  fullWidth?: Maybe<boolean>
  headerId?: string
}

const SulFeaturedCollection = ({headerId, headline, link, cards, styles, fullWidth = true, ...props}: Props) => {
  const ref = useRef(null);

  const linkAttributes: Record<string, string> = {};
  if (link?.attributes?.ariaLabel) linkAttributes['aria-label'] = link.attributes.ariaLabel;

  if (headerId && link?.attributes?.ariaLabel && link.attributes.ariaLabel === headline) {
    linkAttributes['aria-labelledby'] = headerId;
    delete linkAttributes['aria-label'];
  }


  return (
    <section
      className="relative centered"
      ref={ref}
      {...props}
    >
      {(headline || link?.url) &&
        <>
          <AboveHeaderBorder/>
          <header className="md:flex gap-2xl mb-80">

            {(headline) &&
              <h2 id={headerId} className="mb-0 type-5 flex-grow">{headline}</h2>
            }

            {link?.url &&
              <div>
                <DrupalLink
                  url={link?.url}
                  title={link?.title}
                  style={styles?.link_display_style}
                  {...linkAttributes}
                />
              </div>
            }
          </header>
        </>
      }

      <div className="@container relative">
        <ul className="list-unstyled grid gap-xl @7xl:grid-cols-3">
          {cards.map(card =>
            <li key={card.id}>
              <CollectionCard
                header={card.suCardHeader}
                superHeader={card.suCardSuperHeader}
                body={card.suCardBody?.processed}
                link={card.suCardLink}
                image={card.suCardMedia?.__typename === 'MediaImage' ? card.suCardMedia : undefined}
                videoUrl={card.suCardMedia?.__typename === 'MediaVideo' ? card.suCardMedia.mediaOembedVideo : undefined}
              />
            </li>
          )}

        </ul>

        {fullWidth &&
          <div
            className="absolute z-[-10] w-screen h-[calc(100%-260px)] top-[130px] left-0 ml-[calc(-50vw+50%)] bg-black-10">
            <div className="relative w-full h-full flex flex-col">
              <Wave className="rotate-180 transform -scale-x-100"/>
              <div className="flex-grow"/>
              <Wave className="transform -scale-x-100"/>
            </div>
          </div>
        }

        {!fullWidth &&
          <OnlyIfCentered elem={ref}>
            <div
              className="absolute z-[-10] w-screen h-[calc(100%-260px)] top-[130px] left-0 ml-[calc(-50vw+50%)] bg-black-10">
              <div className="relative w-full h-full flex flex-col">
                <Wave className="rotate-180 transform -scale-x-100"/>
                <div className="flex-grow"/>
                <Wave className="transform -scale-x-100"/>
              </div>
            </div>
          </OnlyIfCentered>
        }
      </div>
    </section>
  )
}

const CollectionCard = ({header, superHeader, body, link, image, videoUrl}: {
  header?: Maybe<string>
  superHeader?: Maybe<string>
  body?: Maybe<string>
  link?: Maybe<LinkType>
  image?: Maybe<MediaImage>
  videoUrl?: Maybe<string>
}) => {
  const imageUrl = image?.mediaImage.url
  const imageAlt = image?.mediaImage.alt || '';

  return (
    <Card
      video={videoUrl && <Oembed url={videoUrl} className="h-full"/>}
      image={imageUrl && <Image
        className="object-cover object-center"
        src={buildUrl(imageUrl).toString()}
        alt={imageAlt}
        fill
        sizes="(max-width: 1700px) 100vw, 1500px"
      />}
      header={header}
      superHeader={superHeader}
      body={body}
      link={link}
    />
  )
}

export default SulFeaturedCollection;