"use client";

import useLibraryHours, {LocationHours} from "@/lib/hooks/useLibraryHours";
import {getLibrarySelectOptions} from "@/components/node/sul-library/library-select-options";
import {useId} from "react";
import {ErrorBoundary} from "react-error-boundary";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import SelectList from "@/components/patterns/elements/select-list";
import Link from "@/components/patterns/elements/drupal-link";
import {ClockIcon} from "@heroicons/react/24/outline";
import {ChevronRightIcon} from "@heroicons/react/20/solid";

const LibraryAdditionalHours = ({hoursId}) => {
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

const LibraryAdditionalHoursComponent = ({hoursId}) => {
  const id = useId();
  const libraryHours = useLibraryHours(hoursId) as LocationHours
  const additionalLocations = libraryHours && libraryHours.additionalLocations;
  const today = new Date().toLocaleString('en-us', {weekday: 'short', timeZone: 'America/Los_Angeles'});

  if (!additionalLocations || !additionalLocations.length) {
    return null;
  }

  return (
    <div
      className="su-@container su-relative su-z-[1] su-@container su-shadow-md su-border su-border-black-10 su-py-20 su-px-30 su-flex-1 su-flex su-items-center su-basis-1/2">
      <div className="su-w-full">
        <div className="su-flex su-flex-col @md:su-flex-row su-justify-between @md:su-items-end su-gap-2xl su-mb-40">
          <h2 className="su-text-m3 su-m-0 su-p-0">Additional Hours</h2>
          <Link href={`https://library-hours.stanford.edu/libraries/${hoursId}`}
                className="su-no-underline hocus:su-underline">
            See detailed hours
            <ChevronRightIcon width={20} className="su-inline"/>
          </Link>
        </div>
        {additionalLocations.map(location =>
          <div key={location.id} className="su-grid @xl:su-grid-cols-1-1 su-mb-30 last:su-mb-0">
            <div id={`${id}-${location.id}`} className="su-flex su-items-center">{location.name}</div>

            <div className="su-flex su-gap-xs">
              <ClockIcon width={20}/>
              <div>{getLibrarySelectOptions(location.hours).find(option => option.value === today).label}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default LibraryAdditionalHours;