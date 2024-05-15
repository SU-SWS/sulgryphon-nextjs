import Link from "@/components/patterns/elements/drupal-link";
import Image from "next/image";
import {EnvelopeIcon, MapPinIcon, PhoneIcon} from "@heroicons/react/24/outline";
import NodeReferenceCardHours from "@/components/paragraph/sul-contact-card/node-reference-card-hours";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import EmailLink from "@/components/patterns/elements/email-link";
import {buildUrl} from "@/lib/drupal/utils";
import {ParagraphSulContactCard} from "@/lib/gql/__generated__/drupal.d";

interface Props {
  paragraph: ParagraphSulContactCard
}

const NodeReferenceCard = ({paragraph}: Props) => {
  const imageUrl = paragraph.sulContactBranch?.suLibraryContactImg?.mediaImage.url
  const imageAlt = paragraph.sulContactBranch?.suLibraryContactImg?.mediaImage.alt ?? '';

  const address = [
    paragraph.sulContactBranch?.suLibraryAddress?.addressLine1,
    paragraph.sulContactBranch?.suLibraryAddress?.addressLine2,
    paragraph.sulContactBranch?.suLibraryAddress?.locality + " " + paragraph.sulContactBranch?.suLibraryAddress?.administrativeArea,
    paragraph.sulContactBranch?.suLibraryAddress?.postalCode
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

        <div className="card-body items-start rs-px-2 rs-py-4 bg-black-true flex-grow">
          <div className="leading-display text-18 pt-0 font-normal ">

            {paragraph.sulContactBranch?.path ? (
              <Link href={paragraph.sulContactBranch?.path}
                    className="underline text-white hocus:text-illuminating-dark hocus:no-underline active:text-digital-red-light">
                <h2 className="type-3 rs-mb-1">{paragraph.sulContactBranch?.title}</h2>
              </Link>
            ) : (
              <h2 className="type-3 rs-mb-1 text-white">{paragraph.sulContactTitle}</h2>
            )}

            <div className="leading-tight md:rs-pr-2 text-white">
              {paragraph.sulContactBranch?.suLibraryHours &&
                <CachedClientFetch>
                  <NodeReferenceCardHours
                    branchId={paragraph.sulContactBranch?.suLibraryHours}
                    branchName={paragraph.sulContactBranch?.title}
                  />
                </CachedClientFetch>
              }

              {(paragraph.sulContactBranch?.suLibraryPhone) &&
                <div className="relative flex flex-row items-center rs-mb-0 type-1">
                  <PhoneIcon title="Telephone" width={19} className="mr-12 flex-shrink-0"/>
                  {paragraph.sulContactBranch?.suLibraryPhone}
                </div>
              }

              {paragraph.sulContactBranch?.suLibraryEmail &&
                <div className="relative flex flex-row items-center rs-mb-0 type-1">
                  <EnvelopeIcon title="Email" width={19} className="mt-02em mr-12 flex-shrink-0"/>
                  <EmailLink email={paragraph.sulContactBranch?.suLibraryEmail}
                             className="underline text-white hocus:text-illuminating-dark hocus:no-underline active:text-digital-red-light font-normal break-words"/>
                </div>
              }

              {(paragraph.sulContactBranch?.suLibraryAddress) &&
                <div className="relative flex flex-row items-start type-1">
                  <MapPinIcon title="Map" title="Map" width={19} className="mt-01em md:mt-0 mr-12 flex-shrink-0"/>

                  {(paragraph.sulContactBranch?.suLibraryMapLink?.url) ? (
                    <Link href={paragraph.sulContactBranch?.suLibraryMapLink.url}
                          className="underline text-white hocus:text-illuminating-dark hocus:no-underline active:text-digital-red-light font-normal">
                      <div>{addressString}</div>
                    </Link>
                  ) : (
                    <div>
                      {addressString}
                    </div>
                  )}

                </div>
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NodeReferenceCard;