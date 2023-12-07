"use client";

import Conditional from "@/components/utils/conditional";
import AboveHeaderBorder from "@/components/patterns/above-header-border";
import Wave from "@/components/patterns/wave";
import {DrupalLink} from "@/components/patterns/link";
import {CardParagraph, DrupalLinkType} from "@/lib/drupal/drupal"
import {PropsWithoutRef, useRef} from "react";
import OnlyIfCentered from "@/components/utils/only-if-centered";
import Card from "@/components/patterns/card";
import Oembed from "@/components/patterns/elements/oembed";
import Image from "next/image";

interface Props extends PropsWithoutRef<any> {
  headline?: string
  link?: DrupalLinkType
  cards: CardParagraph[]
  styles?: {
    link_display_style?: string
  }
  fullWidth?: boolean
  headerId?: string
}

const SulFeaturedCollection = ({headerId, headline, link, cards, styles, fullWidth = true, ...props}: Props) => {
  const ref = useRef(null);

  if (headerId && link?.options?.attributes?.['aria-label'] && link?.options?.attributes?.['aria-label'] === headline) {
    link.options.attributes['aria-labelledby'] = headerId;
    delete link?.options?.attributes?.['aria-label'];
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

            <Conditional showWhen={headline}>
              <h2 id={headerId} className="mb-0 type-5 flex-grow">{headline}</h2>
            </Conditional>

            <div>
              <DrupalLink
                url={link?.url}
                title={link?.title}
                style={styles?.link_display_style}
                {...link?.options?.attributes}
              />
            </div>
          </header>
        </>
      }

      <div className="@container relative">
        <ul className="list-unstyled grid gap-xl @7xl:grid-cols-3">
          {cards.map(card =>
            <li key={card.id}>
              <CollectionCard
                header={card.su_card_header}
                superHeader={card.su_card_super_header}
                body={card.su_card_body}
                link={card.su_card_link}
                image={card?.su_card_media?.field_media_image}
                videoUrl={card?.su_card_media?.field_media_oembed_video}
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

const CollectionCard = ({header, superHeader, body, link, image, videoUrl}) => {
  const imageUrl = image?.image_style_uri.breakpoint_2xl_2x;
  const imageAlt = image?.resourceIdObjMeta.alt ?? '';
  const placeholder = image?.uri.base64;

  return (
    <Card
      video={videoUrl && <Oembed url={videoUrl} className="h-full"/>}
      image={imageUrl && <Image
        className="object-cover object-center"
        src={imageUrl}
        alt={imageAlt}
        fill={true}
        placeholder={placeholder ? 'blur' : 'empty'}
        blurDataURL={placeholder}
      />}
      header={header}
      superHeader={superHeader}
      body={body}
      link={link}
    />
  )
}

export default SulFeaturedCollection;