"use client";

import {StudyPlace} from "@/lib/drupal/drupal";
import Link from "next/link";
import Image from "next/image";
import {ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import useLibraryHours from "@/lib/hooks/useLibraryHours";
import Conditional from "@/components/utils/conditional";
import { DrupalActionLink } from "@/components/patterns/link";
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

  let libraryCloseTime = closeTime?.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZone: 'America/Los_Angeles'
  })

  let libraryOpenTime = openTime?.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZone: 'America/Los_Angeles'
  })

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
      <div ref={ref} className={"su-flex su-w-full su-leading-display su-shadow-md su-border-0 su-rounded " + ((width && width < 768) && " su-flex-col")}>
        <div className={"su-overflow-hidden su-aspect-[16/9] su-relative " + ((width && width > 767) && " su-w-1/2")}>
          {contactImage}
        </div>

        <div className={"card-body su-items-start su-rs-px-2 su-rs-py-3 " + ((width && width > 767) && " su-w-1/2")}>
          <div className="su-leading-display su-text-18 su-pt-0 su-font-normal ">
            <h2 className="su-type-3 su-rs-mb-1">{node.sul_study__type.name}</h2>
            <div className="su-leading-tight">

              <Conditional showWhen={node.sul_study__branch?.su_library__hours}>
                <div className="su-relative su-flex su-flex-row su-items-start su-rs-mb-neg2 su-type-1">
                  <ClockIcon width={19} className="su-mr-12 su-flex-shrink-0"/>
                  <div aria-live="polite">
                    {!closedAllDay && (isOpen ? 'Closes at ' + libraryCloseTime : 'Opens at ' + libraryOpenTime)}
                  </div>
                </div>
              </Conditional>

              <div className="su-relative su-flex su-flex-row su-items-start su-type-1 su-rs-mb-2">
                <MapPinIcon width={19} className="su-mt-01em md:su-mt-0 su-mr-12 su-flex-shrink-0"/>
                <Link href={node.sul_study__branch?.path.alias} className="su-transition-colors hover:su-text-brick-dark hover:su-bg-black-10 hover:su-no-underline focus:su-bg-none focus:su-text-cardinal-red active:su-text-cardinal-red">
                  <div>{node.title}</div>
                </Link>	
              </div>

              {(node.sul_study__features && node.sul_study__features.length > 0) &&
                <ul className="su-ml-10 su-rs-mb-2">
                  {node.sul_study__features.map((feature, index) =>
                    <li key={`feature-${index}`} className="su-type-1 su-leading-display">
                      {feature.name}
                    </li>
                  )}
                </ul>
              }

              {/* {(node.sul_study__features && node.sul_study__features.length > 4) && */}
              {node.sul_study__features &&
                <DrupalActionLink href="#">
                  Show all features
                </DrupalActionLink>
              }
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SulStudyPlaceCard;