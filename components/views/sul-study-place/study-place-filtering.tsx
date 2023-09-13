"use client";

import {RefObject, useEffect, useRef, useState} from "react";
import {StudyPlace} from "@/lib/drupal/drupal";
import Conditional from "../../utils/conditional";
import {SignalIcon} from "@heroicons/react/20/solid";
import SulStudyPlaceCard from "@/components/node/sul-study-place/card";
import SelectList from "@/components/patterns/elements/select-list";
import {SelectValue} from "@mui/base/useSelect";
import autoAnimate from "@formkit/auto-animate";

interface SelectOption {
  value: string
  label: string
}

const StudyPlacesFiltering = ({items}) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLibraries, setSelectedLibraries] = useState<string[]>([]);
  const [selectedCapacity, setSelectedCapacity] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatured] = useState<string[]>([]);
  const parent: RefObject<HTMLUListElement> = useRef(null);

  const [itemsToDisplay, setItemsToDisplay] = useState(items)

  let typeOfStudies: SelectOption[] = [];
  let featureOptions: SelectOption[] = [];
  let capacityOptions: SelectOption[] = [];
  let libraryOptions: SelectOption[] = [];

  items.map(item => {
    item.sul_study__features?.map(term => {
      if (featureOptions.findIndex(option => option.value === term.id) === -1 && term.name) {
        featureOptions.push({value: term.id, label: term.name})
      }
    })
    if (capacityOptions.findIndex(option => option.value === item.sul_study__capacity?.id) === -1 && item.sul_study__capacity?.name) {
      capacityOptions.push({value: item.sul_study__capacity.id, label: item.sul_study__capacity.name})
    }
    if (typeOfStudies.findIndex(option => option.value === item.sul_study__type.id) === -1 && item.sul_study__type.name) {
      typeOfStudies.push({value: item.sul_study__type.id, label: item.sul_study__type.name})
    }
    if (libraryOptions.findIndex(option => option.value === item.sul_study__branch.id) === -1 && item.sul_study__branch.title) {
      libraryOptions.push({value: item.sul_study__branch.id, label: item.sul_study__branch.title})
    }
  });

  typeOfStudies = typeOfStudies.sort((a, b) => a.label.localeCompare(b.label));
  featureOptions = featureOptions.sort((a, b) => a.label.localeCompare(b.label));
  capacityOptions = capacityOptions.sort((a, b) => a.label.localeCompare(b.label));
  libraryOptions = libraryOptions.sort((a, b) => a.label.localeCompare(b.label));

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredItems = items.filter((item: StudyPlace) =>
      (!selectedLibraries.length || selectedLibraries.indexOf(item.sul_study__branch.id) != -1) &&
      (!selectedTypes.length || selectedTypes.indexOf(item.sul_study__type.id) != -1) &&
      (!selectedCapacity.length || selectedCapacity.indexOf(item.sul_study__capacity?.id) != -1) &&
      (!selectedFeatures.length || (item.sul_study__features && item.sul_study__features.filter(term => selectedFeatures.indexOf(term.id) != -1).length > 0))
    );
    setItemsToDisplay(filteredItems)
  }

  const handleReset = (e) => {
    e.preventDefault();
    setSelectedTypes([]);
    setSelectedLibraries([]);
    setSelectedCapacity([]);
    setSelectedFeatured([]);
    setItemsToDisplay(items)
  }

  useEffect(() => {
    parent.current && autoAnimate(parent.current, {duration: 300});
  }, [parent])

  return (
    <div className="su-@container">
      <form className="su-relative su-z-[1]" onSubmit={handleSubmit}>
        <fieldset
          className="su-grid su-grid-cols-1 @xl:su-grid-cols-2 @7xl:su-grid-cols-4 su-gap-xs lg:su-gap-xl su-mb-30"
          aria-label="Filter study places">
          <legend className="su-font-bold su-mb-10 su-whitespace-nowrap">Filter places to study.</legend>
          <SelectList
            label="Type"
            options={typeOfStudies}
            multiple
            disabled={typeOfStudies.length == 0}
            value={selectedTypes}
            onChange={(event, value: SelectValue<string, true>) => setSelectedTypes(value)}
          />

          <SelectList
            label="Library"
            options={libraryOptions}
            multiple
            disabled={libraryOptions.length == 0}
            value={selectedLibraries}
            onChange={(event, value: SelectValue<string, true>) => setSelectedLibraries(value)}
          />

          <SelectList
            label="Capacity"
            options={capacityOptions}
            multiple
            disabled={capacityOptions.length == 0}
            value={selectedCapacity}
            onChange={(event, value: SelectValue<string, true>) => setSelectedCapacity(value)}
          />

          <SelectList
            label="Features"
            options={featureOptions}
            multiple
            disabled={featureOptions.length == 0}
            value={selectedFeatures}
            onChange={(event, value: SelectValue<string, true>) => setSelectedFeatured(value)}
          />

        </fieldset>

        <button type="submit" className="su-button su-mr-20">
          Filter
        </button>
        <button className="su-button" onClick={handleReset}>
          Reset
        </button>
      </form>

      <Conditional showWhen={items.length == 0}>
        <SignalIcon width={50} className="su-animate-ping su-mx-auto su-my-50"/>
      </Conditional>

      <Conditional showWhen={items.length > 0}>
        <p aria-live="polite">
          Showing {itemsToDisplay.length} of {items.length}
          <br/>
          <Conditional showWhen={itemsToDisplay.length == 0}>
            <>No items match the search.</>
          </Conditional>
        </p>
        <Conditional showWhen={itemsToDisplay.length > 0}>
          <ul
            ref={parent}
            className="su-list-unstyled su-grid @3xl:su-grid-cols-2 @7xl:su-grid-cols-3 su-gap-xl"
          >
            {itemsToDisplay.map(item =>
              <li key={item.id} className="">
                <SulStudyPlaceCard node={item}/>
              </li>
            )}
          </ul>
        </Conditional>


      </Conditional>
    </div>
  )
}
export default StudyPlacesFiltering;