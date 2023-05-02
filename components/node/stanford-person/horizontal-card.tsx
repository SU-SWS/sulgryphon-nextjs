import Image from "next/image";
import Link from "next/link";
import Conditional from "@/components/utils/conditional";
import {EnvelopeIcon} from "@heroicons/react/20/solid";
import LibCal from "./libcal";
import {Person} from "@/lib/drupal/drupal";
import {PropsWithoutRef} from "react";

interface Props extends PropsWithoutRef<any> {
  node: Person
  currentWidth?: number
}

const HorizontalPersonCard = ({node, currentWidth, ...props}: Props) => {
  const imageUrl = node.su_person_photo?.field_media_image?.image_style_uri?.medium_square;
  const imageAlt = node.su_person_photo?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const imageHeight = node.su_person_photo?.field_media_image?.resourceIdObjMeta?.height;
  const imageWidth = node.su_person_photo?.field_media_image?.resourceIdObjMeta?.width;
  const placeholder = node.su_person_photo?.field_media_image?.uri.base64;

  return (
    <article
      className="su-flex su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border-x su-border-t su-border-b-5 su-border-solid su-border-black-10  su-border-b-digital-red su-shadow-md su-rs-pt-2 su-rs-px-2 su-rs-pb-3 su-mt-0" {...props}>
      {imageUrl &&
        <div className="su-flex su-justify-center su-mr-50">
          <div className="su-rounded-full su-w-[155px] su-h-[155px] su-overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              height={imageHeight}
              width={imageWidth}
              placeholder={placeholder ? 'blur' : 'empty'}
              blurDataURL={placeholder}
            />
          </div>
        </div>
      }
      <div>
        <Link href={node.path.alias}
              className="su-underline hocus:su-no-underline active:su-no-underline su-text-black hocus:su-text-brick-dark active:su-text-digital-red">
          <h2 className="su-type-2 su-rs-mb-neg2">{node.title}</h2>
        </Link>
        <Conditional showWhen={node.su_person_full_title}>
          <div className="su-type-0 su-rs-mb-neg2">{node.su_person_full_title}</div>
        </Conditional>
        <Conditional showWhen={node.su_person_email}>
          <Link href={`mailto:${node.su_person_email}`}
                className=" su-transition-colors hover:su-text-brick-dark hover:su-bg-black-10 focus:su-bg-none focus:su-text-cardinal-red active:su-text-cardinal-red su-no-underline su-text-digital-blue">
            <EnvelopeIcon width={20} className="su-inline-block su-mr-6"/>
            {node.su_person_email}
          </Link>
        </Conditional>

        <LibCal libcalId={node.sul_person__libcal_id}/>
      </div>
    </article>
  )
}
export default HorizontalPersonCard;