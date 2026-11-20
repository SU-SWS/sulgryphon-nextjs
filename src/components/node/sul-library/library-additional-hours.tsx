"use client"

import useLibraryHours from "@/lib/hooks/useLibraryHours"
import {getLibrarySelectOptions} from "@/components/node/sul-library/library-select-options"
import {useId} from "react"
import {ErrorBoundary} from "react-error-boundary"
import Link from "@/components/patterns/elements/drupal-link"
import {ClockIcon} from "@heroicons/react/24/outline"
import {ChevronRightIcon} from "@heroicons/react/20/solid"

const LibraryAdditionalHours = ({hoursId}: {hoursId: string}) => {
  return (
    <ErrorBoundary fallback={<></>} onError={e => console.error(e instanceof Error ? e.message : e)}>
      <LibraryAdditionalHoursComponent hoursId={hoursId} />
    </ErrorBoundary>
  )
}

const LibraryAdditionalHoursComponent = ({hoursId}: {hoursId: string}) => {
  const id = useId()
  const libraryHours = useLibraryHours(hoursId)
  const additionalLocations = libraryHours && libraryHours.additionalLocations

  // The hours only load in the browser, so this returns before reading the clock while the page is prerendered.
  // Reading it there aborts the prerender and client renders every Suspense boundary on the page.
  if (!additionalLocations || !additionalLocations.length) {
    return null
  }

  const today = new Date().toLocaleString("en-us", {weekday: "short", timeZone: "America/Los_Angeles"})

  return (
    <div className="@container relative z-1 flex flex-1 basis-1/2 items-center border border-black-10 px-30 py-20 shadow-md">
      <div className="w-full">
        <div className="mb-40 flex flex-col justify-between gap-2xl @md:flex-row @md:items-end">
          <h2 className="m-0 p-0 type-3">Additional Hours</h2>
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
