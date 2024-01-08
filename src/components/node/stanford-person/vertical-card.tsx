import Image from "next/image";
import Link from "@/components/patterns/elements/drupal-link";
import Conditional from "@/components/utils/conditional";
import {EnvelopeIcon} from "@heroicons/react/20/solid";
import LibCal from "./libcal";
import {Person} from "@/lib/drupal/drupal";
import EmailLink from "@/components/patterns/elements/email-link";
import {PropsWithoutRef} from "react";
import {buildUrl} from "@/lib/drupal/utils";

interface Props {
  node: Person
  h3Heading?: boolean
}

const VerticalPersonCard = ({node, h3Heading, ...props}: PropsWithoutRef<Props>) => {
  const HeadingElement = h3Heading ? 'h3' : 'h2';
  const imageUrl = node.su_person_photo?.field_media_image.uri.url;
  const imageAlt = node.su_person_photo?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const imageHeight = node.su_person_photo?.field_media_image?.resourceIdObjMeta?.height;
  const imageWidth = node.su_person_photo?.field_media_image?.resourceIdObjMeta?.width;
  const placeholder = node.su_person_photo?.field_media_image?.uri.base64;

  return (
    <article
      className="@container w-full basefont-23 leading-display bg-white text-black border-x border-t-5 border-b border-solid border-black-10 border-t-digital-red shadow-md rs-pt-2 rs-px-2 rs-pb-3 mt-70" {...props}>
      {imageUrl &&
        <div
          className="relative flex justify-center pb-70 @lg:pb-80">
          <div className="absolute top-[-11rem]">
            <div
              className="rounded-full aspect-[1/1] w-[130px] @lg:w-[150px] overflow-hidden">
              <Image
                src={buildUrl(imageUrl).toString()}
                alt={imageAlt}
                height={imageHeight}
                width={imageWidth}
                placeholder={placeholder ? 'blur' : 'empty'}
                blurDataURL={placeholder}
              />
            </div>
          </div>
        </div>
      }

      <div className="flex flex-col gap-[4.5rem]">
        <div className="flex flex-col">
          <Link
            href={node.path?.alias ?? "#"}
            className="underline hocus:no-underline active:no-underline text-black hocus:text-brick-dark active:text-digital-red"
          >
            <HeadingElement className="type-0 @lg:type-2 font-serif">{node.title}</HeadingElement>
          </Link>
          <div className="flex flex-col gap-[1.2rem]">
            <Conditional showWhen={node.su_person_full_title}>
              <div className="text-18 @lg:type-0">{node.su_person_full_title}</div>
            </Conditional>

            {node.su_person_email &&
              <div className="flex items-center">
                <EnvelopeIcon width={20} className="flex-shrink-0 mr-3 text-digital-blue"/>

                <EmailLink
                  email={node.su_person_email}
                  className="transition-colors hover:text-brick-dark hover:bg-black-10 focus:bg-none focus:text-cardinal-red active:text-cardinal-red no-underline text-digital-blue text-18 @lg:text-18 break-words"
                />
              </div>
            }
          </div>
        </div>

        <LibCal libcalId={node.sul_person__libcal_id} srText={node.title}/>
      </div>
    </article>
  )
}
export default VerticalPersonCard;