import Link from "@/components/patterns/elements/drupal-link"
import Image from "next/image"
import {EnvelopeIcon, MapPinIcon, PhoneIcon} from "@heroicons/react/24/outline"
import NodeReferenceCardHours from "@/components/paragraph/sul-contact-card/node-reference-card-hours"
import EmailLink from "@/components/patterns/elements/email-link"
import {buildUrl} from "@/lib/drupal/utils"
import {NodeSulLibrary, ParagraphSulContactCard} from "@/lib/gql/__generated__/graphql"
import {getEntityFromPath} from "@/lib/gql/gql-queries"

interface Props {
  paragraph: ParagraphSulContactCard
}

const NodeReferenceCard = async ({paragraph}: Props) => {
  const contactBranchQuery =
    paragraph.sulContactBranch?.path &&
    (await getEntityFromPath<NodeSulLibrary>(paragraph.sulContactBranch.path, false, true))
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
      <div className="flex w-full flex-col rounded-[0.3rem] border-0 leading-display shadow-md @6xl:flex-row">
        {imageUrl && (
          <div className="relative aspect-[16/9] shrink-0 overflow-hidden @6xl:w-1/2">
            <Image
              className="static object-cover object-center"
              src={buildUrl(imageUrl).toString()}
              alt={imageAlt}
              fill
              sizes="(max-width: 1700px) 100vw, 1500px"
            />
          </div>
        )}

        <div className="card-body grow items-start bg-black-true rs-py-4 rs-px-2">
          <div className="pt-0 text-18 leading-display font-normal">
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
                <NodeReferenceCardHours branchId={contactBranch?.suLibraryHours} branchName={contactBranch?.title} />
              )}

              {contactBranch?.suLibraryPhone && (
                <div className="relative rs-mb-0 flex flex-row items-center type-0">
                  <PhoneIcon title="Phone" width={19} className="mr-12 shrink-0" />
                  {contactBranch?.suLibraryPhone}
                </div>
              )}

              {contactBranch?.suLibraryEmail && (
                <div className="relative rs-mb-0 flex flex-row items-center type-0">
                  <EnvelopeIcon title="Email" width={19} className="mt-02em mr-12 shrink-0" />
                  <EmailLink
                    email={contactBranch?.suLibraryEmail}
                    className="font-normal wrap-anywhere text-white underline active:text-digital-red-light hocus:text-illuminating-dark hocus:no-underline"
                  />
                </div>
              )}

              {contactBranch?.suLibraryAddress && (
                <div className="relative flex flex-row items-start type-0">
                  <MapPinIcon title="Location" width={19} className="mt-01em mr-12 shrink-0 md:mt-0" />

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
