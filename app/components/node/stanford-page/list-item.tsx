import {BasicPage} from "../../../../src/types/drupal";
import Image from "next/image";
import {useMemo} from "react";
import Link from "next/link";
import Conditional from "../../utils/conditional";

const StanfordPageListItem = ({node, ...props}: {node:BasicPage}) => {
  const getFeaturedImageUrl = (node: BasicPage, imageStyle = 'breakpoint_2xl_1x'): boolean | string => {
    if (node.su_page_image?.field_media_image?.image_style_uri?.[imageStyle]) {
      return node.su_page_image.field_media_image.image_style_uri?.[imageStyle]
    }

    if (node.su_page_banner?.su_banner_image?.field_media_image?.image_style_uri?.[imageStyle]) {
      return node.su_page_banner.su_banner_image.field_media_image.image_style_uri?.[imageStyle];
    }
    return false;
  }

  const getImage = () => {
    let imageUrl = getFeaturedImageUrl(node);
    if (imageUrl) {
      return <Image
        className="su-object-cover su-object-center"
        src={imageUrl as string}
        alt=""
        fill={true}
      />
    }
  }

  const image = useMemo(() => getImage(), [node]);

  return (
    <article {...props}>
      <div className="su-grid su-grid-cols-4 su-gap-xl">
        <div className="su-col-span-3">
          <Link className="su-text-cardinal-red su-no-underline hover:su-underline" href={node.path.alias}>
            <h3>{node.title}</h3>
          </Link>
          {node.su_page_description}
        </div>

        <Conditional showWhen={image}>
          <div aria-hidden={true} className="su-col-span-1 su-overflow-hidden su-aspect-[16/9] su-relative">
            <Link href={node.path.alias}>
              {image}
            </Link>
          </div>
        </Conditional>
      </div>
    </article>
  )
}
export default StanfordPageListItem;