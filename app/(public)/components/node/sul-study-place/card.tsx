"use client";

import {StudyPlace} from "@/lib/drupal/drupal";
import Link from "next/link";
import Image from "next/image";
import {ClockIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import useLibraryHours from "@/lib/hooks/useLibraryHours";
import Conditional from "@/components/utils/conditional";
import {useResizeDetector} from "react-resize-detector";

const SulStudyPlaceCard = ({node}: { node: StudyPlace }) => {
  const {width, ref} = useResizeDetector();
  const hours = useLibraryHours()

const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
  };

  const currentDay = toISOStringWithTimezone(new Date()).substring(0, 10);
  const libraryHours = node.sul_study__branch?.su_library__hours ? hours[node.sul_study__branch?.su_library__hours] : [];
  const libraryPrimaryHours = libraryHours?.primary_hours;

  let todayHours;
  if (libraryPrimaryHours) {
    todayHours = libraryPrimaryHours.find(day => day.day === currentDay);
  }

  const date = new Date()
  let openTime, closeTime, isOpen = false, closedAllDay = todayHours?.closed;

  if (Object.keys(hours).length !== 0 && !todayHours?.closed) {
    openTime = new Date(todayHours?.opens_at);
    closeTime = new Date(todayHours?.closes_at);
    isOpen = date.getTime() > openTime.getTime() && date.getTime() < closeTime.getTime();
  }

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

  return (
    <>
      {console.log('node 3: ', node)}
      <div ref={ref} className={"su-flex su-w-full su-basefont-23 su-leading-display su-shadow-md su-border-0 su-rounded " + ((width && width < 768) && " su-flex-col")}>
        <div className={"su-overflow-hidden su-aspect-[16/9] su-relative " + ((width && width > 767) && " su-w-1/2")}>
          {contactImage}
        </div>

        <div className={"card-body su-items-start su-rs-px-2 su-rs-py-4 " + ((width && width > 767) && " su-w-1/2")}>
          <div className="su-leading-display su-text-18 su-pt-0 su-font-normal ">
            <Conditional showWhen={node.sul_study__type}>
              <h2 className="su-type-3 su-rs-mb-1">{node.sul_study__type.name}</h2>
            </Conditional>
            <div className="su-leading-tight md:su-rs-px-2">
              <Conditional showWhen={node.sul_study__branch?.su_library__hours}>
                <div className="su-relative su-flex su-flex-row su-items-start su-rs-mb-0 su-type-1">
                  <ClockIcon width={19} className="md:su-absolute md:su-left-[-38px] md:su-top-01em su-mr-12 su-flex-shrink-0"/>
                  <div aria-live="polite">
                    {!closedAllDay && (isOpen ? 'Closes at ' + closeTime?.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    }) : 'Opens at ' + openTime?.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    }))}
                  </div>
                </div>
              </Conditional>
              <Conditional showWhen={node.title}>
                <div className="su-relative su-flex su-flex-row su-items-start su-type-1 su-rs-mb-1">
                  <MapPinIcon width={19} className="md:su-absolute md:su-left-[-38px] md:su-top-01em su-mt-01em md:su-mt-0 su-mr-12 su-flex-shrink-0"/>
                  {node.sul_study__branch?.su_library__map_link ? (
                    <Link href={node.sul_study__branch?.su_library__map_link.uri} className="su-transition-colors hover:su-text-brick-dark hover:su-bg-black-10 hover:su-no-underline focus:su-bg-none focus:su-text-cardinal-red active:su-text-cardinal-red">
                      <div>{node.title}</div>
                    </Link>	
                  ) : (
                    <>
                      <div>{node.title}</div>
                    </>
                  )}
                </div>
              </Conditional>

              {(node.sul_study__features && node.sul_study__features.length > 0) &&
                <div className="su-rs-mb-1">
                  {node.sul_study__features.map((feature, index) =>
                    <ul key={`feature-${index}`} className="su-rs-mb-0">
                      <li>{feature.name}</li>
                    </ul>
                  )}
                </div>
              }

              {(node.sul_study__features && node.sul_study__features.length > 4) &&
                <Link href="#" className="su-transition-colors hover:su-text-brick-dark hover:su-bg-black-10 hover:su-no-underline focus:su-bg-none focus:su-text-cardinal-red active:su-text-cardinal-red">
                  <div>Show all features</div>
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