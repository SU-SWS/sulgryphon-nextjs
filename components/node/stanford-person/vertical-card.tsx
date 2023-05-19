import Image from "next/image";
import Link from "next/link";
import Conditional from "@/components/utils/conditional";
import {EnvelopeIcon} from "@heroicons/react/20/solid";
import LibCal from "./libcal";
import {Person} from "@/lib/drupal/drupal";
import EmailLink from "@/components/patterns/email-link";

const VerticalPersonCard = ({node, ...props}: { node: Person}) => {

  const imageUrl = node.su_person_photo?.field_media_image?.image_style_uri?.medium_square;
  const imageAlt = node.su_person_photo?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const imageHeight = node.su_person_photo?.field_media_image?.resourceIdObjMeta?.height;
  const imageWidth = node.su_person_photo?.field_media_image?.resourceIdObjMeta?.width;
  const placeholder = node.su_person_photo?.field_media_image?.uri.base64;

  return (
    <article
      className="su-@container su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border-x su-border-t-5 su-border-b su-border-solid su-border-black-10 su-border-t-digital-red su-shadow-md su-rs-pt-2 su-rs-px-2 su-rs-pb-3 su-mt-70" {...props}>
      {imageUrl &&
        <div
          className="su-relative su-flex su-justify-center su-pb-70 @lg:su-pb-80">
          <div className="su-absolute su-top-[-11rem]">
            <div
              className="su-rounded-full su-aspect-[1/1] su-w-[130px] @lg:su-w-[150px] su-overflow-hidden">
              <Image
                src={imageUrl}
                alt={imageAlt}
                height={imageHeight}
                width={imageWidth}
                placeholder={placeholder ? 'blur' : 'empty'}
                blurDataURL={placeholder}
              />
            </div>
          </div>
        </div>
      }

      <div className="su-flex su-flex-col su-gap-[4.5rem]">
        <div className="su-flex su-flex-col">
          <Link
            href={node.path?.alias ?? "#"}
            className="su-underline hocus:su-no-underline active:su-no-underline su-text-black hocus:su-text-brick-dark active:su-text-digital-red"
          >
            <h2 className="su-type-0 @lg:su-type-2 su-font-serif">{node.title}</h2>
          </Link>
          <div className="su-flex su-flex-col su-gap-[1.2rem]">
            <Conditional showWhen={node.su_person_full_title}>
              <div className="su-text-18 @lg:su-type-0">{node.su_person_full_title}</div>
            </Conditional>

            <Conditional showWhen={node.su_person_email}>


              <div className="su-flex su-items-center su-truncate">
                <EnvelopeIcon width={20} className="su-flex-shrink-0 su-mr-3 su-text-digital-blue"/>

                <EmailLink
                  email={node.su_person_email}
                  className="su-transition-colors hover:su-text-brick-dark hover:su-bg-black-10 focus:su-bg-none focus:su-text-cardinal-red active:su-text-cardinal-red su-no-underline su-text-digital-blue su-text-18 @lg:su-text-18"
                />
              </div>

            </Conditional>
          </div>
        </div>

        <LibCal libcalId={node.sul_person__libcal_id}/>
      </div>
    </article>
  )
}
export default VerticalPersonCard;