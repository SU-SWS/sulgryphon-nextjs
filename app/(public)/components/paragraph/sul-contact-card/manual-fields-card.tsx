"use client";

import Link from "next/link";
import Image from "next/image";
import {ClockIcon, EnvelopeIcon, MapPinIcon, PhoneIcon} from "@heroicons/react/24/outline";
import Conditional from "@/components/utils/conditional";
import {useResizeDetector} from "react-resize-detector";
import {ContactCardParagraph} from "@/lib/drupal/drupal";

const ManualFieldsCard = ({paragraph}: { paragraph: ContactCardParagraph }) => {
  const {width, ref} = useResizeDetector();

  const imageUrl = paragraph.sul_contact__image?.field_media_image?.image_style_uri?.breakpoint_md_2x
  const imageAlt = paragraph.sul_contact__image?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const placeholder = paragraph.sul_contact__image?.field_media_image?.uri.base64;

  return (
    <div ref={ref}
         className={"su-flex su-w-full su-basefont-23 su-leading-display su-shadow-md su-border-0 su-rounded " + ((width && width < 768) && " su-flex-col")}>

      <Conditional showWhen={imageUrl}>
        <div className={"su-overflow-hidden su-aspect-[16/9] su-relative " + ((width && width > 767) && " su-w-1/2")}>
          <Image
            className="su-object-cover su-object-center su-static"
            src={imageUrl}
            alt={imageAlt}
            fill={true}
            placeholder={placeholder ? 'blur' : 'empty'}
            blurDataURL={placeholder}
          />
        </div>
      </Conditional>

      <div
        className={"card-body su-items-start su-rs-px-2 su-rs-py-4 su-bg-black-true " + ((imageUrl && (width && width > 767)) ? " su-w-1/2" : " su-w-full")}>
        <div className="su-leading-display su-text-18 su-pt-0 su-font-normal ">

          <Conditional showWhen={paragraph.sul_contact__title}>
            <h2 className="su-type-3 su-rs-mb-1 su-text-white">{paragraph.sul_contact__title}</h2>
          </Conditional>

          <div className="su-leading-tight md:su-rs-pr-2 su-text-white">

            <Conditional showWhen={paragraph.sul_contact__hours}>
              <div className="su-relative su-flex su-flex-row su-items-start su-rs-mb-0 su-type-1">
                <ClockIcon width={19} className="su-mr-12 su-mt-01em su-flex-shrink-0"/>
                <div className="sm:su-flex">

                  <Conditional showWhen={paragraph.sul_contact__hours}>
                    <div className="su-text-white su-rs-mb-neg2 sm:su-mb-0">
                      {paragraph.sul_contact__hours}
                    </div>
                  </Conditional>

                  {paragraph.sul_contact__link?.url &&
                    <Link
                      className={"su-underline su-text-white hocus:su-text-illuminating-dark hocus:su-no-underline active:su-text-digital-red-light su-font-normal" + (paragraph.sul_contact__hours && " sm:su-ml-15")}
                      href={paragraph.sul_contact__link?.url}>
                      {paragraph.sul_contact__link?.title}
                    </Link>
                  }

                </div>
              </div>
            </Conditional>

            <Conditional showWhen={paragraph.sul_contact__phone}>
              <div className="su-relative su-flex su-flex-row su-items-center su-rs-mb-0 su-type-1">
                <PhoneIcon width={19} className="su-mr-12 su-flex-shrink-0"/>
                {paragraph.sul_contact__phone}
              </div>
            </Conditional>

            <Conditional showWhen={paragraph.sul_contact__email}>
              <div className="su-relative su-flex su-flex-row su-items-center su-rs-mb-0 su-type-1">
                <EnvelopeIcon width={19} className="su-mt-02em su-mr-12 su-flex-shrink-0"/>
                <Link
                  className="su-underline su-text-white hocus:su-text-illuminating-dark hocus:su-no-underline active:su-text-digital-red-light su-font-normal"
                  href={`mailto:${paragraph.sul_contact__email}`}>
                  {paragraph.sul_contact__email}
                </Link>
              </div>
            </Conditional>

            <Conditional showWhen={paragraph.sul_contact__address}>
              <div className="su-relative su-flex su-flex-row su-items-start su-type-1">
                <MapPinIcon width={19} className="su-mt-01em md:su-mt-0 su-mr-12 su-flex-shrink-0"/>
                {(paragraph.sul_contact__map_link) ? (
                  <Link href={paragraph.sul_contact__map_link.uri}
                        className="su-underline su-text-white hocus:su-text-illuminating-dark hocus:su-no-underline active:su-text-digital-red-light su-font-normal">
                    <div>{paragraph.sul_contact__address?.address_line1}, {paragraph.sul_contact__address?.address_line2}, {paragraph.sul_contact__address?.locality} {paragraph.sul_contact__address?.administrative_area}, {paragraph.sul_contact__address?.postal_code}</div>
                  </Link>
                ) : (
                  <div>
                    {paragraph.sul_contact__address?.address_line1}, {paragraph.sul_contact__address?.address_line2}, {paragraph.sul_contact__address?.locality} {paragraph.sul_contact__address?.administrative_area}, {paragraph.sul_contact__address?.postal_code}
                  </div>
                )}
              </div>
            </Conditional>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ManualFieldsCard;