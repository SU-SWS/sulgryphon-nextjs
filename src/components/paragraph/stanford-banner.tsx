import Image from "next/image";

import Banner from "@/components/patterns/banner";
import {buildUrl} from "@/lib/drupal/utils";
import {MediaImage, Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal.d";
import {HTMLAttributes} from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  header?: Maybe<string>
  superHeader?: Maybe<string>
  body?: Maybe<string>
  image?: Maybe<MediaImage>
  link?: Maybe<LinkType>
  overlayPosition?: Maybe<string>
  fullWidth?: Maybe<boolean>
  headerId?: string
}

const StanfordBanner = ({header, superHeader, body, image, link, overlayPosition, ...props}: Props) => {

  const imageUrl = image?.mediaImage.url;

  return (
    <Banner
      image={imageUrl && <Image
        className="object-cover object-center"
        src={buildUrl(imageUrl).toString()}
        alt={image?.mediaImage.alt || ''}
        fill
        sizes="100vw"
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