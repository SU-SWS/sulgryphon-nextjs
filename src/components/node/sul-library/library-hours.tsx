"use client";

import {ClockIcon} from "@heroicons/react/24/outline";
import {ErrorBoundary} from "react-error-boundary";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import useTodayLibraryHours from "@/lib/hooks/useTodayLibraryHours";
import {useId, useState} from "react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import OutsideClickHandler from "@/components/utils/outside-click-handler";

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
      <div className="su-flex su-text-black-true su-mb-20 su-type-1">
        <ClockIcon width={19} className="su-inline su-mr-10"/>
        {hoursDisplay}
      </div>

      <OutsideClickHandler
        className="su-relative"
        onClickOutside={() => setExpandedHours(false)}
        onFocusOutside={() => setExpandedHours(false)}
      >
        <button
          className="su-rounded su-group su-shadow-md su-border su-border-black-10 su-w-full su-px-15 su-py-5 su-mb-5"
          aria-expanded={expandedHours}
          onClick={() => setExpandedHours(!expandedHours)}
          aria-controls={elementId}
        >
          <div className="su-flex su-justify-between su-items-center su-text-21">
            See hours for this week
            <span className="su-w-fit su-border-b-2 su-border-transparent group-hocus:su-border-archway">
              <ChevronDownIcon
                width={40}
                className={(expandedHours ? "su-scale-y-[-1]" : "") + " group-hocus:su-text-archway"}
              />
            </span>
          </div>
        </button>
        <ul
          id={elementId}
          className={(expandedHours ? "su-block" : "su-hidden") + " su-list-unstyled su-absolute su-z-10 su-top-full su-left-0 su-shadow-md su-border su-border-black-10 su-bg-white su-w-full su-px-20 su-py-15"}
        >
          {selectOptions.map(day =>
            <li key={day.value} className="su-flex su-items-center su-mb-10 su-text-21">
              {day.label}
            </li>
          )}
        </ul>
      </OutsideClickHandler>
    </>
  )
}
export default LibraryHeaderHours;