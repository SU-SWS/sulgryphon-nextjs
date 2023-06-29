import {StudyPlace} from "@/lib/drupal/drupal";
import Link from "next/link";
import Image from "next/image";
import {MapPinIcon} from "@heroicons/react/24/outline";
import Conditional from "@/components/utils/conditional";
import StudyPlaceHours from "./study-place-today-hours";
import {DrupalTaxonomyTerm} from "next-drupal";
import {CalendarDaysIcon, ChevronRightIcon} from "@heroicons/react/20/solid";

const SulStudyPlaceCard = ({node}: { node: StudyPlace }) => {

  // Filter out empty terms and deduplicate terms by their ID.
  const features: DrupalTaxonomyTerm[] = node.sul_study__features?.filter((term: DrupalTaxonomyTerm, index, self) =>
      term.name?.length > 0 && index === self.findIndex((t: DrupalTaxonomyTerm) => (
        t.id === term.id
      ))
  ) ?? [];

  const imageUrl = node.sul_study__branch.su_library__contact_img?.field_media_image?.image_style_uri?.breakpoint_md_2x
  const imageAlt = node.sul_study__branch.su_library__contact_img?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const placeholder = node.sul_study__branch.su_library__contact_img?.field_media_image?.uri.base64;

  return (
    <>
      <div className="su-@container su-flex su-w-full su-leading-display su-shadow-md su-border-0 su-rounded su-flex-col">
        {imageUrl &&
          <div className={"su-overflow-hidden su-aspect-[4/3] su-relative "}>
            <Image
              className="su-object-cover su-object-center su-static"
              src={imageUrl}
              alt={imageAlt}
              fill={true}
              placeholder={placeholder ? 'blur' : 'empty'}
              blurDataURL={placeholder}
            />
          </div>
        }

        <Conditional showWhen={node.sul_study__libcal_id}>
          <a
            href={`https://appointments.library.stanford.edu/spaces?lid=/${node.sul_study__libcal_id}`}
            className="su-bg-black-true su-text-white hocus:su-text-illuminating-dark su-w-full su-rs-p-neg1 su-no-underline hocus:su-underline"
          >
            <div className="su-flex su-justify-end su-items-center su-gap-xs">
              <div className="su-w-0 @md:su-w-[87px] su-h-[3px] su-bg-illuminating-dark"></div>
              <CalendarDaysIcon className="su-inline-block su-flex-shrink-0 su-w-[24px]"/>
              <div className="su-relative su-pr-30 su-font-bold su-no-underline">
                Reserve Space <span className="su-sr-only">at {node.sul_study__branch.title}</span>
                <ChevronRightIcon className="su-inline su-absolute su-top-0 su-right-0 su-h-full"/>
              </div>
            </div>
          </a>
        </Conditional>

        <div className={"card-body su-items-start su-rs-px-2 su-rs-py-3 "}>
          <div className="su-leading-display su-text-18 su-pt-0 su-font-normal ">
            <h2 className="su-type-3 su-rs-mb-1">{node.sul_study__type.name}</h2>
            <div className="su-leading-tight">

              {node.sul_study__branch?.su_library__hours &&
                <StudyPlaceHours hoursId={node.sul_study__branch.su_library__hours}/>
              }

              <div className="su-relative su-flex su-flex-row su-items-start su-type-1 su-rs-mb-2">
                <MapPinIcon width={19} className="su-mt-01em md:su-mt-0 su-mr-12 su-flex-shrink-0"/>
                <Link href={node.sul_study__branch?.path.alias}
                      className="su-transition-colors hover:su-text-brick-dark hover:su-bg-black-10 hover:su-no-underline focus:su-bg-none focus:su-text-cardinal-red active:su-text-cardinal-red">
                  <div>{node.sul_study__branch.title}</div>
                </Link>
              </div>

              {(node.sul_study__capacity || features) &&
                <ul className="su-ml-10 su-rs-mb-1">
                  {node.sul_study__capacity &&
                    <li className="su-type-1 su-leading-display">{node.sul_study__capacity.name}</li>
                  }

                  {features && features.slice(0, 4).map(feature =>
                    <li key={`feature-${node.id}-${feature.id}`} data-foo={`feature-${node.id}-${feature.id}`}
                        className="su-type-1 su-leading-display">
                      {feature.name}
                    </li>
                  )}
                </ul>
              }

              {(features && features.length > 4) &&
                <Link
                  href={`/study-place/features/${node.id}`}
                  className="su-type-1 su-transition-colors hover:su-text-brick-dark hover:su-bg-black-10 hover:su-no-underline focus:su-bg-none focus:su-text-cardinal-red active:su-text-cardinal-red"
                  aria-haspopup="dialog"
                >
                  Show all&nbsp;<span className="su-sr-only">{node.sul_study__branch.title}&nbsp;</span>features
                  <ChevronRightIcon height={30} className="su-inline su-top-0 su-right-0 su-h-full"/>
                </Link>
              }

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SulStudyPlaceCard;