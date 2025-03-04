import Link from "@/components/patterns/elements/drupal-link"
import Image from "next/image"
import {MapPinIcon, BuildingLibraryIcon} from "@heroicons/react/24/outline"
import StudyPlaceHours from "./study-place-today-hours"
import {CalendarDaysIcon, ChevronRightIcon} from "@heroicons/react/20/solid"
import {buildUrl} from "@/lib/drupal/utils"
import {NodeSulStudyPlace, TermUnion} from "@/lib/gql/__generated__/drupal.d"

const SulStudyPlaceCard = ({node}: {node: NodeSulStudyPlace}) => {
  // Filter out empty terms and deduplicate terms by their ID.
  const features: TermUnion[] =
    node.sulStudyFeatures?.filter(
      (term, index, self) => term.name?.length > 0 && index === self.findIndex(t => t.id === term.id)
    ) || []

  const imageUrl = node.sulStudyImage?.mediaImage.url || node.sulStudyBranch.suLibraryContactImg?.mediaImage.url
  const imageAlt = node.sulStudyImage?.mediaImage.alt || node.sulStudyBranch.suLibraryContactImg?.mediaImage.alt || ""
  return (
    <>
      <div className="flex w-full flex-col rounded border-0 leading-display shadow-md @container">
        {imageUrl && (
          <div className={"relative aspect-[16/9] overflow-hidden"}>
            <Image
              className="static object-cover object-center"
              src={buildUrl(imageUrl).toString()}
              alt={imageAlt}
              fill
              sizes="(max-width: 1700px) 100vw, 1500px"
            />
          </div>
        )}

        {node.sulStudyLibcalId && (
          <a
            href={`https://appointments.library.stanford.edu/space/${node.sulStudyLibcalId}`}
            className="rs-p-neg1 w-full bg-black-true text-white no-underline hocus:text-illuminating-dark hocus:underline"
          >
            <div className="flex items-center justify-end gap-xs">
              <div className="h-[3px] w-0 bg-illuminating-dark @md:w-[87px]"></div>
              <CalendarDaysIcon title="Date" className="inline-block w-[24px] flex-shrink-0" />
              <div className="relative pr-30 font-bold no-underline">
                Reserve Space <span className="sr-only">at {node.sulStudyBranch.title}</span>
                <ChevronRightIcon className="absolute right-0 top-0 inline h-full" />
              </div>
            </div>
          </a>
        )}

        <div className={"card-body rs-py-2 rs-px-2 items-start"}>
          <div className="pt-0 text-18 font-normal leading-display">
            <h2 className="rs-mb-1 type-2">
              {[node.sulStudyRoomDonorName, node.sulStudyType.name].filter(item => !!item).join(" ")}
            </h2>

            <div className="leading-tight">
              {node.sulStudyBranch?.suLibraryHours && <StudyPlaceHours hoursId={node.sulStudyBranch.suLibraryHours} />}
              <div className="type-0 relative mb-20 flex flex-row items-start">
                <MapPinIcon title="Location" width={19} className="mr-12 mt-01em flex-shrink-0 md:mt-0" />
                <Link
                  href={node.sulStudyBranch.path || "#"}
                  className="transition-colors hover:bg-black-10 hover:text-brick-dark hover:no-underline focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
                >
                  <div>{node.sulStudyBranch.title}</div>
                </Link>
              </div>

              {node.sulStudyRoomNumber && (
                <div className="rs-mb-2 type-0 relative flex flex-row items-start">
                  <BuildingLibraryIcon title="Library" className="mr-12 h-24 w-24 flex-shrink-0" />
                  <div>Room-{node.sulStudyRoomNumber}</div>
                </div>
              )}

              {(node.sulStudyCapacity || features) && (
                <ul className="rs-mb-1 ml-10">
                  {node.sulStudyCapacity && <li className="type-0 leading-display">{node.sulStudyCapacity.name}</li>}

                  {features &&
                    features.slice(0, 4).map(feature => (
                      <li
                        key={`feature-${node.id}-${feature.id}`}
                        data-foo={`feature-${node.id}-${feature.id}`}
                        className="type-0 leading-display"
                      >
                        {feature.name}
                      </li>
                    ))}
                </ul>
              )}

              {features && features.length > 4 && (
                <Link
                  href={`/study-place/features/${node.id}`}
                  className="type-0 transition-colors hover:bg-black-10 hover:text-brick-dark hover:no-underline focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
                  aria-haspopup="dialog"
                >
                  Show all&nbsp;<span className="sr-only">{node.sulStudyBranch.title}&nbsp;</span>features
                  <ChevronRightIcon height={30} className="right-0 top-0 inline h-full" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SulStudyPlaceCard
