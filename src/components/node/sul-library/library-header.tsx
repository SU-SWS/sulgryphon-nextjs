
import Card from "@/components/patterns/card";
import {EnvelopeIcon, PhoneIcon} from "@heroicons/react/20/solid";
import Link from "@/components/patterns/elements/drupal-link";
import {MapPinIcon} from "@heroicons/react/24/outline";
import Wave from "@/components/patterns/wave";
import Image from "next/image";
import LibraryHeaderHours from "./library-hours";
import EmailLink from "@/components/patterns/elements/email-link";
import {buildUrl} from "@/lib/drupal/utils";
import {NodeSulLibrary} from "@/lib/gql/__generated__/drupal.d";

const LibraryHeader = ({node}: { node: NodeSulLibrary }) => {
  const bannerImageUrl = node.suLibraryBanner?.mediaImage.url;
  const bannerImageAlt = node.suLibraryBanner?.mediaImage.alt|| '';

  const contactImageUrl = node.suLibraryContactImg?.mediaImage.url || bannerImageUrl;
  const contactImageAlt = node.suLibraryContactImg?.mediaImage.alt || bannerImageAlt;

  return (
    <header className="mb-100 relative">
      <div className="absolute h-full w-full">
        <div className="hidden md:block w-full h-full overflow-hidden relative">
          {bannerImageUrl &&
            <Image
              className="object-cover object-center"
              src={buildUrl(bannerImageUrl).toString()}
              alt={bannerImageAlt}
              fill
              sizes="(max-width: 1700px) 100vw, 1500px"
            />
          }
        </div>
      </div>
      <div
        className="absolute block w-full h-full top-0 bg-gradient-to-tl to-black-true from-transparent"
        aria-hidden="true">
      </div>
      <div className="w-full max-w-[calc(100vw-10rem)] md::max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)] mx-auto relative z-10 top-50 md:top-100 md:min-h-[300px]">
        <div className="md:flex justify-between">
          <div className="flex items-center text-white mb-40 md:w-1/3 lg:w-1/2">
            <h1 className="type-4">{node.title}</h1>
          </div>

          <div className="relative z-100 md:min-w-[300px] xl:min-w-[400px]">
            <Card
              className="border-0 rounded"
              image={contactImageUrl && <Image
                className="object-cover object-center"
                src={buildUrl(contactImageUrl).toString()}
                alt={contactImageAlt}
                fill
                sizes="(max-width: 1700px) 100vw, 1500px"
              />
              }
              footer={
                <>
                  <div className="leading-tight text-black md:rs-px-2 rs-pb-1 mt-[-2rem]">
                    {node.suLibraryPhone &&
                      <div className="relative flex flex-row items-start mb-4 type-1">
                        <PhoneIcon width={19}
                                   className="md:absolute md:left-[-38px] md:top-01em mr-12"/>
                        {node.suLibraryPhone}
                      </div>
                    }
                    {node.suLibraryEmail &&
                      <div
                        className="relative flex flex-row items-start mt-20 md:mt-18 mb-4 type-1">
                        <EnvelopeIcon width={19}
                                      className="md:absolute md:left-[-38px] md:top-02em mt-01em md:mt-0 mr-12"/>
                        <EmailLink email={node.suLibraryEmail} className="no-underline hocus:underline break-words"/>
                      </div>
                    }
                    {node.suLibraryAddress &&
                      <div
                        className="relative flex flex-row items-start mt-20 md:mt-18 mb-4 type-1">
                        <MapPinIcon width={19}
                                    className="md:absolute md:left-[-38px] md:top-01em mt-01em md:mt-0 mr-12"/>
                        {node.suLibraryMapLink?.url ? (
                          <Link href={node.suLibraryMapLink.url} className="no-underline hocus:underline">
                            <div>{node.suLibraryAddress.addressLine1}</div>
                            <div>{node.suLibraryAddress.addressLine2}</div>
                            <div>{node.suLibraryAddress.locality}, {node.suLibraryAddress.administrativeArea} {node.suLibraryAddress.postalCode}</div>
                          </Link>
                        ) : (
                          <>
                            <div>{node.suLibraryAddress.addressLine1}</div>
                            <div>{node.suLibraryAddress.addressLine2}</div>
                            <div>{node.suLibraryAddress.locality}, {node.suLibraryAddress.administrativeArea} {node.suLibraryAddress.postalCode}</div>
                          </>
                        )}
                      </div>
                    }
                  </div>
                  {node.suLibraryHours &&
                    <LibraryHeaderHours hoursId={node.suLibraryHours}/>
                  }
                </>
              }
            />
          </div>
        </div>
      </div>

      <div className="relative">
        <Wave/>
      </div>
    </header>

  )
}

export default LibraryHeader;
