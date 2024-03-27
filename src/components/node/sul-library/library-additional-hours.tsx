"use client";

import useLibraryHours, {LocationHours} from "@/lib/hooks/useLibraryHours";
import {getLibrarySelectOptions} from "@/components/node/sul-library/library-select-options";
import {useId} from "react";
import {ErrorBoundary} from "react-error-boundary";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import Link from "@/components/patterns/elements/drupal-link";
import {ClockIcon} from "@heroicons/react/24/outline";
import {ChevronRightIcon} from "@heroicons/react/20/solid";

const LibraryAdditionalHours = ({hoursId}: {hoursId: string}) => {
  return (
    <ErrorBoundary
      fallback={<></>}
      onError={e => console.error(e.message)}
    >
      <CachedClientFetch>
        <LibraryAdditionalHoursComponent hoursId={hoursId}/>
      </CachedClientFetch>
    </ErrorBoundary>
  )
}

const LibraryAdditionalHoursComponent = ({hoursId}: {hoursId: string}) => {
  const id = useId();
  const libraryHours = useLibraryHours(hoursId) as LocationHours
  const additionalLocations = libraryHours && libraryHours.additionalLocations;
  const today = new Date().toLocaleString('en-us', {weekday: 'short', timeZone: 'America/Los_Angeles'});

  if (!additionalLocations || !additionalLocations.length) {
    return null;
  }

  return (
    <div
      className="@container relative z-[1] shadow-md border border-black-10 py-20 px-30 flex-1 flex items-center basis-1/2">
      <div className="w-full">
        <div className="flex flex-col @md:flex-row justify-between @md:items-end gap-2xl mb-40">
          <h2 className="text-m3 m-0 p-0">Additional Hours</h2>
          <Link href={`https://library-hours.stanford.edu/libraries/${hoursId}`}
                className="no-underline hocus:underline">
            See detailed hours
            <ChevronRightIcon width={20} className="inline"/>
          </Link>
        </div>
        {additionalLocations.map(location =>
          <div key={location.id} className="grid @xl:grid-cols-2 mb-30 last:mb-0">
            <div id={`${id}-${location.id}`} className="flex items-center">{location.name}</div>

            <div className="flex gap-xs">
              <ClockIcon width={20}/>
              <div>{getLibrarySelectOptions(location.hours).find(option => option.value === today)?.label}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default LibraryAdditionalHours;