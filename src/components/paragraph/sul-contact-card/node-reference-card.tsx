import Link from "@/components/patterns/elements/drupal-link"
import Image from "next/image"
import {EnvelopeIcon, MapPinIcon, PhoneIcon} from "@heroicons/react/24/outline"
import NodeReferenceCardHours from "@/components/paragraph/sul-contact-card/node-reference-card-hours"
import CachedClientFetch from "@/components/utils/cached-client-fetch"
import EmailLink from "@/components/patterns/elements/email-link"
import {buildUrl} from "@/lib/drupal/utils"
import {NodeSulLibrary, ParagraphSulContactCard} from "@/lib/gql/__generated__/drupal.d"
import {getEntityFromPath} from "@/lib/gql/fetcher"

interface Props {
  paragraph: ParagraphSulContactCard
}

const NodeReferenceCard = async ({paragraph}: Props) => {
  const contactBranchQuery =
    paragraph.sulContactBranch?.path && (await getEntityFromPath<NodeSulLibrary>(paragraph.sulContactBranch.path))
  const contactBranch = contactBranchQuery ? contactBranchQuery?.entity : undefined

  const imageUrl = contactBranch?.suLibraryContactImg?.mediaImage.url
  const imageAlt = contactBranch?.suLibraryContactImg?.mediaImage.alt ?? ""

  const address = [
    contactBranch?.suLibraryAddress?.addressLine1,
    contactBranch?.suLibraryAddress?.addressLine2,
    contactBranch?.suLibraryAddress?.locality + " " + contactBranch?.suLibraryAddress?.administrativeArea,
    contactBranch?.suLibraryAddress?.postalCode,
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

        <div className="card-body rs-px-2 rs-py-4 flex-grow items-start bg-black-true">
          <div className="pt-0 text-18 font-normal leading-display">
            {contactBranch?.path ? (
              <Link
                href={contactBranch?.path}
                className="text-white underline active:text-digital-red-light hocus:text-illuminating-dark hocus:no-underline"
              >
                <h2 className="rs-mb-1 type-2">{contactBranch?.title}</h2>
              </Link>
            ) : (
              <h2 className="rs-mb-1 type-2 text-white">{paragraph.sulContactTitle}</h2>
            )}

            <div className="leading-tight text-white md:rs-pr-2">
              {contactBranch?.suLibraryHours && (
                <CachedClientFetch>
                  <NodeReferenceCardHours branchId={contactBranch?.suLibraryHours} branchName={contactBranch?.title} />
                </CachedClientFetch>
              )}

              {contactBranch?.suLibraryPhone && (
                <div className="rs-mb-0 type-0 relative flex flex-row items-center">
                  <PhoneIcon title="Phone" width={19} className="mr-12 flex-shrink-0" />
                  {contactBranch?.suLibraryPhone}
                </div>
              )}

              {contactBranch?.suLibraryEmail && (
                <div className="rs-mb-0 type-0 relative flex flex-row items-center">
                  <EnvelopeIcon title="Email" width={19} className="mr-12 mt-02em flex-shrink-0" />
                  <EmailLink
                    email={contactBranch?.suLibraryEmail}
                    className="break-words font-normal text-white underline active:text-digital-red-light hocus:text-illuminating-dark hocus:no-underline"
                  />
                </div>
              )}

              {contactBranch?.suLibraryAddress && (
                <div className="type-0 relative flex flex-row items-start">
                  <MapPinIcon title="Location" width={19} className="mr-12 mt-01em flex-shrink-0 md:mt-0" />

                  {contactBranch?.suLibraryMapLink?.url ? (
                    <Link
                      href={contactBranch?.suLibraryMapLink.url}
                      className="font-normal text-white underline active:text-digital-red-light hocus:text-illuminating-dark hocus:no-underline"
                    >
                      <div>{addressString}</div>
                    </Link>
                  ) : (
                    <div>{addressString}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NodeReferenceCard
