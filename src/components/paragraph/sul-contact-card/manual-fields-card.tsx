import Link from "@/components/patterns/elements/drupal-link";
import Image from "next/image";
import {ClockIcon, EnvelopeIcon, MapPinIcon, PhoneIcon} from "@heroicons/react/24/outline";
import Conditional from "@/components/utils/conditional";
import {ContactCardParagraph} from "@/lib/drupal/drupal";
import {PropsWithoutRef} from "react";
import EmailLink from "@/components/patterns/elements/email-link";
import {buildUrl} from "@/lib/drupal/utils";

interface Props extends PropsWithoutRef<any> {
  paragraph: ContactCardParagraph
}

const ManualFieldsCard = ({paragraph}: Props) => {

  const imageUrl = paragraph.sul_contact__image?.field_media_image.uri.url
  const imageAlt = paragraph.sul_contact__image?.field_media_image?.resourceIdObjMeta?.alt || '';
  const placeholder = paragraph.sul_contact__image?.field_media_image?.uri.base64;

  const address = [
    paragraph.sul_contact__address?.address_line1,
    paragraph.sul_contact__address?.address_line2,
    paragraph.sul_contact__address?.locality + " " + paragraph.sul_contact__address?.administrative_area,
    paragraph.sul_contact__address?.postal_code
  ];
  const addressString = address.filter(x => !!x).join(', ');

  return (
    <div className="@container">
      <div
        className="flex w-full basefont-23 leading-display shadow-md border-0 rounded flex-col @6xl:flex-row">

        {imageUrl &&
          <div className="overflow-hidden aspect-[16/9] relative flex-shrink-0 @6xl:w-1/2">
            <Image
              className="object-cover object-center static"
              src={buildUrl(imageUrl).toString()}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px"
              placeholder={placeholder ? 'blur' : 'empty'}
              blurDataURL={placeholder}
            />
          </div>
        }

        <div className="card-body rs-px-2 rs-py-4 bg-black-true flex-grow">
          <div className="leading-display text-18 pt-0 font-normal ">

            <Conditional showWhen={paragraph.sul_contact__title}>
              <h2 className="type-3 rs-mb-1 text-white">{paragraph.sul_contact__title}</h2>
            </Conditional>

            <div className="leading-tight md:rs-pr-2 text-white">

              <Conditional showWhen={paragraph.sul_contact__hours || paragraph.sul_contact__link?.url}>
                <div className="relative flex flex-row rs-mb-0 type-1">
                  <ClockIcon width={19} className="mr-12 mt-01em flex-shrink-0"/>
                  <div className="text-white rs-mb-neg2 sm:mb-0">
                    {paragraph.sul_contact__hours}

                    {(paragraph.sul_contact__hours && paragraph.sul_contact__link?.url) &&
                      <span className="mx-5">/</span>}

                    {paragraph.sul_contact__link?.url &&
                      <Link
                        className="underline text-white hocus:text-illuminating-dark hocus:no-underline active:text-digital-red-light font-normal"
                        href={paragraph.sul_contact__link?.url}>
                        {paragraph.sul_contact__link?.title}
                      </Link>
                    }

                  </div>
                </div>
              </Conditional>

              <Conditional showWhen={paragraph.sul_contact__phone}>
                <div className="relative flex flex-row items-center rs-mb-0 type-1">
                  <PhoneIcon width={19} className="mr-12 flex-shrink-0"/>
                  {paragraph.sul_contact__phone}
                </div>
              </Conditional>

              {paragraph.sul_contact__email &&
                <div className="relative flex flex-row items-center rs-mb-0 type-1">
                  <EnvelopeIcon width={19} className="mt-02em mr-12 flex-shrink-0"/>
                  <EmailLink
                    email={paragraph.sul_contact__email}
                    className="underline text-white hocus:text-illuminating-dark hocus:no-underline active:text-digital-red-light font-normal break-words"
                  />
                </div>
              }

              <Conditional showWhen={paragraph.sul_contact__address}>
                <div className="relative flex items-center type-1">
                  <MapPinIcon width={19} className="mr-12 flex-shrink-0"/>

                  {paragraph.sul_contact__map_link &&
                    <Link href={paragraph.sul_contact__map_link.uri}
                          className="underline text-white hocus:text-illuminating-dark hocus:no-underline active:text-digital-red-light font-normal">
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