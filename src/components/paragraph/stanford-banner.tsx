import Image from "next/image";

import {DrupalImageFile, DrupalLinkType} from "@/lib/drupal/drupal";
import Banner from "@/components/patterns/banner";
import {PropsWithoutRef} from "react";
import {buildUrl} from "@/lib/drupal/utils";

interface Props extends PropsWithoutRef<any> {
  header?: string
  superHeader?: string
  body?: string
  image?: DrupalImageFile
  link?: DrupalLinkType
  overlayPosition?: string
  fullWidth?: boolean
  className?: string
}

const StanfordBanner = ({header, superHeader, body, image, link, overlayPosition, ...props}: Props) => {

  const imageUrl = image?.uri.url;
  const placeholder = image?.uri.base64;

  return (
    <Banner
      image={imageUrl && <Image
        className="object-cover object-center"
        src={buildUrl(imageUrl).toString()}
        alt={image?.resourceIdObjMeta?.alt || ''}
        fill
        sizes="100vw"
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