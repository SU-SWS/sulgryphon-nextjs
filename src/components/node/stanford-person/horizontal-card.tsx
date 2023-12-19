import Image from "next/image";
import Link from "@/components/patterns/elements/drupal-link";
import Conditional from "@/components/utils/conditional";
import {EnvelopeIcon} from "@heroicons/react/20/solid";
import LibCal from "./libcal";
import {Person} from "@/lib/drupal/drupal";
import {PropsWithoutRef} from "react";
import EmailLink from "@/components/patterns/elements/email-link";

interface Props extends PropsWithoutRef<any> {
  node: Person
  h3Heading?: boolean
}

const HorizontalPersonCard = ({node, h3Heading, ...props}: PropsWithoutRef<Props>) => {
  const HeadingElement = h3Heading ? 'h3' : 'h2';
  const imageUrl = node.su_person_photo?.field_media_image?.image_style_uri?.medium_square;
  const imageAlt = node.su_person_photo?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const placeholder = node.su_person_photo?.field_media_image?.uri.base64;
  if (!node.path?.alias) console.error('Missing path alias for person card component: ' + node.id)

  return (
    <article
      className="flex flex-col @3xl:flex-row w-full basefont-23 leading-display bg-white text-black border-x border-t border-b-5 border-solid border-black-10  border-b-digital-red shadow-md rs-pt-2 rs-px-2 rs-pb-3 mt-0" {...props}>
      {imageUrl &&
        <div className="flex items-center mx-auto mb-50 @3xl:ml-0 @3xl:mb-0 @3xl:mr-50">
          <div className="relative aspect-[1/1] w-[155px]">
            <Image
              src={imageUrl}
              alt={imageAlt}
              placeholder={placeholder ? 'blur' : 'empty'}
              blurDataURL={placeholder}
              className="object-contain rounded-full"
              fill
            />
          </div>
        </div>
      }
      <div className="flex flex-col gap-[4.5rem]">
        <div className="flex flex-col gap-[1rem]">
          <Link href={node.path?.alias ?? "#"}
                className="underline hocus:no-underline active:no-underline text-black hocus:text-brick-dark active:text-digital-red">
            <HeadingElement className="type-2">{node.title}</HeadingElement>
          </Link>

          <Conditional showWhen={node.su_person_full_title}>
            <div className="type-0">{node.su_person_full_title}</div>
          </Conditional>

          <Conditional showWhen={node.su_person_email}>
            <div className="">
              <EnvelopeIcon width={20} className="inline-block mr-6 text-digital-blue"/>

              <EmailLink
                email={node.su_person_email}
                className="transition-colors hover:text-brick-dark hover:bg-black-10 focus:bg-none focus:text-cardinal-red active:text-cardinal-red no-underline text-digital-blue break-words"
              />
            </div>
          </Conditional>
        </div>

        <LibCal libcalId={node.sul_person__libcal_id} srText={node.title}/>
      </div>
    </article>
  )
}
export default HorizontalPersonCard;