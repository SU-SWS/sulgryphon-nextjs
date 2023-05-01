import Image from "next/image";

import {DrupalImageMedia, DrupalLink} from "@/lib/drupal/drupal";
import Banner from "@/components/patterns/banner";
import {PropsWithoutRef} from "react";

interface Props extends PropsWithoutRef<any> {
  header?: string
  superHeader?: string
  body?: string
  image?: DrupalImageMedia
  link?: DrupalLink
  overlayPosition?: string
  siblingCount?: number
  className?: string
}

const StanfordBanner = ({header, superHeader, body, image, link, overlayPosition, siblingCount, ...props}: Props) => {

  const imageUrl = image?.image_style_uri?.breakpoint_2xl_2x;
  const placeholder = image?.uri.base64;

  return (
    <Banner
      image={imageUrl && <Image
        className="su-object-cover su-object-center"
        src={imageUrl}
        alt={image?.resourceIdObjMeta.alt}
        fill={true}
        placeholder={placeholder ? 'blur' : 'empty'}
        blurDataURL={placeholder}
      />}
      header={header}
      superHeader={superHeader}
      body={body}
      link={link}
      overlayPosition={overlayPosition}
      {...props}
    />
  )
}
export default StanfordBanner;