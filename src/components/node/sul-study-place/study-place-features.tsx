
import Link from "@/components/patterns/elements/drupal-link";
import Image from "next/image";
import {BuildingLibraryIcon, MapPinIcon} from "@heroicons/react/24/outline";
import StudyPlaceHours from "./study-place-today-hours";
import {buildUrl} from "@/lib/drupal/utils";
import {Maybe} from "@/lib/gql/__generated__/drupal.d";

interface ModalProps {
  branchHours?: Maybe<string>
  branchTitle: string
  branchUrl: string
  capacity?: string
  contactImageAlt?: string
  contactImageUrl?: string
  features?: { id: string, name: string }[]
  imagePlaceholder?: string
  type: string
  headingId?: string
  roomNumber?: Maybe<string>
  roomDonorName?: Maybe<string>
  roomImageUrl?: string
  roomImageAlt?: Maybe<string>
}

const StudyPlaceFeatures = ({branchHours, branchTitle, branchUrl, capacity, contactImageAlt, contactImageUrl, features, type, imagePlaceholder, headingId, roomNumber, roomDonorName, roomImageUrl, roomImageAlt}: ModalProps) => {
  const imageUrl = roomImageUrl || contactImageUrl;
  const imageAlt = roomImageAlt || contactImageAlt

  return (
    <div
      className={"bg-white flex w-full leading-display shadow-md border-0 rounded flex-row"}>
      <div className="hidden md:block rs-px-3 rs-py-3 w-1/2">
        {(imageUrl) &&
          <div className={"overflow-hidden aspect-[16/9] relative "}>
            <Image
              className="object-cover object-center static"
              src={buildUrl(imageUrl).toString()}
              alt={imageAlt || ''}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px"
              placeholder={imagePlaceholder ? 'blur' : 'empty'}
              blurDataURL={imagePlaceholder}
            />
          </div>
        }
      </div>

      <div className="card-body items-start rs-px-3 rs-pb-3 rs-pt-7 md:rs-pt-3 w-full">
        <div className="leading-display text-18 pt-0 font-normal ">
          <h2 id={headingId} className="type-3 rs-mb-1">{node.sulStudyRoomDonorName ? `${node.sulStudyRoomDonorName} ${node.sulStudyType.name}` : node.sulStudyType.name}</h2>
          <div className="leading-tight">

            {branchHours &&
              <StudyPlaceHours hoursId={branchHours}/>
            }

            <div
              className={`relative flex flex-row items-start type-1 ${roomNumber ? "mb-20" : "rs-mb-2"}`}>
              <MapPinIcon width={19} className="mt-01em md:mt-0 mr-12 flex-shrink-0"/>
              <Link href={branchUrl}
                    className="transition-colors hover:text-brick-dark hover:bg-black-10 hover:no-underline focus:bg-none focus:text-cardinal-red active:text-cardinal-red">
                <div>{branchTitle}</div>
              </Link>
            </div>

            {roomNumber &&
              <div className="relative flex flex-row items-start type-1 rs-mb-2">
                <BuildingLibraryIcon className="w-24 h-24 mr-12 flex-shrink-0 "/>

                <div>Room-{roomNumber}</div>
              </div>
            }

            {(capacity || features) &&
              <ul className="ml-10 rs-mb-1">
                {capacity &&
                  <li className="type-1 leading-display">{capacity}</li>
                }
                {features && features.map(feature =>
                  <li key={`modal-feature-${feature.id}`} className="type-1 leading-display">
                    {feature.name}
                  </li>
                )}
              </ul>
            }

          </div>
        </div>
      </div>
    </div>
  )
}
export default StudyPlaceFeatures;
