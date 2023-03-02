import {Person} from "../../../../src/types/drupal";
import {SizeMe} from "react-sizeme";
import Link from "next/link";
import Conditional from "../../utils/conditional";
import {EnvelopeIcon} from "@heroicons/react/20/solid";
import LibCal from "./libcal";
import Image from "next/image";

const StanfordPersonCard = ({node, ...props}: { node: Person }) => {

  return (
    <SizeMe>
      {({size}) => (
        <>
          {size.width < 510 ?
            <article
              className="su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border-x su-border-t-5 su-border-b su-border-solid su-border-black-10 su-border-t-digital-red su-shadow-md su-rs-pt-2 su-rs-px-2 su-rs-pb-3 su-mt-70" {...props}>
              {node?.su_person_photo?.field_media_image &&
                  <div
                      className={size.width < 300 ? "su-relative su-flex su-justify-center su-pb-70" : "su-relative su-flex su-justify-center su-pb-80"}>
                    <div className="su-absolute su-top-[-11rem]">
                      <div
                          className={size.width < 300 ? "su-rounded-full su-w-[130px] su-h-[130px] su-overflow-hidden" : "su-rounded-full su-w-[155px] su-h-[155px] su-overflow-hidden"}>
                        <Image
                            src={node.su_person_photo.field_media_image.image_style_uri.medium_square}
                            alt={node.su_person_photo.field_media_image.resourceIdObjMeta.alt}
                            height={node.su_person_photo.field_media_image.resourceIdObjMeta.height}
                            width={node.su_person_photo.field_media_image.resourceIdObjMeta.width}
                        />
                      </div>
                    </div>
                  </div>
              }
              <div>
                <Link href={node.path.alias}
                      className="su-no-underline hocus:su-text-digital-red hocus:su-underline su-text-black">
                  <h2
                    className={size.width < 300 ? "su-type-0 su-rs-mb-neg2 su-font-serif" : "su-type-1 su-rs-mb-neg2 su-font-serif"}>{node.title}</h2>
                </Link>
                <Conditional showWhen={node.su_person_full_title}>
                  <div
                    className={size.width < 300 ? "su-text-18 su-rs-mb-neg2" : "su-type-0 su-rs-mb-neg2"}>{node.su_person_full_title}</div>
                </Conditional>
                <Conditional showWhen={node.su_person_email}>
                  <Link href={`mailto:${node.su_person_email}`}
                        className={size.width < 300 ? "su-no-underline hocus:su-underline su-text-digital-blue su-text-18" : "su-no-underline hocus:su-underline su-text-digital-blue"}>
                    <div className="su-flex su-items-center su-truncate">
                      <EnvelopeIcon width={size.width < 300 ? 14 : 20} className="su-flex-shrink-0 su-mr-3"/>
                      {node.su_person_email}
                    </div>
                  </Link>
                </Conditional>

                <Conditional showWhen={node.sul_person__libcal_id}>
                  <LibCal libcalId={node.sul_person__libcal_id}/>
                </Conditional>
              </div>
            </article>
            :
            <article
              className="su-flex su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border-x su-border-t su-border-b-5 su-border-solid su-border-black-10  su-border-b-digital-red su-shadow-md su-rs-pt-2 su-rs-px-2 su-rs-pb-3 su-mt-0" {...props}>
              {node?.su_person_photo?.field_media_image &&
                  <div className="su-flex su-justify-center su-mr-50">
                    <div className="su-rounded-full su-w-[155px] su-h-[155px] su-overflow-hidden">
                      <Image
                          src={node.su_person_photo.field_media_image.image_style_uri.medium_square}
                          alt={node.su_person_photo.field_media_image.resourceIdObjMeta.alt ?? ''}
                          height={node.su_person_photo.field_media_image.resourceIdObjMeta.height}
                          width={node.su_person_photo.field_media_image.resourceIdObjMeta.width}
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
          }
        </>
      )}
    </SizeMe>
  )
}
export default StanfordPersonCard;