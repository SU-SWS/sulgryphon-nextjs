import Image from "next/image";

import {BannerParagraph} from "../../types/drupal";
import {Banner} from "@/components/patterns/banner";

interface BannerProps {
  paragraph: BannerParagraph
  siblingCount?: number
  className?: string
}

export const StanfordBanner = ({paragraph, siblingCount, ...props}: BannerProps) => {

  const imageUrl = paragraph?.su_banner_image?.field_media_image?.image_style_uri?.breakpoint_2xl_2x;
  let image = null

  if (imageUrl) {
    image = <Image
      className="su-object-cover su-object-center"
      src={imageUrl}
      alt={paragraph.su_banner_image.field_media_image.resourceIdObjMeta.alt}
      fill={true}
    />
  }

  return (
    <Banner
      image={image}
      header={paragraph.su_banner_header}
      superHeader={paragraph.su_banner_sup_header}
      body={paragraph?.su_banner_body?.processed}
      link={paragraph?.su_banner_button}
      overlayPosition={paragraph.behavior_settings?.hero_pattern?.overlay_position}
      {...props}
    />
  )
}