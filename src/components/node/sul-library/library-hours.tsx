"use client";

import {ClockIcon} from "@heroicons/react/24/outline";
import {ErrorBoundary} from "react-error-boundary";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import useTodayLibraryHours from "@/lib/hooks/useTodayLibraryHours";
import {useId, useState} from "react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import useOutsideClick from "@/lib/hooks/useOutsideClick";

const LibraryHeaderHours = ({hoursId}: { hoursId: string }) => {
  return (
    <ErrorBoundary
      fallback={<></>}
      onError={e => console.error(e.message)}
    >
      <CachedClientFetch>
        <LibraryHeaderHoursComponent hoursId={hoursId}/>
      </CachedClientFetch>
    </ErrorBoundary>
  )
}

const LibraryHeaderHoursComponent = ({hoursId}: { hoursId: string }) => {
  const elementId = useId();
  const [expandedHours, setExpandedHours] = useState(false);
  const outsideClickProps = useOutsideClick(() => setExpandedHours(false))
  if (!hoursId) {
    return null;
  }
  const hours = useTodayLibraryHours(hoursId);

  if (!hours) {
    return null;
  }
  const {isOpen, selectOptions, closingTime, openingTime, closedAllDay} = hours;
  const hoursDisplay = closedAllDay ? 'Closed' : (isOpen ? `Open: ${openingTime} - ${closingTime}` :  `Closed: ${openingTime} - ${closingTime}`);

  return (
    <>
      <div className="flex text-black-true mb-20 type-1">
        <ClockIcon width={19} className="inline mr-10"/>
        {hoursDisplay}
      </div>

      <div
        className="relative"
        {...outsideClickProps}
      >
        <button
          className="rounded group shadow-md border border-black-10 w-full px-15 py-5 mb-5"
          aria-expanded={expandedHours}
          onClick={() => setExpandedHours(!expandedHours)}
          aria-controls={elementId}
        >
          <div className="flex justify-between items-center text-21">
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
          className={(expandedHours ? "block" : "hidden") + " list-unstyled absolute z-10 top-full left-0 shadow-md border border-black-10 bg-white w-full px-20 py-15"}
        >
          {selectOptions.map(day =>
            <li key={day.value} className="flex items-center mb-10 text-21">
              {day.label}
            </li>
          )}
        </ul>
      </div>
    </>
  )
}
export default LibraryHeaderHours;