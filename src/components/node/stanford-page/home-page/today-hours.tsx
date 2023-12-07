"use client";

import Card from "@/components/patterns/card";
import {ClockIcon} from "@heroicons/react/24/outline";
import Image from "next/image";
import {PropsWithoutRef, useId, useState} from "react";
import {DrupalImageMedia} from "@/lib/drupal/drupal";
import {ErrorBoundary} from "react-error-boundary";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import useTodayLibraryHours from "@/lib/hooks/useTodayLibraryHours";
import {Library} from "@/lib/drupal/drupal";
import SelectList from "@/components/patterns/elements/select-list";

interface HoursProps extends PropsWithoutRef<any> {
  libraries: { id: string, title: string, su_library__hours?: string, su_library__contact_img?: DrupalImageMedia }[]
}

const TodayHours = ({libraries, ...props}: HoursProps) => {
  return (
    <ErrorBoundary fallback={<></>}>
      <CachedClientFetch>
        <LibrariesTodayHours libraries={libraries as Library[]} {...props}/>
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
  const [selectedLibrary, setSelectedLibrary] = useState(libraries.find(library => library.su_library__hours === 'green')?.id ?? libraries[0].id);
  const library = libraries.find((item, index) => selectedLibrary ? item.id === selectedLibrary : index === 0);

  const libraryOptions: option[] = [];
  Object.keys(libraries).map(i => {
    libraryOptions.push({value: libraries[i].id, label: libraries[i].title})
  })

  const imageUrl = library?.su_library__contact_img?.field_media_image?.image_style_uri?.breakpoint_md_2x || library?.su_library__banner?.field_media_image?.image_style_uri?.breakpoint_md_2x
  const placeholder = library?.su_library__contact_img?.field_media_image?.uri.base64;

  return (
    <div {...props}>

      <Card
        className="border-0 rounded"
        image={imageUrl && <Image
          className="object-cover object-center"
          src={imageUrl}
          alt=""
          fill={true}
          placeholder={placeholder ? 'blur' : 'empty'}
          blurDataURL={placeholder}
        />}
        footer={
          <div className="relative pb-100 md:rs-pb-6">
            <div className="absolute w-full">
              <h3 id={formId} className="text-black leading-tight font-bold type-2 mb-03em">
                Today&apos;s Hours
              </h3>
              <div className="mb-10">
                <SelectList
                  ariaLabelledby={formId}
                  options={libraryOptions}
                  defaultValue={libraryOptions.find(option => option.value === selectedLibrary)?.value}
                  onChange={(e, value) => setSelectedLibrary(value as string)}
                />
              </div>
              <TodayLibraryHours branchId={library?.su_library__hours}/>
            </div>
          </div>
        }
      />
    </div>
  )
}

const TodayLibraryHours = ({branchId, ...props}: { branchId?: string }) => {
  const libraryHours = useTodayLibraryHours(branchId);

  if (!libraryHours) {
    return (
      <div className="text-black flex">
        <ClockIcon width={15} className="mr-5"/>
        <a href="https://library-hours.stanford.edu/libraries">See all hours</a>
      </div>
    );
  }
  const {closedAllDay, isOpen, openingTime, closingTime, afterClose} = libraryHours;
  const hoursDisplay = !closedAllDay && (isOpen ? 'Closes at ' + closingTime : (afterClose ? 'Closed at ' + closingTime : 'Opens at ' + openingTime));

  return (
    <>
      <div className="text-black flex justify-between mb-4" aria-live="polite">
        <div className="flex"><ClockIcon width={15} className="mr-5"/> {isOpen ? 'Open' : 'Closed'}</div>
        <div>
          {hoursDisplay}
        </div>

      </div>
      <a href="https://library-hours.stanford.edu/libraries">See all hours</a>
    </>
  )
}

export default TodayHours