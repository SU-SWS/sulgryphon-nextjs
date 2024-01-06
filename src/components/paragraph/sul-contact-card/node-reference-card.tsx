import Link from "@/components/patterns/elements/drupal-link";
import Image from "next/image";
import {EnvelopeIcon, MapPinIcon, PhoneIcon} from "@heroicons/react/24/outline";
import Conditional from "@/components/utils/conditional";
import {ContactCardParagraph} from "@/lib/drupal/drupal";
import NodeReferenceCardHours from "@/components/paragraph/sul-contact-card/node-reference-card-hours";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import EmailLink from "@/components/patterns/elements/email-link";

interface Props {
  paragraph: ContactCardParagraph
}

const NodeReferenceCard = ({paragraph}: Props) => {
  const imageUrl = paragraph.sul_contact__branch?.su_library__contact_img?.field_media_image?.image_style_uri?.breakpoint_md_2x
  const imageAlt = paragraph.sul_contact_branch?.su_library__contact_img?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const placeholder = paragraph.sul_contact__branch?.su_library__contact_img?.field_media_image?.uri.base64;

  const address = [
    paragraph.sul_contact__branch?.su_library__address?.address_line1,
    paragraph.sul_contact__branch?.su_library__address?.address_line2,
    paragraph.sul_contact__branch?.su_library__address?.locality + " " + paragraph.sul_contact__branch?.su_library__address?.administrative_area,
    paragraph.sul_contact__branch?.su_library__address?.postal_code
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
              src={imageUrl}
              alt={imageAlt}
              fill={true}
              placeholder={placeholder ? 'blur' : 'empty'}
              blurDataURL={placeholder}
            />
          </div>
        }

        <div className="card-body items-start rs-px-2 rs-py-4 bg-black-true flex-grow">
          <div className="leading-display text-18 pt-0 font-normal ">

            {paragraph.sul_contact__branch?.path ? (
              <Link href={paragraph.sul_contact__branch?.path?.alias}
                    className="underline text-white hocus:text-illuminating-dark hocus:no-underline active:text-digital-red-light">
                <h2 className="type-3 rs-mb-1">{paragraph.sul_contact__branch?.title}</h2>
              </Link>
            ) : (
              <h2 className="type-3 rs-mb-1 text-white">{paragraph.sul_contact__title}</h2>
            )}

            <div className="leading-tight md:rs-pr-2 text-white">
              {paragraph.sul_contact__branch?.su_library__hours &&
                <CachedClientFetch>
                  <NodeReferenceCardHours
                    branchId={paragraph.sul_contact__branch?.su_library__hours}
                    branchName={paragraph.sul_contact__branch?.title}
                  />
                </CachedClientFetch>
              }

              <Conditional showWhen={paragraph.sul_contact__branch?.su_library__phone}>
                <div className="relative flex flex-row items-center rs-mb-0 type-1">
                  <PhoneIcon width={19} className="mr-12 flex-shrink-0"/>
                  {paragraph.sul_contact__branch?.su_library__phone}
                </div>
              </Conditional>

              {paragraph.sul_contact__branch?.su_library__email &&
                <div className="relative flex flex-row items-center rs-mb-0 type-1">
                  <EnvelopeIcon width={19} className="mt-02em mr-12 flex-shrink-0"/>
                  <EmailLink email={paragraph.sul_contact__branch?.su_library__email}
                             className="underline text-white hocus:text-illuminating-dark hocus:no-underline active:text-digital-red-light font-normal break-words"/>
                </div>
              }

              <Conditional showWhen={paragraph.sul_contact__branch?.su_library__address}>
                <div className="relative flex flex-row items-start type-1">
                  <MapPinIcon width={19} className="mt-01em md:mt-0 mr-12 flex-shrink-0"/>

                  {(paragraph.sul_contact__branch?.su_library__map_link) ? (
                    <Link href={paragraph.sul_contact__branch?.su_library__map_link.uri}
                          className="underline text-white hocus:text-illuminating-dark hocus:no-underline active:text-digital-red-light font-normal">
                      <div>{addressString}</div>
                    </Link>
                  ) : (
                    <div>
                      {addressString}
                    </div>
                  )}

                </div>
              </Conditional>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NodeReferenceCard;