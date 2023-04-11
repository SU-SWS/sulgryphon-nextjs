import Image from "next/image";

import {CardParagraph} from "@/lib/drupal/drupal";
import Card from "@/components/patterns/card";
import HorizontalCard from "@/components/patterns/horizontal-card";
import Oembed from "@/components/patterns/oembed";

interface CardProps {
  paragraph: CardParagraph
  siblingCount?: number
  className?: string
}

const StanfordCard = ({paragraph, siblingCount = 0, ...props}: CardProps) => {
  const isHorizontal = paragraph?.behavior_settings?.sul_card_styles?.orientation === 'horizontal';
  const isHorizontalOrSingle = isHorizontal || siblingCount == 0;
  const isHorizontalAndSingle = isHorizontal && siblingCount == 0;

  const videoUrl = paragraph?.su_card_media?.field_media_oembed_video;
  const imageUrl = paragraph?.su_card_media?.field_media_image?.uri?.url;

  return (
    <div className={"su-mx-auto su-w-full " + (isHorizontalOrSingle  ? "su-max-w-[980px]": "")}>
      {isHorizontalAndSingle &&
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
      }

      {!isHorizontalAndSingle &&
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
      }
    </div>
  )

}
export default StanfordCard;
