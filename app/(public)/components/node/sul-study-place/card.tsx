import {StudyPlace} from "@/lib/drupal/drupal";
import Link from "next/link";
import Image from "next/image";
import {MapPinIcon } from "@heroicons/react/24/outline";
import Conditional from "@/components/utils/conditional";
import LibCal from "./libcal";
import StudyPlaceHours from "./study-place-today-hours";
import StudyPlaceModal from "./study-place-modal";

const SulStudyPlaceCard = ({node}: { node: StudyPlace }) => {

  const contactImageUrl = node.sul_study__branch.su_library__contact_img?.field_media_image?.image_style_uri?.breakpoint_md_2x
  const features = node.sul_study__features?.filter(feature => feature.name?.length > 0) ?? [];

  return (
    <>
      <div className={"su-flex su-w-full su-leading-display su-shadow-md su-border-0 su-rounded su-flex-col"}>
        {contactImageUrl &&
          <div className={"su-overflow-hidden su-aspect-[4/3] su-relative "}>
            <Image
              className="su-object-cover su-object-center su-static"
              src={contactImageUrl}
              alt={node.sul_study__branch.su_library__contact_img?.field_media_image?.resourceIdObjMeta?.alt ?? ''}
              fill={true}
            />
          </div>
        }

        <Conditional showWhen={node.sul_study__libcal_id}>
          <LibCal libcalId={node.sul_study__libcal_id}/>
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
                <Link href={node.sul_study__branch?.path.alias} className="su-transition-colors hover:su-text-brick-dark hover:su-bg-black-10 hover:su-no-underline focus:su-bg-none focus:su-text-cardinal-red active:su-text-cardinal-red">
                  <div>{node.title}</div>
                </Link>	
              </div>

              {(node.sul_study__capacity || features) &&
                <ul className="su-ml-10 su-rs-mb-1">
                  {node.sul_study__capacity &&
                    <li className="su-type-1 su-leading-display">{node.sul_study__capacity.name}</li>
                  }
                  {features && features.slice(0, 4).map(feature =>
                    <li key={`feature-${feature.id}`} className="su-type-1 su-leading-display">
                      {feature.name}
                    </li>
                  )}
                </ul>
              }

              {(features && features.length > 4) &&
                <StudyPlaceModal
                  branchHours={node.sul_study__branch?.su_library__hours}
                  branchTitle={node.sul_study__branch.title}
                  branchUrl={node.sul_study__branch.path.alias}
                  capacity={node.sul_study__capacity?.name}
                  contactImageAlt={node.sul_study__branch.su_library__contact_img?.field_media_image?.resourceIdObjMeta?.alt ?? ''}
                  contactImageUrl={node.sul_study__branch.su_library__contact_img?.field_media_image?.image_style_uri?.breakpoint_md_2x}
                  features={features.map(feature => ({id: feature.id, name: feature.name}))}
                  libCal={node.sul_study__libcal_id}
                  type={node.sul_study__type.name}
                />
              }

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SulStudyPlaceCard;