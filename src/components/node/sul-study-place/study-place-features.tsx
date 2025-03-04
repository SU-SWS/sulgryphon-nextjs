import Link from "@/components/patterns/elements/drupal-link"
import Image from "next/image"
import {BuildingLibraryIcon, MapPinIcon} from "@heroicons/react/24/outline"
import StudyPlaceHours from "./study-place-today-hours"
import {buildUrl} from "@/lib/drupal/utils"
import {Maybe, NodeSulStudyPlace} from "@/lib/gql/__generated__/drupal.d"

interface ModalProps {
  branchHours?: Maybe<string>
  branchTitle: string
  branchUrl?: NodeSulStudyPlace["sulStudyBranch"]["path"]
  capacity?: string
  contactImageAlt?: string
  contactImageUrl?: string
  features?: {id: string; name: string}[]
  imagePlaceholder?: string
  type: string
  headingId?: string
  roomNumber?: Maybe<string>
  roomDonorName?: Maybe<string>
  roomImageUrl?: string
  roomImageAlt?: Maybe<string>
}

const StudyPlaceFeatures = ({
  branchHours,
  branchTitle,
  branchUrl,
  capacity,
  contactImageAlt,
  contactImageUrl,
  features,
  type,
  imagePlaceholder,
  headingId,
  roomNumber,
  roomDonorName,
  roomImageUrl,
  roomImageAlt,
}: ModalProps) => {
  const imageUrl = roomImageUrl || contactImageUrl
  const imageAlt = roomImageAlt || contactImageAlt

  return (
    <div className={"flex w-full flex-row rounded border-0 bg-white leading-display shadow-md"}>
      <div className="rs-py-3 rs-px-3 hidden w-1/2 md:block">
        {imageUrl && (
          <div className={"relative aspect-[16/9] overflow-hidden"}>
            <Image
              className="static object-cover object-center"
              src={buildUrl(imageUrl).toString()}
              alt={imageAlt || ""}
              fill
              sizes="(max-width: 1700px) 100vw, 1500px"
              placeholder={imagePlaceholder ? "blur" : "empty"}
              blurDataURL={imagePlaceholder}
            />
          </div>
        )}
      </div>

      <div className="card-body rs-pb-3 rs-px-3 rs-pt-7 w-full items-start md:rs-pt-3">
        <div className="pt-0 text-18 font-normal leading-display">
          <h2 id={headingId} className="rs-mb-1 type-2">
            {[roomDonorName, type].filter(item => !!item).join(" ")}
          </h2>
          <div className="leading-tight">
            {branchHours && <StudyPlaceHours hoursId={branchHours} />}

            <div className={`type-1 relative flex flex-row items-start ${roomNumber ? "mb-20" : "rs-mb-2"}`}>
              <MapPinIcon title="Location" width={19} className="mr-12 mt-01em flex-shrink-0 md:mt-0" />
              <Link
                href={branchUrl || "#"}
                className="transition-colors hover:bg-black-10 hover:text-brick-dark hover:no-underline focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
              >
                <div>{branchTitle}</div>
              </Link>
            </div>

            {roomNumber && (
              <div className="rs-mb-2 type-1 relative flex flex-row items-start">
                <BuildingLibraryIcon title="Library" className="mr-12 h-24 w-24 flex-shrink-0" />

                <div>Room-{roomNumber}</div>
              </div>
            )}

            {(capacity || features) && (
              <ul className="rs-mb-1 ml-10">
                {capacity && <li className="type-1 leading-display">{capacity}</li>}
                {features &&
                  features.map(feature => (
                    <li key={`modal-feature-${feature.id}`} className="type-1 leading-display">
                      {feature.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default StudyPlaceFeatures
