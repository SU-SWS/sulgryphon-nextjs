"use client";

import {useState} from "react";
import {StudyPlace} from "@/lib/drupal/drupal";
import Link from "next/link";
import Image from "next/image";
import Modal from "../../patterns/modal";
import {ErrorBoundary} from "react-error-boundary";
import {ChevronRightIcon} from "@heroicons/react/20/solid";
import {MapPinIcon } from "@heroicons/react/24/outline";
import {useResizeDetector} from "react-resize-detector";
import LibCal from "./libcal";
import StudyPlaceHours from "./study-place-today-hours";
import Conditional from "@/components/utils/conditional";

const StudyPlaceModal = ({node}: { node: StudyPlace }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const {width, ref} = useResizeDetector();

  const contactImageUrl = node.sul_study__branch.su_library__contact_img?.field_media_image?.image_style_uri?.breakpoint_md_2x

  let contactImage

  if (contactImageUrl) {
    contactImage = <Image
      className="su-object-cover su-object-center su-static"
      src={contactImageUrl}
      alt={node.sul_study__branch.su_library__contact_img?.field_media_image?.resourceIdObjMeta?.alt ?? ''}
      fill={true}
    />
  }

  const largeWidth = (width && width > 550);

  const features = node.sul_study__features?.filter(feature => feature.name?.length > 0) ?? [];
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
        <div ref={ref} className={"su-bg-white su-flex su-w-full su-leading-display su-shadow-md su-border-0 su-rounded su-flex-row"}>
          {largeWidth &&
            <div className="su-hidden md:su-block su-rs-px-3 su-rs-py-3 su-w-1/2">
              <div className={"su-overflow-hidden su-aspect-[4/3] su-relative "}>
                {contactImage}
              </div>

              <Conditional showWhen={node.sul_study__libcal_id}>
                <LibCal libcalId={node.sul_study__libcal_id}/>
              </Conditional>
            </div>
          }

          <div className={"card-body su-items-start su-rs-px-3 su-rs-pb-3 su-rs-pt-7 md:su-rs-pt-3 su-w-full " + ((width && width > 600) && " su-w-1/2")}>
            <div className="su-leading-display su-text-18 su-pt-0 su-font-normal ">
              <h2 className="su-type-3 su-rs-mb-1">{node.sul_study__type.name}</h2>
              <div className="su-leading-tight">

                <Conditional showWhen={node.sul_study__branch?.su_library__hours}>
                  <StudyPlaceHours node={node}/>
                </Conditional>

                <div className="su-relative su-flex su-flex-row su-items-start su-type-1 su-rs-mb-2">
                  <MapPinIcon width={19} className="su-mt-01em md:su-mt-0 su-mr-12 su-flex-shrink-0"/>
                  <Link href={node.sul_study__branch?.path.alias} className="su-transition-colors hover:su-text-brick-dark hover:su-bg-black-10 hover:su-no-underline focus:su-bg-none focus:su-text-cardinal-red active:su-text-cardinal-red">
                    <div>{node.title}</div>
                  </Link>	
                </div>

                {(node.sul_study__capacity || features) &&
                  <ul className="su-ml-10 su-rs-mb-1">
                    {node.sul_study__capacity &&
                      <li className="su-type-1 su-leading-display">{node.sul_study__capacity.name}</li>
                    }
                    {features && features.slice(0,4).map((feature, index) =>
                      <li key={`feature-${index}`} className="su-type-1 su-leading-display">
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