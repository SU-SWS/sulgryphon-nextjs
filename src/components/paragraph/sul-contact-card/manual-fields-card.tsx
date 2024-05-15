import Link from "@/components/patterns/elements/drupal-link";
import Image from "next/image";
import {ClockIcon, EnvelopeIcon, MapPinIcon, PhoneIcon} from "@heroicons/react/24/outline";
import {PropsWithoutRef} from "react";
import EmailLink from "@/components/patterns/elements/email-link";
import {buildUrl} from "@/lib/drupal/utils";
import {ParagraphSulContactCard} from "@/lib/gql/__generated__/drupal.d";

interface Props extends PropsWithoutRef<any> {
  paragraph: ParagraphSulContactCard
}

const ManualFieldsCard = ({paragraph}: Props) => {

  const imageUrl = paragraph.sulContactImage?.mediaImage.url
  const imageAlt = paragraph.sulContactImage?.mediaImage.alt || ''

  const address = [
    paragraph.sulContactAddress?.addressLine1,
    paragraph.sulContactAddress?.addressLine2,
    paragraph.sulContactAddress?.locality + " " + paragraph.sulContactAddress?.administrativeArea,
    paragraph.sulContactAddress?.postalCode
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
              sizes="(max-width: 1700px) 100vw, 1500px"
            />
          </div>
        }

        <div className="card-body rs-px-2 rs-py-4 bg-black-true flex-grow">
          <div className="leading-display text-18 pt-0 font-normal ">

            {(paragraph.sulContactTitle) &&
              <h2 className="type-3 rs-mb-1 text-white">{paragraph.sulContactTitle}</h2>
            }

            <div className="leading-tight md:rs-pr-2 text-white">

              {(paragraph.sulContactHours || paragraph.sulContactLink?.url) &&
                <div className="relative flex flex-row rs-mb-0 type-1">
                  <ClockIcon title="Time" width={19} className="mr-12 mt-01em flex-shrink-0"/>
                  <div className="text-white rs-mb-neg2 sm:mb-0">
                    {paragraph.sulContactHours}

                    {(paragraph.sulContactHours && paragraph.sulContactLink?.url) &&
                      <span className="mx-5">/</span>}

                    {paragraph.sulContactLink?.url &&
                      <Link
                        className="underline text-white hocus:text-illuminating-dark hocus:no-underline active:text-digital-red-light font-normal"
                        href={paragraph.sulContactLink?.url}>
                        {paragraph.sulContactLink?.title}
                      </Link>
                    }

                  </div>
                </div>
              }

              {(paragraph.sulContactPhone) &&
                <div className="relative flex flex-row items-center rs-mb-0 type-1">
                  <PhoneIcon title="Telephone" width={19} className="mr-12 flex-shrink-0"/>
                  {paragraph.sulContactPhone}
                </div>
              }

              {paragraph.sulContactEmail &&
                <div className="relative flex flex-row items-center rs-mb-0 type-1">
                  <EnvelopeIcon title="Email" width={19} className="mt-02em mr-12 flex-shrink-0"/>
                  <EmailLink
                    email={paragraph.sulContactEmail}
                    className="underline text-white hocus:text-illuminating-dark hocus:no-underline active:text-digital-red-light font-normal break-words"
                  />
                </div>
              }

              {paragraph.sulContactAddress &&
                <div className="relative flex items-center type-1">
                  <MapPinIcon title="Map" width={19} className="mr-12 flex-shrink-0"/>

                  {paragraph.sulContactMapLink?.url &&
                    <Link href={paragraph.sulContactMapLink.url}
                          className="underline text-white hocus:text-illuminating-dark hocus:no-underline active:text-digital-red-light font-normal">
                      {addressString}
                    </Link>
                  }

                  {!paragraph.sulContactMapLink && <>{addressString}</>}
                </div>
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManualFieldsCard;