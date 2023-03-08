import Image from "next/image";
import Link from "next/link";
import Conditional from "../../utils/conditional";
import {EnvelopeIcon} from "@heroicons/react/20/solid";
import LibCal from "./libcal";
import {Person} from "@/lib/drupal/drupal";

const HorizontalPersonCard = ({node, ...props}: {node: Person}) => {
  return (
    <article
      className="su-flex su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border-x su-border-t su-border-b-5 su-border-solid su-border-black-10  su-border-b-digital-red su-shadow-md su-rs-pt-2 su-rs-px-2 su-rs-pb-3 su-mt-0" {...props}>
      {node?.su_person_photo?.field_media_image &&
          <div className="su-flex su-justify-center su-mr-50">
            <div className="su-rounded-full su-w-[155px] su-h-[155px] su-overflow-hidden">
              <Image
                  src={node.su_person_photo?.field_media_image?.image_style_uri?.medium_square}
                  alt={node.su_person_photo?.field_media_image?.resourceIdObjMeta?.alt ?? ''}
                  height={node.su_person_photo?.field_media_image?.resourceIdObjMeta?.height}
                  width={node.su_person_photo?.field_media_image?.resourceIdObjMeta?.width}
              />
            </div>
          </div>
      }
      <div>
        <Link href={node.path.alias}
              className="su-no-underline hocus:su-text-digital-red hocus:su-underline su-text-black">
          <h2 className="su-type-1 su-rs-mb-neg2 su-font-serif">{node.title}</h2>
        </Link>
        <Conditional showWhen={node.su_person_full_title}>
          <div className="su-type-0 su-rs-mb-neg2">{node.su_person_full_title}</div>
        </Conditional>
        <Conditional showWhen={node.su_person_email}>
          <Link href={`mailto:${node.su_person_email}`}
                className="su-no-underline hocus:su-underline su-text-digital-blue">
            <EnvelopeIcon width={20} className="su-inline-block su-mr-6"/>
            {node.su_person_email}
          </Link>
        </Conditional>

        <Conditional showWhen={node.sul_person__libcal_id}>
          <LibCal libcalId={node.sul_person__libcal_id}/>
        </Conditional>
      </div>
    </article>
  )
}
export default HorizontalPersonCard;