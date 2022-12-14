import Image from "next/image";

import {CardParagraph} from "../../types/drupal";
import {Card} from "@/components/patterns/card";
import Oembed from "@/components/simple/oembed";

interface CardProps {
  paragraph: CardParagraph
  siblingCount?: number
  className?: string
}

export const StanfordCard = ({paragraph, siblingCount, ...props}: CardProps) => {

  const videoUrl = paragraph?.su_card_media?.field_media_oembed_video;
  const imageUrl = paragraph?.su_card_media?.field_media_image?.uri?.url;

  let video = null
  let image = null


  if (videoUrl) {
    video = <Oembed url={videoUrl} className="su-h-full"/>
  } else if (imageUrl) {
    image = <Image
      className="su-object-cover su-object-center"
      src={paragraph?.su_card_media?.field_media_image.image_style_uri.breakpoint_2xl_2x}
      alt={paragraph?.su_card_media?.field_media_image.resourceIdObjMeta.alt}
      fill={true}
    />
  }
  props.className = `${props?.className ?? ''} su-max-w-[980px] su-mx-auto`;

  return (
    <Card
      video={video}
      image={image}
      header={paragraph.su_card_header}
      superHeader={paragraph.su_card_super_header}
      body={paragraph?.su_card_body?.processed}
      link={paragraph?.su_card_link}
      linkStyle={paragraph?.su_card_link_display}
      {...props}
    />
  )
}
