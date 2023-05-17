"use client";

import Conditional from "@/components/utils/conditional";
import AboveHeaderBorder from "@/components/patterns/above-header-border";
import Wave from "@/components/patterns/wave";
import {DrupalLink} from "@/components/patterns/link";
import {CardParagraph, DrupalLink as DrupalLinkProps} from "@/lib/drupal/drupal"
import {PropsWithoutRef, useRef} from "react";
import OnlyIfCentered from "@/components/utils/only-if-centered";
import Card from "@/components/patterns/card";
import Oembed from "@/components/patterns/oembed";
import Image from "next/image";

interface Props extends PropsWithoutRef<any> {
  headline?: string
  link?: DrupalLinkProps
  cards: CardParagraph[]
  styles?: {
    link_display_style?: string
  }
  fullWidth?: boolean
}

const SulFeaturedCollection = ({headline, link, cards, styles, fullWidth = true, ...props}: Props) => {
  const ref = useRef(null);

  return (
    <section
      className="su-relative su-cc"
      ref={ref}
      {...props}
    >
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

      <div className="su-@container su-relative">
        <ul className="su-list-unstyled su-grid su-gap-xl @7xl:su-grid-cols-3">
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
            className="su-absolute su-z-[-10] su-w-screen su-h-[calc(100%-260px)] su-top-[130px] su-left-0 su-ml-[calc(-50vw+50%)] su-bg-black-10">
            <div className="su-relative su-w-full su-h-full su-flex su-flex-col">
              <Wave className="su-rotate-180 su-transform su--scale-x-100"/>
              <div className="su-flex-grow"/>
              <Wave className="su-transform su--scale-x-100"/>
            </div>
          </div>
        }

        {!fullWidth &&
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
      video={videoUrl && <Oembed url={videoUrl} className="su-h-full"/>}
      image={imageUrl && <Image
        className="su-object-cover su-object-center"
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