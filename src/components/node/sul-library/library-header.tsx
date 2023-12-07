import {Library} from "@/lib/drupal/drupal";
import Card from "@/components/patterns/card";
import {EnvelopeIcon, PhoneIcon} from "@heroicons/react/20/solid";
import Link from "@/components/patterns/elements/drupal-link";
import {MapPinIcon} from "@heroicons/react/24/outline";
import Wave from "@/components/patterns/wave";
import Image from "next/image";
import LibraryHeaderHours from "./library-hours";
import EmailLink from "@/components/patterns/elements/email-link";

const LibraryHeader = ({node}: { node: Library }) => {
  const bannerImageUrl = node.su_library__banner?.field_media_image?.image_style_uri?.breakpoint_2xl_2x;
  const bannerImageAlt = node.su_library__banner?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const bannerPlaceholder = node.su_library__banner?.field_media_image?.uri.base64;

  const contactImageUrl = node.su_library__contact_img?.field_media_image?.image_style_uri?.breakpoint_md_2x ?? bannerImageUrl;
  const contactImageAlt = node.su_library__contact_img?.field_media_image?.resourceIdObjMeta?.alt ?? bannerImageAlt;
  const contactPlaceholder = node.su_library__contact_img?.field_media_image?.uri.base64 ?? bannerPlaceholder;

  return (
    <header className="mb-100 relative">
      <div className="absolute h-full w-full">
        <div className="hidden md:block w-full h-full overflow-hidden relative">
          {bannerImageUrl &&
            <Image
              className="object-cover object-center"
              src={bannerImageUrl}
              alt={bannerImageAlt}
              fill={true}
              placeholder={bannerPlaceholder ? 'blur' : 'empty'}
              blurDataURL={bannerPlaceholder}
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
                src={contactImageUrl}
                alt={contactImageAlt}
                fill={true}
                placeholder={contactPlaceholder ? 'blur' : 'empty'}
                blurDataURL={contactPlaceholder}
              />
              }
              footer={
                <>
                  <div className="leading-tight text-black md:rs-px-2 rs-pb-1 mt-[-2rem]">
                    {node.su_library__phone &&
                      <div className="relative flex flex-row items-start mb-4 type-1">
                        <PhoneIcon width={19}
                                   className="md:absolute md:left-[-38px] md:top-01em mr-12"/>
                        {node.su_library__phone}
                      </div>
                    }
                    {node.su_library__email &&
                      <div
                        className="relative flex flex-row items-start mt-20 md:mt-18 mb-4 type-1">
                        <EnvelopeIcon width={19}
                                      className="md:absolute md:left-[-38px] md:top-02em mt-01em md:mt-0 mr-12"/>
                        <EmailLink email={node.su_library__email} className="no-underline hocus:underline break-words"/>
                      </div>
                    }
                    {node.su_library__address &&
                      <div
                        className="relative flex flex-row items-start mt-20 md:mt-18 mb-4 type-1">
                        <MapPinIcon width={19}
                                    className="md:absolute md:left-[-38px] md:top-01em mt-01em md:mt-0 mr-12"/>
                        {node.su_library__map_link ? (
                          <Link href={node.su_library__map_link.uri} className="no-underline hocus:underline">
                            <div>{node.su_library__address.address_line1}</div>
                            <div>{node.su_library__address.address_line2}</div>
                            <div>{node.su_library__address.locality}, {node.su_library__address.administrative_area} {node.su_library__address.postal_code}</div>
                          </Link>
                        ) : (
                          <>
                            <div>{node.su_library__address.address_line1}</div>
                            <div>{node.su_library__address.address_line2}</div>
                            <div>{node.su_library__address.locality}, {node.su_library__address.administrative_area} {node.su_library__address.postal_code}</div>
                          </>
                        )}
                      </div>
                    }
                  </div>
                  {node.su_library__hours &&
                    <LibraryHeaderHours hoursId={node.su_library__hours}/>
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
