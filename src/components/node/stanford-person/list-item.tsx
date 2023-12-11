import {Person} from "@/lib/drupal/drupal";
import Image from "next/image";
import Link from "@/components/patterns/elements/drupal-link";
import LibCal from "./libcal";

const StanfordPersonListItem = ({node, ...props}: { node: Person }) => {
  const imageUrl = node.su_person_photo?.field_media_image?.image_style_uri?.medium_square;
  const imageAlt = node.su_person_photo?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const placeholder = node.su_person_photo?.field_media_image?.uri.base64;

  return (
    <article
      className="@container flex flex-col gap-lg w-full basefont-23 leading-display bg-white text-black" {...props}>
      {imageUrl &&
        <div
          className="relative rounded-full overflow-hidden aspect-[1/1] w-[130px] @lg:w-[215px] mx-auto">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            placeholder={placeholder ? 'blur' : 'empty'}
            blurDataURL={placeholder}
            className="object-cover"
          />
        </div>
      }
      <div>
        <Link href={node.path?.alias ?? "#"}
              className="no-underline text-digital-red hocus:underline hocus:text-black">
          <h2 className="type-1 font-semibold mb-[0.2em]">{node.title}</h2>
        </Link>
        <div className="type-0 leading-snug">{node.su_person_short_title}</div>
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