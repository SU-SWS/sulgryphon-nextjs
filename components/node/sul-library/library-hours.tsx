"use client";

import {useId} from "react";
import Select from "react-select";
import {ClockIcon} from "@heroicons/react/24/outline";
import {ErrorBoundary} from "react-error-boundary";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import useTodayLibraryHours from "@/lib/hooks/useTodayLibraryHours";

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

const LibraryHeaderHoursComponent = ({hoursId}: {  hoursId: string }) => {
  if (!hoursId) {
    return null;
  }
  const inputId = useId();
  const hours = useTodayLibraryHours(hoursId);

  if (!hours) {
    return null;
  }
  const {isOpen, selectOptions} = hours;
  const today = new Date().toLocaleString('en-us', {weekday: 'short', timeZone: 'America/Los_Angeles'});
  const defaultValue = selectOptions.find(option => option.value === today)

  return (
    <>
      <div className="su-flex su-text-black-true su-mb-20 su-type-1">
        <ClockIcon width={19} className="su-inline su-mr-10"/>
        {isOpen ? 'Open' : 'Closed'}
      </div>
      <Select
        className="su-text-black-true"
        instanceId={`${inputId}-hours`}
        aria-label="Day of the week hours"
        options={selectOptions}
        defaultValue={defaultValue}
        isSearchable={false}
      />
    </>
  )
}
export default LibraryHeaderHours;