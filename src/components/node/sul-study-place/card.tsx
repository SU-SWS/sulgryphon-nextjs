
import Link from "@/components/patterns/elements/drupal-link";
import Image from "next/image";
import {MapPinIcon, BuildingLibraryIcon} from "@heroicons/react/24/outline";
import StudyPlaceHours from "./study-place-today-hours";
import {CalendarDaysIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {buildUrl} from "@/lib/drupal/utils";
import {NodeSulStudyPlace, TermUnion} from "@/lib/gql/__generated__/drupal.d";

const SulStudyPlaceCard = ({node}: { node: NodeSulStudyPlace }) => {

  // Filter out empty terms and deduplicate terms by their ID.
  const features: TermUnion[] = node.sulStudyFeatures?.filter((term, index, self) =>
      term.name?.length > 0 && index === self.findIndex((t) => (
        t.id === term.id
      ))
  ) || [];

  const imageUrl = node.sulStudyImage?.mediaImage.url || node.sulStudyBranch.suLibraryContactImg?.mediaImage.url
  const imageAlt = node.sulStudyImage?.mediaImage.alt || node.sulStudyBranch.suLibraryContactImg?.mediaImage.alt|| '';
  return (
    <>
      <div className="@container flex w-full leading-display shadow-md border-0 rounded flex-col">
        {(imageUrl) &&
          <div className={"overflow-hidden aspect-[16/9] relative "}>
            <Image
              className="object-cover object-center static"
              src={buildUrl(imageUrl).toString()}
              alt={imageAlt}
              fill
              sizes="(max-width: 1700px) 100vw, 1500px"
            />
          </div>
        }

        {(node.sulStudyLibcalId) &&
          <a
            href={`https://appointments.library.stanford.edu/space/${node.sulStudyLibcalId}`}
            className="bg-black-true text-white hocus:text-illuminating-dark w-full rs-p-neg1 no-underline hocus:underline"
          >
            <div className="flex justify-end items-center gap-xs">
              <div className="w-0 @md:w-[87px] h-[3px] bg-illuminating-dark"></div>
              <CalendarDaysIcon title="Calendar" className="inline-block flex-shrink-0 w-[24px]"/>
              <div className="relative pr-30 font-bold no-underline">
                Reserve Space <span className="sr-only">at {node.sulStudyBranch.title}</span>
                <ChevronRightIcon className="inline absolute top-0 right-0 h-full"/>
              </div>
            </div>
          </a>
        }

        <div className={"card-body items-start rs-px-2 rs-py-3 "}>
          <div className="leading-display text-18 pt-0 font-normal">
            <h2 className="type-3 rs-mb-1">{[node.sulStudyRoomDonorName, node.sulStudyType.name].filter(item => !!item).join(" ")}</h2>

            <div className="leading-tight">
              {node.sulStudyBranch?.suLibraryHours &&
                <StudyPlaceHours hoursId={node.sulStudyBranch.suLibraryHours}/>
              }
              <div className="relative flex flex-row items-start type-1 mb-20">
                <MapPinIcon title="Map" width={19} className="mt-01em md:mt-0 mr-12 flex-shrink-0"/>
                <Link href={node.sulStudyBranch.path}
                      className="transition-colors hover:text-brick-dark hover:bg-black-10 hover:no-underline focus:bg-none focus:text-cardinal-red active:text-cardinal-red">
                  <div>{node.sulStudyBranch.title}</div>
                </Link>
              </div>

              {node.sulStudyRoomNumber &&
                <div className="relative flex flex-row items-start type-1 rs-mb-2">
                  <BuildingLibraryIcon title="Library Building" className="w-24 h-24 mr-12 flex-shrink-0 "/>
                  <div>Room-{node.sulStudyRoomNumber}</div>
                </div>
              }

              {(node.sulStudyCapacity || features) &&
                <ul className="ml-10 rs-mb-1">
                  {node.sulStudyCapacity &&
                    <li className="type-1 leading-display">{node.sulStudyCapacity.name}</li>
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
                  Show all&nbsp;<span className="sr-only">{node.sulStudyBranch.title}&nbsp;</span>features
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
