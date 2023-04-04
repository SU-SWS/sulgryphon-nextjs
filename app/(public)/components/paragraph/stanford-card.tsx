'use client';

import Image from "next/image";

import {CardParagraph} from "@/lib/drupal/drupal";
import Card from "../patterns/card";
import HorizontalCard from "../patterns/horizontal-card";
import Oembed from "../patterns/oembed";

interface CardProps {
  paragraph: CardParagraph
  siblingCount?: number
  className?: string
}

const StanfordCard = ({paragraph, siblingCount, ...props}: CardProps) => {
  const isHorizontal = paragraph?.behavior_settings?.sul_card_styles?.orientation === 'horizontal';
  const videoUrl = paragraph?.su_card_media?.field_media_oembed_video;
  const imageUrl = paragraph?.su_card_media?.field_media_image?.uri?.url;

  props.className = `${props?.className ?? ''} ${isHorizontal ? '' : 'su-max-w-[980px]'}  su-mx-auto `;

  if (isHorizontal) {
    return (
      <HorizontalCard
        video={videoUrl && <Oembed url={videoUrl} className="su-h-full"/>}
        image={imageUrl && <Image
          className="su-object-cover su-object-center"
          src={paragraph?.su_card_media?.field_media_image.image_style_uri.breakpoint_2xl_2x}
          alt={paragraph?.su_card_media?.field_media_image.resourceIdObjMeta.alt}
          fill={true}
        />}
        header={paragraph.su_card_header}
        superHeader={paragraph.su_card_super_header}
        body={paragraph?.su_card_body?.processed}
        link={paragraph?.su_card_link}
        linkStyle={paragraph.behavior_settings?.sul_card_styles?.link_display_style}
        backgroundSprinkles={paragraph.behavior_settings?.sul_card_styles?.background_sprinkles}
        {...props}
      />
    )
  }
  return (
    <Card
      video={videoUrl && <Oembed url={videoUrl} className="su-h-full"/>}
      image={imageUrl && <Image
        className="su-object-cover su-object-center"
        src={paragraph?.su_card_media?.field_media_image.image_style_uri.breakpoint_2xl_2x}
        alt={paragraph?.su_card_media?.field_media_image.resourceIdObjMeta.alt}
        fill={true}
      />}
      header={paragraph.su_card_header}
      superHeader={paragraph.su_card_super_header}
      body={paragraph?.su_card_body?.processed}
      link={paragraph?.su_card_link}
      linkStyle={paragraph.behavior_settings?.sul_card_styles?.link_display_style}
      {...props}
    />
  )

}
export default StanfordCard;
