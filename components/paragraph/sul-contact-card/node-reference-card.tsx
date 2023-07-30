import Link from "@/components/patterns/elements/drupal-link";
import Image from "next/image";
import {EnvelopeIcon, MapPinIcon, PhoneIcon} from "@heroicons/react/24/outline";
import Conditional from "@/components/utils/conditional";
import {ContactCardParagraph} from "@/lib/drupal/drupal";
import NodeReferenceCardHours from "@/components/paragraph/sul-contact-card/node-reference-card-hours";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import {PropsWithoutRef} from "react";
import EmailLink from "@/components/patterns/elements/email-link";

interface Props extends PropsWithoutRef<any> {
  paragraph: ContactCardParagraph
}

const NodeReferenceCard = ({paragraph, ...props}: Props) => {
  const imageUrl = paragraph.sul_contact__branch?.su_library__contact_img?.field_media_image?.image_style_uri?.breakpoint_md_2x
  const imageAlt = paragraph.sul_contact_branch?.su_library__contact_img?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const placeholder = paragraph.sul_contact__branch?.su_library__contact_img?.field_media_image?.uri.base64;

  const address = [
    paragraph.sul_contact__branch?.su_library__address?.address_line1,
    paragraph.sul_contact__branch?.su_library__address?.address_line2,
    paragraph.sul_contact__branch?.su_library__address?.locality + " " + paragraph.sul_contact__branch?.su_library__address?.administrative_area,
    paragraph.sul_contact__branch?.su_library__address?.postal_code
  ];
  const addressString = address.filter(x => !!x).join(', ');

  return (
    <div className="su-@container">
      <div
        className="su-flex su-w-full su-basefont-23 su-leading-display su-shadow-md su-border-0 su-rounded su-flex-col @6xl:su-flex-row">

        {imageUrl &&
          <div className="su-overflow-hidden su-aspect-[16/9] su-relative su-flex-shrink-0 @6xl:su-w-1/2">
            <Image
              className="su-object-cover su-object-center su-static"
              src={imageUrl}
              alt={imageAlt}
              fill={true}
              placeholder={placeholder ? 'blur' : 'empty'}
              blurDataURL={placeholder}
            />
          </div>
        }

        <div className="card-body su-items-start su-rs-px-2 su-rs-py-4 su-bg-black-true su-flex-grow">
          <div className="su-leading-display su-text-18 su-pt-0 su-font-normal ">

            {paragraph.sul_contact__branch?.path ? (
              <Link href={paragraph.sul_contact__branch?.path?.alias}
                    className="su-underline su-text-white hocus:su-text-illuminating-dark hocus:su-no-underline active:su-text-digital-red-light">
                <h2 className="su-type-3 su-rs-mb-1">{paragraph.sul_contact__branch?.title}</h2>
              </Link>
            ) : (
              <h2 className="su-type-3 su-rs-mb-1 su-text-white">{paragraph.sul_contact__title}</h2>
            )}

            <div className="su-leading-tight md:su-rs-pr-2 su-text-white">

              <CachedClientFetch>
                <NodeReferenceCardHours
                  branchId={paragraph.sul_contact__branch?.su_library__hours}
                  branchName={paragraph.sul_contact__branch?.title}
                />
              </CachedClientFetch>

              <Conditional showWhen={paragraph.sul_contact__branch?.su_library__phone}>
                <div className="su-relative su-flex su-flex-row su-items-center su-rs-mb-0 su-type-1">
                  <PhoneIcon width={19} className="su-mr-12 su-flex-shrink-0"/>
                  {paragraph.sul_contact__branch?.su_library__phone}
                </div>
              </Conditional>

              <Conditional showWhen={paragraph.sul_contact__branch?.su_library__email}>
                <div className="su-relative su-flex su-flex-row su-items-center su-rs-mb-0 su-type-1">
                  <EnvelopeIcon width={19} className="su-mt-02em su-mr-12 su-flex-shrink-0"/>
                  <EmailLink email={paragraph.sul_contact__branch?.su_library__email} className="su-underline su-text-white hocus:su-text-illuminating-dark hocus:su-no-underline active:su-text-digital-red-light su-font-normal su-break-words"/>
                </div>
              </Conditional>

              <Conditional showWhen={paragraph.sul_contact__branch?.su_library__address}>
                <div className="su-relative su-flex su-flex-row su-items-start su-type-1">
                  <MapPinIcon width={19} className="su-mt-01em md:su-mt-0 su-mr-12 su-flex-shrink-0"/>

                  {(paragraph.sul_contact__branch?.su_library__map_link) ? (
                    <Link href={paragraph.sul_contact__branch?.su_library__map_link.uri}
                          className="su-underline su-text-white hocus:su-text-illuminating-dark hocus:su-no-underline active:su-text-digital-red-light su-font-normal">
                      <div>{addressString}</div>
                    </Link>
                  ) : (
                    <div>
                      {addressString}
                    </div>
                  )}

                </div>
              </Conditional>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NodeReferenceCard;