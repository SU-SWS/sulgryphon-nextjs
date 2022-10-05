import {BannerParagraph} from "../../types/drupal";
import {Banner} from "@/components/patterns/banner";

interface BannerProps {
  paragraph: BannerParagraph
  siblingCount?: number
  className?: string
}

export const StanfordBanner = ({paragraph, siblingCount, ...props}: BannerProps) => {

  const imageUrl = paragraph?.su_banner_image?.field_media_image?.uri?.url;
  let image = null

  if (imageUrl) {
    image = {
      src: imageUrl,
      alt: paragraph.su_banner_image.field_media_image.resourceIdObjMeta.alt,
      height: paragraph.su_banner_image.field_media_image.resourceIdObjMeta.height,
      width: paragraph.su_banner_image.field_media_image.resourceIdObjMeta.width
    }
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