import {Person} from "@/lib/drupal/drupal";
import Image from "next/image";
import Link from "next/link";
import LibCal from "./libcal";

const StanfordPersonListItem = ({node, ...props}: { node: Person }) => {
  const imageUrl = node.su_person_photo?.field_media_image?.image_style_uri?.medium_square;
  const imageAlt = node.su_person_photo?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const placeholder = node.su_person_photo?.field_media_image?.uri.base64;

  return (
    <article
      className="su-@container su-flex su-flex-col su-gap-lg su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black" {...props}>
      {imageUrl &&
        <div
          className="su-relative su-rounded-full su-overflow-hidden su-aspect-[1/1] su-w-[130px] @lg:su-w-[215px] su-mx-auto">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            placeholder={placeholder ? 'blur' : 'empty'}
            blurDataURL={placeholder}
            className="su-object-cover"
          />
        </div>
      }
      <div>
        <Link href={node.path?.alias ?? "#"}
              className="su-no-underline su-text-digital-red hocus:su-underline hocus:su-text-black">
          <h2 className="su-type-1 su-font-semibold su-mb-[0.2em]">{node.title}</h2>
        </Link>
        <div className="su-type-0 su-leading-snug">{node.su_person_short_title}</div>
      </div>
      {node.sul_person__libcal_id &&
        <div>
          <LibCal libcalId={node.sul_person__libcal_id} srText={node.title}/>
        </div>
      }
    </article>
  )
}
export default StanfordPersonListItem;