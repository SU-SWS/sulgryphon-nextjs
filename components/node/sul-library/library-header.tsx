import {Library} from "@/lib/drupal/drupal";
import Card from "@/components/patterns/card";
import {EnvelopeIcon, PhoneIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import {MapPinIcon} from "@heroicons/react/24/outline";
import Wave from "@/components/patterns/wave";
import Image from "next/image";
import LibraryHeaderHours from "./library-hours";
import EmailLink from "@/components/patterns/email-link";

const LibraryHeader = ({node}: { node: Library }) => {
  const bannerImageUrl = node.su_library__banner?.field_media_image?.image_style_uri?.breakpoint_2xl_2x;
  const bannerImageAlt = node.su_library__banner?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const bannerPlaceholder = node.su_library__banner?.field_media_image?.uri.base64;

  const contactImageUrl = node.su_library__contact_img?.field_media_image?.image_style_uri?.breakpoint_md_2x ?? bannerImageUrl;
  const contactImageAlt = node.su_library__contact_img?.field_media_image?.resourceIdObjMeta?.alt ?? bannerImageAlt;
  const contactPlaceholder = node.su_library__contact_img?.field_media_image?.uri.base64 ?? bannerPlaceholder;

  return (
    <header className="su-mb-100 su-relative">
      <div className="su-absolute su-h-full su-w-full">
        <div className="su-hidden md:su-block su-w-full su-h-full su-overflow-hidden su-relative">
          {bannerImageUrl &&
            <Image
              className="su-object-cover su-object-center"
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
        className="su-absolute su-block su-w-full su-h-full su-top-0 su-bg-gradient-to-tl su-to-black-true su-from-transparent"
        aria-hidden="true">
      </div>
      <div className="su-w-full su-max-w-[calc(100vw-10rem)] md::su-max-w-[calc(100vw-20rem)] 3xl:su-max-w-[calc(1500px-20rem)] su-mx-auto su-relative su-z-10 su-top-50 md:su-top-100 md:su-min-h-[300px]">
        <div className="md:su-flex su-justify-between">
          <div className="su-flex su-items-center su-text-white su-mb-40 md:su-w-1/3 lg:su-w-1/2">
            <h1 className="su-type-4">{node.title}</h1>
          </div>

          <div className="su-relative su-z-100 su-min-w-[300px] xl:su-min-w-[400px]">
            <Card
              className="su-border-0 su-rounded"
              image={contactImageUrl && <Image
                className="su-object-cover su-object-center"
                src={contactImageUrl}
                alt={contactImageAlt}
                fill={true}
                placeholder={contactPlaceholder ? 'blur' : 'empty'}
                blurDataURL={contactPlaceholder}
              />
              }
              footer={
                <>
                  <div className="su-leading-tight su-text-black md:su-rs-px-2 su-rs-pb-1 su-mt-[-2rem]">
                    {node.su_library__phone &&
                      <div className="su-relative su-flex su-flex-row su-items-start su-mb-4 su-type-1">
                        <PhoneIcon width={19}
                                   className="md:su-absolute md:su-left-[-38px] md:su-top-01em su-mr-12"/>
                        {node.su_library__phone}
                      </div>
                    }
                    {node.su_library__email &&
                      <div
                        className="su-relative su-flex su-flex-row su-items-start su-mt-20 md:su-mt-18 su-mb-4 su-type-1">
                        <EnvelopeIcon width={19}
                                      className="md:su-absolute md:su-left-[-38px] md:su-top-02em su-mt-01em md:su-mt-0 su-mr-12"/>
                        <EmailLink email={node.su_library__email} className="su-no-underline hocus:su-underline"/>
                      </div>
                    }
                    {node.su_library__address &&
                      <div
                        className="su-relative su-flex su-flex-row su-items-start su-mt-20 md:su-mt-18 su-mb-4 su-type-1">
                        <MapPinIcon width={19}
                                    className="md:su-absolute md:su-left-[-38px] md:su-top-01em su-mt-01em md:su-mt-0 su-mr-12"/>
                        {node.su_library__map_link ? (
                          <Link href={node.su_library__map_link.uri} className="su-no-underline hocus:su-underline">
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

      <div className="su-relative">
        <Wave/>
      </div>
    </header>

  )
}

export default LibraryHeader;
