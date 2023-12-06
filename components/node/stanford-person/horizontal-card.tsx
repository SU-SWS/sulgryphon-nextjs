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
      className="su-flex su-flex-col @3xl:su-flex-row su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border-x su-border-t su-border-b-5 su-border-solid su-border-black-10  su-border-b-digital-red su-shadow-md su-rs-pt-2 su-rs-px-2 su-rs-pb-3 su-mt-0" {...props}>
      {imageUrl &&
        <div className="su-flex su-items-center su-mx-auto su-mb-50 @3xl:su-ml-0 @3xl:su-mb-0 @3xl:su-mr-50">
          <div className="su-relative su-aspect-[1/1] su-w-[155px]">
            <Image
              src={imageUrl}
              alt={imageAlt}
              placeholder={placeholder ? 'blur' : 'empty'}
              blurDataURL={placeholder}
              className="su-object-contain su-rounded-full"
              fill
            />
          </div>
        </div>
      }
      <div className="su-flex su-flex-col su-gap-[4.5rem]">
        <div className="su-flex su-flex-col su-gap-[1rem]">
          <Link href={node.path?.alias ?? "#"}
                className="su-underline hocus:su-no-underline active:su-no-underline su-text-black hocus:su-text-brick-dark active:su-text-digital-red">
            <HeadingElement className="su-type-2">{node.title}</HeadingElement>
          </Link>

          <Conditional showWhen={node.su_person_full_title}>
            <div className="su-type-0">{node.su_person_full_title}</div>
          </Conditional>

          <Conditional showWhen={node.su_person_email}>
            <div className="">
              <EnvelopeIcon width={20} className="su-inline-block su-mr-6 su-text-digital-blue"/>

              <EmailLink
                email={node.su_person_email}
                className="su-transition-colors hover:su-text-brick-dark hover:su-bg-black-10 focus:su-bg-none focus:su-text-cardinal-red active:su-text-cardinal-red su-no-underline su-text-digital-blue su-break-words"
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