import Image from "next/image";
import Link from "next/link";
import Conditional from "../../utils/conditional";
import {EnvelopeIcon} from "@heroicons/react/20/solid";
import LibCal from "./libcal";
import {Person} from "@/lib/drupal/drupal";

const VerticalPersonCard = ({node, currentWidth = 0, ...props}: {node: Person, currentWidth: number}) => {
  return (
    <article
      className="su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border-x su-border-t-5 su-border-b su-border-solid su-border-black-10 su-border-t-digital-red su-shadow-md su-rs-pt-2 su-rs-px-2 su-rs-pb-3 su-mt-70" {...props}>
      {node?.su_person_photo?.field_media_image &&
          <div
              className={currentWidth < 300 ? "su-relative su-flex su-justify-center su-pb-70" : "su-relative su-flex su-justify-center su-pb-80"}>
            <div className="su-absolute su-top-[-11rem]">
              <div
                  className={currentWidth < 300 ? "su-rounded-full su-w-[130px] su-h-[130px] su-overflow-hidden" : "su-rounded-full su-w-[155px] su-h-[155px] su-overflow-hidden"}>
                <Image
                    src={node.su_person_photo.field_media_image.image_style_uri.medium_square}
                    alt={node.su_person_photo?.field_media_image?.resourceIdObjMeta?.alt ?? ''}
                    height={node.su_person_photo?.field_media_image?.resourceIdObjMeta?.height}
                    width={node.su_person_photo?.field_media_image?.resourceIdObjMeta?.width}
                />
              </div>
            </div>
          </div>
      }
      <div>
        <Link href={node.path.alias}
              className="su-underline hocus:su-no-underline active:su-no-underline su-text-black hocus:su-text-brick-dark active:su-text-digital-red">
          <h2
            className={currentWidth < 300 ? "su-type-0 su-rs-mb-neg2 su-font-serif" : "su-type-1 su-rs-mb-neg2 su-font-serif"}>{node.title}</h2>
        </Link>
        <Conditional showWhen={node.su_person_full_title}>
          <div
            className={currentWidth < 300 ? "su-text-18 su-rs-mb-neg2" : "su-type-0 su-rs-mb-neg2"}>{node.su_person_full_title}</div>
        </Conditional>
        <Conditional showWhen={node.su_person_email}>
          <Link href={`mailto:${node.su_person_email}`}
                className={currentWidth < 300 ? " su-transition-colors hover:su-text-brick-dark hover:su-bg-black-10 focus:su-bg-none focus:su-text-cardinal-red active:su-text-cardinal-red su-no-underline su-text-digital-blue su-text-18" : " su-transition-colors hover:su-text-brick-dark hover:su-bg-black-10 hover:su-no-underline focus:su-bg-none focus:su-text-cardinal-red active:su-text-cardinal-red su-no-underline su-text-digital-blue"}>
            <div className="su-flex su-items-center su-truncate">
              <EnvelopeIcon width={currentWidth < 300 ? 14 : 20} className="su-flex-shrink-0 su-mr-3"/>
              {node.su_person_email}
            </div>
          </Link>
        </Conditional>

        <Conditional showWhen={node.sul_person__libcal_id}>
          <LibCal libcalId={node.sul_person__libcal_id}/>
        </Conditional>
      </div>
    </article>
  )
}
export default VerticalPersonCard;