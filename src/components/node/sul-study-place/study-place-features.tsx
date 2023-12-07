import {PropsWithoutRef} from "react";
import Link from "@/components/patterns/elements/drupal-link";
import Image from "next/image";
import {MapPinIcon} from "@heroicons/react/24/outline";
import StudyPlaceHours from "./study-place-today-hours";
import Conditional from "@/components/utils/conditional";
import {CalendarDaysIcon, ChevronRightIcon} from "@heroicons/react/20/solid";

interface ModalProps extends PropsWithoutRef<any> {
  branchHours?: string
  branchTitle: string
  branchUrl: string
  capacity?: string
  contactImageAlt: string
  contactImageUrl: string
  features?: { id: string, name: string }[]
  libCal?: string
  imagePlaceholder?: string
  type: string
  headingId?: string
}

const StudyPlaceFeatures = ({branchHours, branchTitle, branchUrl, capacity, contactImageAlt, contactImageUrl, features, libCal, type, imagePlaceholder, headingId}: ModalProps) => {

  return (
    <div
      className={"su-bg-white su-flex su-w-full su-leading-display su-shadow-md su-border-0 su-rounded su-flex-row"}>
      <div className="su-hidden md:su-block su-rs-px-3 su-rs-py-3 su-w-1/2">
        {contactImageUrl &&
          <div className={"su-overflow-hidden su-aspect-[4/3] su-relative "}>
            <Image
              className="su-object-cover su-object-center su-static"
              src={contactImageUrl}
              alt={contactImageAlt}
              fill={true}
              placeholder={imagePlaceholder ? 'blur' : 'empty'}
              blurDataURL={imagePlaceholder}
            />
          </div>
        }
      </div>

      <div className="card-body su-items-start su-rs-px-3 su-rs-pb-3 su-rs-pt-7 md:su-rs-pt-3 su-w-full">
        <div className="su-leading-display su-text-18 su-pt-0 su-font-normal ">
          <h2 id={headingId} className="su-type-3 su-rs-mb-1">{type}</h2>
          <div className="su-leading-tight">

            {branchHours &&
              <StudyPlaceHours hoursId={branchHours}/>
            }

            <div className="su-relative su-flex su-flex-row su-items-start su-type-1 su-rs-mb-2">
              <MapPinIcon width={19} className="su-mt-01em md:su-mt-0 su-mr-12 su-flex-shrink-0"/>
              <Link href={branchUrl}
                    className="su-transition-colors hover:su-text-brick-dark hover:su-bg-black-10 hover:su-no-underline focus:su-bg-none focus:su-text-cardinal-red active:su-text-cardinal-red">
                <div>{branchTitle}</div>
              </Link>
            </div>

            {(capacity || features) &&
              <ul className="su-ml-10 su-rs-mb-1">
                {capacity &&
                  <li className="su-type-1 su-leading-display">{capacity}</li>
                }
                {features && features.map(feature =>
                  <li key={`modal-feature-${feature.id}`} className="su-type-1 su-leading-display">
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