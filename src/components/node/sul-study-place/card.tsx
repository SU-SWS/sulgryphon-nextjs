import {StudyPlace} from "@/lib/drupal/drupal";
import Link from "@/components/patterns/elements/drupal-link";
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
      <div className="@container flex w-full leading-display shadow-md border-0 rounded flex-col">
        {imageUrl &&
          <div className={"overflow-hidden aspect-[4/3] relative "}>
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

        <Conditional showWhen={node.sul_study__libcal_id}>
          <a
            href={`https://appointments.library.stanford.edu/space/${node.sul_study__libcal_id}`}
            className="bg-black-true text-white hocus:text-illuminating-dark w-full rs-p-neg1 no-underline hocus:underline"
          >
            <div className="flex justify-end items-center gap-xs">
              <div className="w-0 @md:w-[87px] h-[3px] bg-illuminating-dark"></div>
              <CalendarDaysIcon className="inline-block flex-shrink-0 w-[24px]"/>
              <div className="relative pr-30 font-bold no-underline">
                Reserve Space <span className="sr-only">at {node.sul_study__branch.title}</span>
                <ChevronRightIcon className="inline absolute top-0 right-0 h-full"/>
              </div>
            </div>
          </a>
        </Conditional>

        <div className={"card-body items-start rs-px-2 rs-py-3 "}>
          <div className="leading-display text-18 pt-0 font-normal ">
            <h2 className="type-3 rs-mb-1">{node.sul_study__type.name}</h2>
            <div className="leading-tight">

              {node.sul_study__branch?.su_library__hours &&
                <StudyPlaceHours hoursId={node.sul_study__branch.su_library__hours}/>
              }

              <div className="relative flex flex-row items-start type-1 rs-mb-2">
                <MapPinIcon width={19} className="mt-01em md:mt-0 mr-12 flex-shrink-0"/>
                <Link href={node.sul_study__branch?.path.alias}
                      className="transition-colors hover:text-brick-dark hover:bg-black-10 hover:no-underline focus:bg-none focus:text-cardinal-red active:text-cardinal-red">
                  <div>{node.sul_study__branch.title}</div>
                </Link>
              </div>

              {(node.sul_study__capacity || features) &&
                <ul className="ml-10 rs-mb-1">
                  {node.sul_study__capacity &&
                    <li className="type-1 leading-display">{node.sul_study__capacity.name}</li>
                  }

                  {features && features.slice(0, 4).map(feature =>
                    <li key={`feature-${node.id}-${feature.id}`} data-foo={`feature-${node.id}-${feature.id}`}
                        className="type-1 leading-display">
                      {feature.name}
                    </li>
                  )}
                </ul>
              }

              {(features && features.length > 4) &&
                <Link
                  href={`/study-place/features/${node.id}`}
                  className="type-1 transition-colors hover:text-brick-dark hover:bg-black-10 hover:no-underline focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
                  aria-haspopup="dialog"
                >
                  Show all&nbsp;<span className="sr-only">{node.sul_study__branch.title}&nbsp;</span>features
                  <ChevronRightIcon height={30} className="inline top-0 right-0 h-full"/>
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