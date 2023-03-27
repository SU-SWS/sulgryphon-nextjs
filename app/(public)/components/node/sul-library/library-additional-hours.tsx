"use client";

import formatHtml from "@/lib/format-html";
import {Library} from "@/lib/drupal/drupal";
import useLibraryHours, {LocationHours} from "@/lib/hooks/useLibraryHours";
import Select from "react-select";
import {getLibrarySelectOptions} from "@/components/node/sul-library/library-select-options";
import {useId} from "react";
import {ErrorBoundary} from "react-error-boundary";

const LibraryAdditionalHours = ({node}: { node: Library }) => {
  return (
    <ErrorBoundary
      fallback={<></>}
      onError={e => console.error(e.message)}
    >
      <LibraryAdditionalHoursComponent node={node}/>
    </ErrorBoundary>
  )
}

const LibraryAdditionalHoursComponent = ({node}: { node: Library }) => {
  const id = useId();
  const libraryHours = useLibraryHours(node.su_library__hours) as LocationHours
  const additionalLocations = libraryHours && libraryHours.additionalLocations;
  const today = new Date().toLocaleString('en-us', {weekday: 'short', timeZone: 'America/Los_Angeles'});

  if (!additionalLocations && !node.sul_library__a11y?.processed) {
    return null;
  }

  return (
    <div
      className={"su-mb-50 su-grid su-gap-2xl " + (additionalLocations?.length > 0 && node.sul_library__a11y?.processed ? "lg:su-grid-cols-1-1" : "")}>
      {node.sul_library__a11y?.processed &&
        <div className="su-order-last lg:su-order-first">
          <h2 className="su-text-m3">Accessibility</h2>
          {formatHtml(node.sul_library__a11y?.processed)}
        </div>
      }

      {additionalLocations?.length > 0 &&
        <div className="">
          <h2 className="su-text-m3">Additional Hours</h2>
          {additionalLocations.map(location =>
            <div key={location.id} className="su-grid su-grid-cols-1-1 su-mb-30">
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
      }
    </div>
  )
}
export default LibraryAdditionalHours;