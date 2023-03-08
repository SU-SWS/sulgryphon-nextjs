import {Person} from "@/lib/drupal/drupal";
import Image from "next/image";
import Link from "next/link";
import Conditional from "@/components/utils/conditional";
import LibCal from "./libcal";
import {useResizeDetector} from "react-resize-detector";

const StanfordPersonListItem = ({node, ...props}: { node: Person }) => {
  const {width, ref} = useResizeDetector();
  return (
    <article
      className="su-grid su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black lg:su-rs-pt-2 lg:su-rs-px-2 lg:su-rs-pb-3 " {...props}>
      {node.su_person_photo?.field_media_image &&
          <div className="su-rs-pb-1">

            <div
                ref={ref}
                className={"su-rounded-full su-overflow-hidden " + ((width && width < 300) ? " su-w-[130px] su-h-[130px] " : "su-w-[215px] su-h-[215px]")}>
              <Image
                  src={node.su_person_photo?.field_media_image.image_style_uri.medium_square}
                  alt={node.su_person_photo?.field_media_image?.resourceIdObjMeta?.alt ?? ''}
                  height={node.su_person_photo?.field_media_image?.resourceIdObjMeta?.height}
                  width={node.su_person_photo?.field_media_image?.resourceIdObjMeta?.width}
              />
            </div>

          </div>
      }
      <Link href={node.path.alias}
            className="su-no-underline su-text-digital-red hocus:su-underline hocus:su-text-black">
        <h2 className="su-type-1 su-font-semibold su-mb-[0.2em]">{node.title}</h2>
      </Link>
      <div className="su-type-0 su-leading-snug">{node.su_person_short_title}</div>

      <Conditional showWhen={node.sul_person__libcal_id}>
        <LibCal libcalId={node.sul_person__libcal_id}/>
      </Conditional>
    </article>
  )
}
export default StanfordPersonListItem;