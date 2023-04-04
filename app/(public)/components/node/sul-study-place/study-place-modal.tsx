"use client";

import {PropsWithoutRef, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import Modal from "../../patterns/modal";
import {ErrorBoundary} from "react-error-boundary";
import {ChevronRightIcon} from "@heroicons/react/20/solid";
import {MapPinIcon } from "@heroicons/react/24/outline";
import LibCal from "./libcal";
import StudyPlaceHours from "./study-place-today-hours";
import Conditional from "@/components/utils/conditional";

 interface ModalProps extends PropsWithoutRef<any> {
  branchHours?: string
  branchTitle: string
  branchUrl: string
  capacity?: string
  contactImageAlt: string
  contactImageUrl: string
  features?: {id: string, name: string}[]
  libCal?: string
  type: string
 }

const StudyPlaceModal = ({branchHours, branchTitle, branchUrl, capacity, contactImageAlt, contactImageUrl, features, libCal, type}: ModalProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ErrorBoundary
      fallback={<></>}
      onError={e => console.error(e.message)}
    >
      <button className="su-relative su-pr-30 su-type-1 su-text-digital-blue hocus:su-text-brick su-no-underline su-rs-mt-neg1 su-pt-10 su-font-semibold" onClick={() => setModalOpen(true)}>
        Show all features
        <ChevronRightIcon className="su-inline su-absolute su-top-0 su-right-0 su-h-full su-pt-10"/>
      </button>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        ariaLabel="Features Modal"
        >
        <div className={"su-bg-white su-flex su-w-full su-leading-display su-shadow-md su-border-0 su-rounded su-flex-row"}>
          <div className="su-hidden md:su-block su-rs-px-3 su-rs-py-3 su-w-1/2">
            {contactImageUrl &&
              <div className={"su-overflow-hidden su-aspect-[4/3] su-relative "}>
                <Image
                  className="su-object-cover su-object-center su-static"
                  src={contactImageUrl}
                  alt={contactImageAlt}
                  fill={true}
                />
              </div>
            }

            <Conditional showWhen={libCal}>
              <LibCal libcalId={libCal}/>
            </Conditional>
          </div>

          <div className="card-body su-items-start su-rs-px-3 su-rs-pb-3 su-rs-pt-7 md:su-rs-pt-3 su-w-full">
            <div className="su-leading-display su-text-18 su-pt-0 su-font-normal ">
              <h2 className="su-type-3 su-rs-mb-1">{type}</h2>
              <div className="su-leading-tight">

                {branchHours &&
                  <StudyPlaceHours hoursId={branchHours}/>
                }

                <div className="su-relative su-flex su-flex-row su-items-start su-type-1 su-rs-mb-2">
                  <MapPinIcon width={19} className="su-mt-01em md:su-mt-0 su-mr-12 su-flex-shrink-0"/>
                  <Link href={branchUrl} className="su-transition-colors hover:su-text-brick-dark hover:su-bg-black-10 hover:su-no-underline focus:su-bg-none focus:su-text-cardinal-red active:su-text-cardinal-red">
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
      </Modal>
    </ErrorBoundary>
  )
}
export default StudyPlaceModal;