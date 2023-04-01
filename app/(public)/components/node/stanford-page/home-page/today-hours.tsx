"use client";

import Card from "@/components/patterns/card";
import {ClockIcon} from "@heroicons/react/24/outline";
import Image from "next/image";
import {useId, useState} from "react";
import Select from "react-select";
import {ErrorBoundary} from "react-error-boundary";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import useTodayLibraryHours from "@/lib/hooks/useTodayLibraryHours";
import {Library} from "@/lib/drupal/drupal";

const TodayHours = ({libraries, ...props}) => {
  return (
    <ErrorBoundary fallback={<></>}>
      <CachedClientFetch>
        <LibrariesTodayHours libraries={libraries} {...props}/>
      </CachedClientFetch>
    </ErrorBoundary>
  )
}

interface option {
  value: string
  label: string
}

const LibrariesTodayHours = ({libraries, ...props}: { libraries: Library[] }) => {
  if (libraries.length === 0) return null;

  const formId = useId();
  const [selectedLibrary, setSelectedLibrary] = useState(libraries.at(0)?.id);
  const library = libraries.find((item, index) => selectedLibrary ? item.id === selectedLibrary : index === 0);
  const libraryHours = useTodayLibraryHours(library?.su_library__hours);

  let hoursDisplay: string | boolean = '';
  let isOpen: boolean = false;

  let libraryOptions: option[] = [];
  Object.keys(libraries).map(i => {
    libraryOptions.push({value: libraries[i].id, label: libraries[i].title})
  })

  if (libraryHours) {
    const {closedAllDay, isOpen, openingTime, closingTime, afterClose} = libraryHours
    hoursDisplay = !closedAllDay && (isOpen ? 'Closes at ' + closingTime : (afterClose ? 'Closed at ' + closingTime : 'Opens at ' + openingTime));
  }

  const imageUrl = library?.su_library__contact_img?.field_media_image?.image_style_uri?.breakpoint_md_2x || library?.su_library__banner?.field_media_image?.image_style_uri?.breakpoint_md_2x
  return (
    <div {...props}>

      <Card
        className="su-border-0 su-rounded"
        image={imageUrl && <Image
          className="su-object-cover su-object-center"
          src={imageUrl}
          alt=""
          fill={true}
        />}
        footer={
          <div className="su-relative su-pb-100 md:su-rs-pb-6">
            <div className="su-absolute su-w-full">
              <h3 id={formId} className="su-text-black su-leading-tight su-font-bold su-type-2 su-mb-03em">
                Today&apos;s Hours
              </h3>
              <Select
                className="su-text-black-true su-mb-10"
                instanceId={`${formId}-hours`}
                aria-labelledby={formId}
                options={libraryOptions}
                defaultValue={libraryOptions.find(option => option.value === selectedLibrary)}
                onChange={(item: option) => setSelectedLibrary(item.value)}
              />

              <div className="su-text-black  su-flex su-gap-sm su-justify-between" aria-live="polite">
                <div><ClockIcon className="su-inline" width={15}/> {isOpen ? 'Open' : 'Closed'}</div>
                <div>
                  {hoursDisplay}
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  )
}
export default TodayHours