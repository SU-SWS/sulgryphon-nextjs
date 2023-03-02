import Link from "next/link";
import {News} from "../../../../src/types/drupal";
import Image from "next/image";
import {useMemo} from "react";
import Card from "../../patterns/card";

const StanfordNewsCard = ({node, ...props}: { node: News }) => {

  const getFeaturedImageUrl = (node: News, imageStyle = 'breakpoint_2xl_1x'): null | string => {
    if (node.su_news_featured_media?.field_media_image?.image_style_uri?.[imageStyle]) {
      return node.su_news_featured_media.field_media_image.image_style_uri?.[imageStyle]
    }
    return null;
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
  const topics = node.su_news_topics?.filter(topic => topic.name?.length > 0) ?? [];

  return (
    <article {...props}>
      <Card
        image={image}
        header={
          <Link className="su-text-black hover:su-underline" href={node.path.alias}>
            {node.title}
          </Link>
        }
        footer={
          <div>
            {topics.map((topic, index) =>
              <span key={topic.id}>
                {(index ? ', ' : '') + topic.name}
              </span>
            )}
          </div>
        }
      />
    </article>
  )
}
export default StanfordNewsCard;