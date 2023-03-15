import Image from "next/image";
import {useMemo} from "react";
import Link from "next/link";
import {BasicPage} from "@/lib/drupal/drupal";
import Card from "../../patterns/card";

const StanfordPageCard = ({node, ...props}: { node: BasicPage }) => {

  const getFeaturedImageUrl = (node: BasicPage, imageStyle = 'breakpoint_2xl_1x'): string => {
    if (node.su_page_image?.field_media_image?.image_style_uri?.[imageStyle]) {
      return node.su_page_image.field_media_image.image_style_uri?.[imageStyle]
    }

    if (node.su_page_banner?.su_banner_image?.field_media_image?.image_style_uri?.[imageStyle]) {
      return node.su_page_banner.su_banner_image.field_media_image.image_style_uri?.[imageStyle];
    }
    return '';
  }

  const getImage = () => {
    let imageUrl = getFeaturedImageUrl(node);
    if (imageUrl) {
      return <Image
        className="su-object-cover su-object-center"
        src={imageUrl}
        alt=""
        fill={true}
      />
    }
  }

  const image = useMemo(() => getImage(), [node]);

  return (
    <article {...props}>
      <Card
        image={image}
        header={
          <Link className="su-underline hocus:su-no-underline active:su-no-underline su-text-black hocus:su-text-brick-dark active:su-text-digital-red" href={node.path.alias}>
            {node.title}
          </Link>
        }
        body={node.su_page_description}
      />
    </article>
  )
}

export default StanfordPageCard;