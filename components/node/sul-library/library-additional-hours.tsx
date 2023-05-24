"use client";

import useLibraryHours, {LocationHours} from "@/lib/hooks/useLibraryHours";
import Select from "react-select";
import {getLibrarySelectOptions} from "@/components/node/sul-library/library-select-options";
import {useId} from "react";
import {ErrorBoundary} from "react-error-boundary";
import CachedClientFetch from "@/components/utils/cached-client-fetch";

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
    <div className="su-@container su-shadow-md su-border su-border-black-10 su-py-20 su-px-30 su-flex-1 su-flex su-items-center">
      <div className="">
        <h2 className="su-text-m3">Additional Hours</h2>
        {additionalLocations.map(location =>
          <div key={location.id} className="su-grid @3xl:su-grid-cols-1-1 su-mb-30 last:su-mb-0">
            <div id={id + `-${location.id}`}>{location.name}</div>
            <Select
              className="su-text-black-true"
              instanceId={`${location.id}-additional-hours`}
              aria-labelledby={id + `-${location.id}`}
              options={getLibrarySelectOptions(location.hours)}
              defaultValue={getLibrarySelectOptions(location.hours).find(option => option.value === today)}
              isSearchable={false}
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default LibraryAdditionalHours;