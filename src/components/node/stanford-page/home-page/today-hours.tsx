"use client";

import Card from "@/components/patterns/card";
import {ClockIcon} from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import {HTMLAttributes, useId, useState} from "react";
import {ErrorBoundary} from "react-error-boundary";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import useTodayLibraryHours from "@/lib/hooks/useTodayLibraryHours";
import SelectList from "@/components/patterns/elements/select-list";
import {buildUrl} from "@/lib/drupal/utils";
import {NodeSulLibrary, Maybe} from "@/lib/gql/__generated__/drupal.d";
import Link from "next/link";


export type TrimmedLibrary = {
  id: string
  title: string
  suLibraryHours?: NodeSulLibrary["suLibraryHours"]
  suLibraryContactImg?: NodeSulLibrary["suLibraryContactImg"]
  suLibraryBanner: NodeSulLibrary["suLibraryBanner"]
  map?: Maybe<string>
}

type HoursProps = HTMLAttributes<HTMLDivElement> & {
  libraries: TrimmedLibrary[]
}

const TodayHours = ({libraries, ...props}: HoursProps) => {
  if (!libraries || libraries.length === 0) return;
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

const LibrariesTodayHours = ({libraries, ...props}: { libraries: HoursProps["libraries"] }) => {
  const formId = useId();
  const [selectedLibrary, setSelectedLibrary] = useState(libraries.find(library => library.suLibraryHours === 'green')?.id ?? libraries[0].id);
  const library = libraries.find((item, index) => selectedLibrary ? item.id === selectedLibrary : index === 0);

  const libraryOptions: option[] = [];
  libraries.map(library => {
    libraryOptions.push({value: library.id, label: library.title})
  })

  const imageUrl = library?.suLibraryContactImg?.mediaImage.url || library?.suLibraryBanner?.mediaImage.url

  return (
    <div {...props}>

      <Card
        className="border-0 rounded"
        image={imageUrl && <Image
          className="object-cover object-center"
          src={buildUrl(imageUrl).toString()}
          alt=""
          fill
          sizes="500px"
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
              {library?.suLibraryHours &&
                <TodayLibraryHours branchId={library.suLibraryHours}/>
              }
              {library?.map &&
                <span className="float-right w-auto inline"><Link href={library?.map} ><span className="sr-only">{library.title} Location</span><MapPinIcon title="Map" width={25} className="mr-5 inline"/>Location</Link></span>
              }
            </div>
          </div>
        }
      />
    </div>
  )
}

const TodayLibraryHours = ({branchId}: { branchId?: string }) => {

  const libraryHours = useTodayLibraryHours(branchId || '');

  if (!libraryHours) {
    return (
      <div className="text-black flex">
        <ClockIcon title="Hours" width={15} className="mr-5"/>
        <a href="https://library-hours.stanford.edu/libraries">See all hours</a>
      </div>
    );
  }
  const {closedAllDay, isOpen, openingTime, closingTime, afterClose} = libraryHours;
  const hoursDisplay = !closedAllDay && (isOpen ? 'Closes at ' + closingTime : (afterClose ? 'Closed at ' + closingTime : 'Opens at ' + openingTime));

  return (
    <>
      <div className="text-black flex justify-between mb-4" aria-live="polite">
        <div className="flex"><ClockIcon title="Hours" width={15} className="mr-5"/> {isOpen ? 'Open' : 'Closed'}</div>
        <div>
          {hoursDisplay}
        </div>

      </div>
      <a href="https://library-hours.stanford.edu/libraries">See all hours</a>
    </>
  )
}

export default TodayHours
