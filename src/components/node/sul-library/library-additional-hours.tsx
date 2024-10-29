"use client"

import useLibraryHours, {LocationHours} from "@/lib/hooks/useLibraryHours"
import {getLibrarySelectOptions} from "@/components/node/sul-library/library-select-options"
import {useId} from "react"
import {ErrorBoundary} from "react-error-boundary"
import CachedClientFetch from "@/components/utils/cached-client-fetch"
import Link from "@/components/patterns/elements/drupal-link"
import {ClockIcon} from "@heroicons/react/24/outline"
import {ChevronRightIcon} from "@heroicons/react/20/solid"

const LibraryAdditionalHours = ({hoursId}: {hoursId: string}) => {
  return (
    <ErrorBoundary fallback={<></>} onError={e => console.error(e.message)}>
      <CachedClientFetch>
        <LibraryAdditionalHoursComponent hoursId={hoursId} />
      </CachedClientFetch>
    </ErrorBoundary>
  )
}

const LibraryAdditionalHoursComponent = ({hoursId}: {hoursId: string}) => {
  const id = useId()
  const libraryHours = useLibraryHours<LocationHours>(hoursId)
  const additionalLocations = libraryHours && libraryHours.additionalLocations
  const today = new Date().toLocaleString("en-us", {weekday: "short", timeZone: "America/Los_Angeles"})

  if (!additionalLocations || !additionalLocations.length) {
    return null
  }

  return (
    <div className="relative z-[1] flex flex-1 basis-1/2 items-center border border-black-10 px-30 py-20 shadow-md @container">
      <div className="w-full">
        <div className="mb-40 flex flex-col justify-between gap-2xl @md:flex-row @md:items-end">
          <h2 className="type-3 m-0 p-0">Additional Hours</h2>
          <Link
            href={`https://library-hours.stanford.edu/libraries/${hoursId}`}
            className="no-underline hocus:underline"
          >
            See detailed hours
            <ChevronRightIcon width={20} className="inline" />
          </Link>
        </div>
        {additionalLocations.map(location => (
          <div key={location.id} className="mb-30 grid last:mb-0 @xl:grid-cols-2">
            <div id={`${id}-${location.id}`} className="flex items-center">
              {location.name}
            </div>

            <div className="flex gap-xs">
              <ClockIcon title="Hours" width={20} />
              <div>{getLibrarySelectOptions(location.hours).find(option => option.value === today)?.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default LibraryAdditionalHours
