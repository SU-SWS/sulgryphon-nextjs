"use client";

import Card from "@/components/patterns/card";
import {ClockIcon} from "@heroicons/react/24/outline";
import Image from "next/image";
import useLibraryHours, {DayHours, LibraryHoursType} from "@/lib/hooks/useLibraryHours";
import {useId, useState} from "react";
import Select from "react-select";

const TodayHours = ({libraries, ...props}) => {
  const formId = useId();
  const [selectedLibrary, setSelectedLibrary] = useState('');

  const hours = useLibraryHours() as LibraryHoursType;

  libraries = libraries.filter(library => Object.keys(hours).indexOf(library.su_library__hours) >= 0)

  if (libraries.length === 0 || Object.keys(hours).length === 0) {
    return null;
  }

  const library = libraries.find((item, index) => selectedLibrary ? item.id === selectedLibrary : index === 0);
  const selectedHours = hours[library.su_library__hours]


  if (!selectedHours) {
    return null;
  }

  const date = new Date()
  const libraryHours = selectedHours.primaryHours.find(day => day.day === date.toISOString().substring(0, 10)) as DayHours;

  let openTime, closeTime, isOpen = false, closedAllDay = libraryHours.closed;

  if (!libraryHours.closed && libraryHours.opens_at && libraryHours.closes_at) {
    openTime = new Date(libraryHours.opens_at);
    closeTime = new Date(libraryHours.closes_at);
    isOpen = date > openTime && date < closeTime;
  }

  const imageUrl = library.su_library__contact_img?.field_media_image?.image_style_uri?.breakpoint_md_2x
  let image;

  if (imageUrl) {
    image = <Image
      className="su-object-cover su-object-center"
      src={imageUrl}
      alt=""
      fill={true}
    />
  }

  interface option {
    value: string
    label: string
  }

  const libraryOptions: option[] = [];

  Object.keys(libraries).map(i => {
    libraryOptions.push({value: libraries[i].id, label: libraries[i].title})
  })

  return (
    <div {...props}>

      <Card
        className="su-border-0 su-rounded"
        image={image}
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
                defaultValue={libraryOptions[0]}
                isSearchable={false}
                onChange={(item: option) => setSelectedLibrary(item.value)}
              />

              <div className="su-text-black  su-flex su-gap-sm su-justify-between" aria-live="polite">
                <div><ClockIcon className="su-inline" width={15}/> {isOpen ? 'Open' : 'Closed'}</div>
                <div>
                  {!closedAllDay && (isOpen ? 'Closes at ' + closeTime.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    timeZone: 'America/Los_Angeles'
                  }) : 'Opens at ' + openTime.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    timeZone: 'America/Los_Angeles'
                  }))}
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