import Card from "@/components/patterns/card"
import {EnvelopeIcon, PhoneIcon} from "@heroicons/react/20/solid"
import Link from "@/components/patterns/elements/drupal-link"
import {MapPinIcon} from "@heroicons/react/24/outline"
import Wave from "@/components/patterns/wave"
import Image from "next/image"
import LibraryHeaderHours from "./library-hours"
import EmailLink from "@/components/patterns/elements/email-link"
import {buildUrl} from "@/lib/drupal/utils"
import {NodeSulLibrary} from "@/lib/gql/__generated__/drupal.d"

const LibraryHeader = ({node}: {node: NodeSulLibrary}) => {
  const bannerImageUrl = node.suLibraryBanner?.mediaImage.url
  const bannerImageAlt = node.suLibraryBanner?.mediaImage.alt || ""

  const contactImageUrl = node.suLibraryContactImg?.mediaImage.url || bannerImageUrl
  const contactImageAlt = node.suLibraryContactImg?.mediaImage.alt || bannerImageAlt

  return (
    <header className="relative mb-100">
      <div className="absolute h-full w-full">
        <div className="relative hidden h-full w-full overflow-hidden md:block">
          {bannerImageUrl && (
            <Image
              className="object-cover object-center"
              src={buildUrl(bannerImageUrl).toString()}
              alt={bannerImageAlt}
              fill
              sizes="(max-width: 1700px) 100vw, 1500px"
            />
          )}
        </div>
      </div>
      <div
        className="absolute top-0 block h-full w-full bg-gradient-to-tl from-transparent to-black-true"
        aria-hidden="true"
      ></div>
      <div className="md::max-w-[calc(100vw-20rem)] relative top-50 z-10 mx-auto w-full max-w-[calc(100vw-10rem)] md:top-100 md:min-h-[300px] 3xl:max-w-[calc(1500px-20rem)]">
        <div className="justify-between md:flex">
          <div className="mb-40 flex items-center text-white md:w-1/3 lg:w-1/2">
            <h1 className="type-4" id={node.id}>
              {node.title}
            </h1>
          </div>

          <div className="z-100 relative md:min-w-[300px] xl:min-w-[400px]">
            <Card
              className="rounded border-0"
              image={
                contactImageUrl && (
                  <Image
                    className="object-cover object-center"
                    src={buildUrl(contactImageUrl).toString()}
                    alt={contactImageAlt}
                    fill
                    sizes="(max-width: 1700px) 100vw, 1500px"
                  />
                )
              }
              footer={
                <>
                  <div className="rs-pb-1 mt-[-2rem] leading-tight text-black md:rs-px-2">
                    {node.suLibraryPhone && (
                      <div className="type-1 relative mb-4 flex flex-row items-start">
                        <PhoneIcon title="Phone" width={19} className="mr-12 md:absolute md:left-[-38px] md:top-01em" />
                        {node.suLibraryPhone}
                      </div>
                    )}
                    {node.suLibraryEmail && (
                      <div className="type-1 relative mb-4 mt-20 flex flex-row items-start md:mt-18">
                        <EnvelopeIcon
                          width={19}
                          title="Email"
                          className="mr-12 mt-01em md:absolute md:left-[-38px] md:top-02em md:mt-0"
                        />
                        <EmailLink email={node.suLibraryEmail} className="break-words no-underline hocus:underline" />
                      </div>
                    )}
                    {node.suLibraryAddress && (
                      <div className="type-1 relative mb-4 mt-20 flex flex-row items-start md:mt-18">
                        <MapPinIcon
                          title="Location"
                          width={19}
                          className="mr-12 mt-01em md:absolute md:left-[-38px] md:top-01em md:mt-0"
                        />
                        {node.suLibraryMapLink?.url ? (
                          <Link href={node.suLibraryMapLink.url} className="no-underline hocus:underline">
                            <div>
                              {node.suLibraryAddress?.addressLine1}
                              <span className="sr-only">&nbsp;</span>
                            </div>
                            <div>
                              {node.suLibraryAddress.addressLine2}
                              <span className="sr-only">&nbsp;</span>
                            </div>
                            <div>
                              {node.suLibraryAddress.locality}, {node.suLibraryAddress.administrativeArea}{" "}
                              {node.suLibraryAddress.postalCode}
                            </div>
                          </Link>
                        ) : (
                          <>
                            <div>{node.suLibraryAddress.addressLine1}</div>
                            <div>{node.suLibraryAddress.addressLine2}</div>
                            <div>
                              {node.suLibraryAddress.locality}, {node.suLibraryAddress.administrativeArea}{" "}
                              {node.suLibraryAddress.postalCode}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  {node.suLibraryHours && <LibraryHeaderHours hoursId={node.suLibraryHours} />}
                </>
              }
            />
          </div>
        </div>
      </div>

      <div className="relative">
        <Wave />
      </div>
    </header>
  )
}

export default LibraryHeader
