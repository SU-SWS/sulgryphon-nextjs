import Link from "@/components/patterns/elements/drupal-link"
import Image from "next/image"
import {ClockIcon, EnvelopeIcon, MapPinIcon, PhoneIcon} from "@heroicons/react/24/outline"
import {HTMLAttributes} from "react"
import EmailLink from "@/components/patterns/elements/email-link"
import {buildUrl} from "@/lib/drupal/utils"
import {ParagraphSulContactCard} from "@/lib/gql/__generated__/drupal.d"

type Props = HTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSulContactCard
}

const ManualFieldsCard = ({paragraph}: Props) => {
  const imageUrl = paragraph.sulContactImage?.mediaImage.url
  const imageAlt = paragraph.sulContactImage?.mediaImage.alt || ""

  const address = [
    paragraph.sulContactAddress?.addressLine1,
    paragraph.sulContactAddress?.addressLine2,
    paragraph.sulContactAddress?.locality + " " + paragraph.sulContactAddress?.administrativeArea,
    paragraph.sulContactAddress?.postalCode,
  ]
  const addressString = address.filter(x => !!x).join(", ")

  return (
    <div className="@container">
      <div className="basefont-20 flex w-full flex-col rounded border-0 leading-display shadow-md @6xl:flex-row">
        {imageUrl && (
          <div className="relative aspect-[16/9] flex-shrink-0 overflow-hidden @6xl:w-1/2">
            <Image
              className="static object-cover object-center"
              src={buildUrl(imageUrl).toString()}
              alt={imageAlt}
              fill
              sizes="(max-width: 1700px) 100vw, 1500px"
            />
          </div>
        )}

        <div className="card-body rs-px-2 rs-py-4 flex-grow bg-black-true">
          <div className="pt-0 text-18 font-normal leading-display">
            {paragraph.sulContactTitle && <h2 className="rs-mb-1 type-3 text-white">{paragraph.sulContactTitle}</h2>}

            <div className="leading-tight text-white md:rs-pr-2">
              {(paragraph.sulContactHours || paragraph.sulContactLink?.url) && (
                <div className="rs-mb-0 type-1 relative flex flex-row">
                  <ClockIcon title="Hours" width={19} className="mr-12 mt-01em flex-shrink-0" />
                  <div className="rs-mb-neg2 text-white sm:mb-0">
                    {paragraph.sulContactHours}

                    {paragraph.sulContactHours && paragraph.sulContactLink?.url && <span className="mx-5">/</span>}

                    {paragraph.sulContactLink?.url && (
                      <Link
                        className="font-normal text-white underline active:text-digital-red-light hocus:text-illuminating-dark hocus:no-underline"
                        href={paragraph.sulContactLink?.url}
                      >
                        {paragraph.sulContactLink?.title}
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {paragraph.sulContactPhone && (
                <div className="rs-mb-0 type-1 relative flex flex-row items-center">
                  <PhoneIcon title="Phone" width={19} className="mr-12 flex-shrink-0" />
                  {paragraph.sulContactPhone}
                </div>
              )}

              {paragraph.sulContactEmail && (
                <div className="rs-mb-0 type-1 relative flex flex-row items-center">
                  <EnvelopeIcon title="Email" width={19} className="mr-12 mt-02em flex-shrink-0" />
                  <EmailLink
                    email={paragraph.sulContactEmail}
                    className="break-words font-normal text-white underline active:text-digital-red-light hocus:text-illuminating-dark hocus:no-underline"
                  />
                </div>
              )}

              {paragraph.sulContactAddress && (
                <div className="type-1 relative flex items-center">
                  <MapPinIcon title="Location" width={19} className="mr-12 flex-shrink-0" />

                  {paragraph.sulContactMapLink?.url && (
                    <Link
                      href={paragraph.sulContactMapLink.url}
                      className="font-normal text-white underline active:text-digital-red-light hocus:text-illuminating-dark hocus:no-underline"
                    >
                      {addressString}
                    </Link>
                  )}

                  {!paragraph.sulContactMapLink && <>{addressString}</>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManualFieldsCard
