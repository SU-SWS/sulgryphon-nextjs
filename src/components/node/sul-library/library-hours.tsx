"use client"

import {ClockIcon} from "@heroicons/react/24/outline"
import {ErrorBoundary} from "react-error-boundary"
import CachedClientFetch from "@/components/utils/cached-client-fetch"
import useTodayLibraryHours from "@/lib/hooks/useTodayLibraryHours"
import {useId} from "react"
import {ChevronDownIcon} from "@heroicons/react/20/solid"
import useOutsideClick from "@/lib/hooks/useOutsideClick"
import {useBoolean} from "usehooks-ts"

const LibraryHeaderHours = ({hoursId}: {hoursId: string}) => {
  return (
    <ErrorBoundary
      fallback={<></>}
      onError={e => console.error(e.message)}
    >
      <CachedClientFetch>
        <LibraryHeaderHoursComponent hoursId={hoursId} />
      </CachedClientFetch>
    </ErrorBoundary>
  )
}

const LibraryHeaderHoursComponent = ({hoursId}: {hoursId: string}) => {
  const elementId = useId()

  const {value: expandedHours, setFalse: closeExpandedHours, toggle: toggleExpandedHours} = useBoolean(false)
  const outsideClickProps = useOutsideClick(closeExpandedHours)
  const hours = useTodayLibraryHours(hoursId)
  if (!hoursId || !hours) {
    return
  }
  const {isOpen, selectOptions, closingTime, openingTime, closedAllDay} = hours
  const hoursDisplay = closedAllDay ? "Closed" : isOpen ? `Open until ${closingTime}` : `Closed until ${openingTime}`

  return (
    <>
      <div className="type-1 mb-20 flex text-black-true">
        <ClockIcon
          title="Hours"
          width={19}
          className="mr-10 inline"
        />
        {hoursDisplay}
      </div>

      <div
        className="relative"
        {...outsideClickProps}
      >
        <button
          className="group mb-5 w-full rounded border border-black-10 px-15 py-5 shadow-md"
          aria-expanded={expandedHours}
          onClick={toggleExpandedHours}
          aria-controls={elementId}
        >
          <div className="flex items-center justify-between text-21">
            See hours for this week
            <span className="w-fit border-b-2 border-transparent group-hocus:border-archway">
              <ChevronDownIcon
                width={40}
                className={(expandedHours ? "scale-y-[-1]" : "") + " group-hocus:text-archway"}
              />
            </span>
          </div>
        </button>
        <ul
          id={elementId}
          className={(expandedHours ? "block" : "hidden") + " list-unstyled absolute left-0 top-full z-10 w-full border border-black-10 bg-white px-20 py-15 shadow-md"}
        >
          {selectOptions.map(day => (
            <li
              key={day.value}
              className="mb-10 flex items-center text-21"
            >
              {day.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
export default LibraryHeaderHours
