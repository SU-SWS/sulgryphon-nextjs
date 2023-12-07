import Link from "@/components/patterns/elements/drupal-link";
import Image from "next/image";
import {ClockIcon, EnvelopeIcon, MapPinIcon, PhoneIcon} from "@heroicons/react/24/outline";
import Conditional from "@/components/utils/conditional";
import {ContactCardParagraph} from "@/lib/drupal/drupal";
import {PropsWithoutRef} from "react";
import EmailLink from "@/components/patterns/elements/email-link";

interface Props extends PropsWithoutRef<any> {
  paragraph: ContactCardParagraph
}

const ManualFieldsCard = ({paragraph}: Props) => {

  const imageUrl = paragraph.sul_contact__image?.field_media_image?.image_style_uri?.breakpoint_md_2x
  const imageAlt = paragraph.sul_contact__image?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const placeholder = paragraph.sul_contact__image?.field_media_image?.uri.base64;

  const address = [
    paragraph.sul_contact__address?.address_line1,
    paragraph.sul_contact__address?.address_line2,
    paragraph.sul_contact__address?.locality + " " + paragraph.sul_contact__address?.administrative_area,
    paragraph.sul_contact__address?.postal_code
  ];
  const addressString = address.filter(x => !!x).join(', ');

  return (
    <div className="su-@container">
      <div
        className="su-flex su-w-full su-basefont-23 su-leading-display su-shadow-md su-border-0 su-rounded su-flex-col @6xl:su-flex-row">

        <Conditional showWhen={imageUrl}>
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
        </Conditional>

        <div className="card-body su-rs-px-2 su-rs-py-4 su-bg-black-true su-flex-grow">
          <div className="su-leading-display su-text-18 su-pt-0 su-font-normal ">

            <Conditional showWhen={paragraph.sul_contact__title}>
              <h2 className="su-type-3 su-rs-mb-1 su-text-white">{paragraph.sul_contact__title}</h2>
            </Conditional>

            <div className="su-leading-tight md:su-rs-pr-2 su-text-white">

              <Conditional showWhen={paragraph.sul_contact__hours || paragraph.sul_contact__link?.url}>
                <div className="su-relative su-flex su-flex-row su-rs-mb-0 su-type-1">
                  <ClockIcon width={19} className="su-mr-12 su-mt-01em su-flex-shrink-0"/>
                  <div className="su-text-white su-rs-mb-neg2 sm:su-mb-0">
                    {paragraph.sul_contact__hours}

                    {(paragraph.sul_contact__hours && paragraph.sul_contact__link?.url) &&
                      <span className="su-mx-5">/</span>}

                    {paragraph.sul_contact__link?.url &&
                      <Link
                        className="su-underline su-text-white hocus:su-text-illuminating-dark hocus:su-no-underline active:su-text-digital-red-light su-font-normal"
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
                  <EmailLink
                    email={paragraph.sul_contact__email}
                    className="su-underline su-text-white hocus:su-text-illuminating-dark hocus:su-no-underline active:su-text-digital-red-light su-font-normal su-break-words"
                  />
                </div>
              </Conditional>

              <Conditional showWhen={paragraph.sul_contact__address}>
                <div className="su-relative su-flex su-items-center su-type-1">
                  <MapPinIcon width={19} className="su-mr-12 su-flex-shrink-0"/>

                  {paragraph.sul_contact__map_link &&
                    <Link href={paragraph.sul_contact__map_link.uri}
                          className="su-underline su-text-white hocus:su-text-illuminating-dark hocus:su-no-underline active:su-text-digital-red-light su-font-normal">
                      {addressString}
                    </Link>
                  }

                  {!paragraph.sul_contact__map_link && <>{addressString}</>}
                </div>
              </Conditional>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManualFieldsCard;