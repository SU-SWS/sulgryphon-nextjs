"use client";

import {useId, useRef, useState} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {StudyPlace} from "../../../lib/drupal/drupal";
import Select from "react-select";
import Conditional from "../../utils/conditional";
import {SignalIcon} from "@heroicons/react/20/solid";
import SulStudyPlaceCard from "../../node/sul-study-place/card";

interface SelectOption {
  value: string
  label: string
}

const StudyPlacesFiltering = ({items}) => {

  const typeRef = useRef(null);
  const libraryRef = useRef(null);
  const featureRef = useRef(null);
  const capacityRef = useRef(null);
  const inputId = useId();

  const [parent] = useAutoAnimate({duration: 300});
  const [itemsToDisplay, setItemsToDisplay] = useState(items)

  const typeOfStudies: SelectOption[] = [];
  const featureOptions: SelectOption[] = [];
  const capacityOptions: SelectOption[] = [];
  const libraryOptions: SelectOption[] = [];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // @ts-ignore
    const selectedTypes = typeRef.current.getValue().map(option => option.value);
    // @ts-ignore
    const selectedLibraries = libraryRef.current.getValue().map(option => option.value);
    // @ts-ignore
    const selectedCapacity = capacityRef.current.getValue().map(option => option.value);
    // @ts-ignore
    const selectedFeatures = featureRef.current.getValue().map(option => option.value);

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
    // @ts-ignore
    typeRef.current.clearValue();
    // @ts-ignore
    libraryRef.current.clearValue();
    // @ts-ignore
    capacityRef.current.clearValue();
    // @ts-ignore
    featureRef.current.clearValue();
    setItemsToDisplay(items)
  }

  return (
    <>
      <form className="su-@container">
        <div className="su-grid su-grid-cols-1 @xl:su-grid-cols-2 @7xl:su-grid-cols-4 su-gap-xs lg:su-gap-xl su-mb-10">

          <Select
            instanceId={`${inputId}-type`}
            ref={typeRef}
            aria-label="Type of place"
            placeholder="Type"
            options={typeOfStudies}
            name="type"
            isMulti
            isSearchable={false}
            isDisabled={capacityOptions.length == 0}
          />

          <Select
            instanceId={`${inputId}-branch`}
            ref={libraryRef}
            aria-label="Library Branch Location"
            placeholder="Library"
            options={libraryOptions}
            name="library"
            isMulti
            isSearchable={false}
            isDisabled={capacityOptions.length == 0}
          />

          <Select
            instanceId={`${inputId}-capacity`}
            ref={capacityRef}
            aria-label="Library Branch Capacity"
            placeholder="Capacity"
            options={capacityOptions}
            name="capacity"
            isMulti
            isSearchable={false}
            isDisabled={capacityOptions.length == 0}
          />

          <Select
            instanceId={`${inputId}-features`}
            ref={featureRef}
            aria-label="Equipment/Features"
            placeholder="Equipment"
            options={featureOptions}
            name="features"
            isMulti
            isSearchable={false}
            isDisabled={capacityOptions.length == 0}
          />

        </div>

        <button className="su-button su-mr-20" onClick={handleSubmit}>
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
        <p>Showing {itemsToDisplay.length} of {items.length}</p>
        <Conditional showWhen={itemsToDisplay.length > 0}>
          <ul
            ref={parent}
            className="su-list-unstyled md:su-grid su-grid-cols-3 su-gap-2xl su-rs-pt-1"
            aria-live="polite"
          >
            {itemsToDisplay.map(item =>
              <li key={item.id} className="su-rs-mb-3 md:su-mb-0">
                <SulStudyPlaceCard node={item}/>
              </li>
            )}
          </ul>
        </Conditional>

        <Conditional showWhen={itemsToDisplay.length == 0}>
          <p>No items match the search.</p>
        </Conditional>
      </Conditional>
    </>
  )
}
export default StudyPlacesFiltering;