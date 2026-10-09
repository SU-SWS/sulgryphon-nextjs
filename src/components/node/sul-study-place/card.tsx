import Link from "@/components/patterns/elements/drupal-link"
import Image from "next/image"
import {MapPinIcon, BuildingLibraryIcon} from "@heroicons/react/24/outline"
import StudyPlaceHours from "./study-place-today-hours"
import {CalendarDaysIcon, ChevronRightIcon} from "@heroicons/react/20/solid"
import {buildUrl} from "@/lib/drupal/utils"
import {NodeSulStudyPlace, TermUnion} from "@/lib/gql/__generated__/graphql"

const SulStudyPlaceCard = ({node}: {node: NodeSulStudyPlace}) => {
  // Filter out empty terms and deduplicate terms by their ID.
  const features: TermUnion[] =
    node.sulStudyFeatures?.filter(
      (term, index, self) => term.name?.length > 0 && index === self.findIndex(t => t.uuid === term.uuid)
    ) || []

  const imageUrl = node.sulStudyImage?.mediaImage.url || node.sulStudyBranch.suLibraryContactImg?.mediaImage.url
  const imageAlt = node.sulStudyImage?.mediaImage.alt || node.sulStudyBranch.suLibraryContactImg?.mediaImage.alt || ""
  return (
    <>
      <div className="@container flex w-full flex-col rounded-[0.3rem] border-0 leading-display shadow-md">
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
            className="w-full bg-black-true rs-p-neg1 text-white no-underline hocus:text-illuminating-dark hocus:underline"
          >
            <div className="flex items-center justify-end gap-xs">
              <div className="h-[3px] w-0 bg-illuminating-dark @md:w-[87px]"></div>
              <CalendarDaysIcon title="Date" className="inline-block w-[24px] shrink-0" />
              <div className="relative pr-30 font-bold no-underline">
                Reserve Space <span className="sr-only">at {node.sulStudyBranch.title}</span>
                <ChevronRightIcon className="absolute top-0 right-0 inline h-full" />
              </div>
            </div>
          </a>
        )}

        <div className={"card-body items-start rs-py-2 rs-px-2"}>
          <div className="pt-0 text-18 leading-display font-normal">
            <h2 className="rs-mb-1 type-2">
              {[node.sulStudyRoomDonorName, node.sulStudyType.name].filter(item => !!item).join(" ")}
            </h2>

            <div className="leading-tight">
              {node.sulStudyBranch?.suLibraryHours && <StudyPlaceHours hoursId={node.sulStudyBranch.suLibraryHours} />}
              <div className="relative mb-20 flex flex-row items-start type-0">
                <MapPinIcon title="Location" width={19} className="mt-01em mr-12 shrink-0 md:mt-0" />
                <Link
                  href={node.sulStudyBranch.path || "#"}
                  className="transition-colors hover:bg-black-10 hover:text-brick-dark hover:no-underline focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
                >
                  <div>{node.sulStudyBranch.title}</div>
                </Link>
              </div>

              {node.sulStudyRoomNumber && (
                <div className="relative rs-mb-2 flex flex-row items-start type-0">
                  <BuildingLibraryIcon title="Library" className="mr-12 h-24 w-24 shrink-0" />
                  <div>Room-{node.sulStudyRoomNumber}</div>
                </div>
              )}

              {(node.sulStudyCapacity || features) && (
                <ul className="rs-mb-1 ml-10">
                  {node.sulStudyCapacity && <li className="type-0 leading-display">{node.sulStudyCapacity.name}</li>}

                  {features &&
                    features.slice(0, 4).map(feature => (
                      <li
                        key={`feature-${node.uuid}-${feature.uuid}`}
                        data-foo={`feature-${node.uuid}-${feature.uuid}`}
                        className="type-0 leading-display"
                      >
                        {feature.name}
                      </li>
                    ))}
                </ul>
              )}

              {features && features.length > 4 && (
                <Link
                  href={`/study-place/features/${node.uuid}`}
                  className="type-0 transition-colors hover:bg-black-10 hover:text-brick-dark hover:no-underline focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
                  aria-haspopup="dialog"
                >
                  Show all&nbsp;<span className="sr-only">{node.sulStudyBranch.title}&nbsp;</span>features
                  <ChevronRightIcon height={30} className="top-0 right-0 inline h-full" />
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
