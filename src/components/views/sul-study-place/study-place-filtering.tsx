"use client"

import {FormEvent, MouseEvent, RefObject, useEffect, useRef, useState} from "react"
import {SignalIcon} from "@heroicons/react/20/solid"
import SulStudyPlaceCard from "@/components/node/sul-study-place/card"
import SelectList from "@/components/patterns/elements/select-list"
import {SelectValue} from "@mui/base/useSelect"
import autoAnimate from "@formkit/auto-animate"
import {NodeSulStudyPlace} from "@/lib/gql/__generated__/drupal.d"

interface SelectOption {
  value: string
  label: string
}

const StudyPlacesFiltering = ({items}: {items: NodeSulStudyPlace[]}) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedLibraries, setSelectedLibraries] = useState<string[]>([])
  const [selectedCapacity, setSelectedCapacity] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatured] = useState<string[]>([])
  const parent: RefObject<HTMLUListElement | null> = useRef(null)

  const [itemsToDisplay, setItemsToDisplay] = useState(items)

  let typeOfStudies: SelectOption[] = []
  let featureOptions: SelectOption[] = []
  let capacityOptions: SelectOption[] = []
  let libraryOptions: SelectOption[] = []

  items.map(item => {
    item.sulStudyFeatures?.map(term => {
      if (featureOptions.findIndex(option => option.value === term.id) === -1 && term.name) {
        featureOptions.push({value: term.id, label: term.name})
      }
    })
    if (
      capacityOptions.findIndex(option => option.value === item.sulStudyCapacity?.id) === -1 &&
      item.sulStudyCapacity?.name
    ) {
      capacityOptions.push({value: item.sulStudyCapacity.id, label: item.sulStudyCapacity.name})
    }
    if (typeOfStudies.findIndex(option => option.value === item.sulStudyType.id) === -1 && item.sulStudyType.name) {
      typeOfStudies.push({value: item.sulStudyType.id, label: item.sulStudyType.name})
    }
    if (
      libraryOptions.findIndex(option => option.value === item.sulStudyBranch.id) === -1 &&
      item.sulStudyBranch.title
    ) {
      libraryOptions.push({value: item.sulStudyBranch.id, label: item.sulStudyBranch.title})
    }
  })

  typeOfStudies = typeOfStudies.sort((a, b) => a.label.localeCompare(b.label))
  featureOptions = featureOptions.sort((a, b) => a.label.localeCompare(b.label))
  capacityOptions = capacityOptions.sort((a, b) => a.label.localeCompare(b.label))
  libraryOptions = libraryOptions.sort((a, b) => a.label.localeCompare(b.label))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const filteredItems = items.filter(
      (item: NodeSulStudyPlace) =>
        (!selectedLibraries.length || selectedLibraries.indexOf(item.sulStudyBranch.id) != -1) &&
        (!selectedTypes.length || selectedTypes.indexOf(item.sulStudyType.id) != -1) &&
        (!selectedCapacity.length || selectedCapacity.indexOf(item.sulStudyCapacity?.id || "") != -1) &&
        (!selectedFeatures.length ||
          (item.sulStudyFeatures &&
            item.sulStudyFeatures.filter(term => selectedFeatures.indexOf(term.id) != -1).length > 0))
    )
    setItemsToDisplay(filteredItems)
  }

  const handleReset = (e: MouseEvent) => {
    e.preventDefault()
    setSelectedTypes([])
    setSelectedLibraries([])
    setSelectedCapacity([])
    setSelectedFeatured([])
    setItemsToDisplay(items)
  }

  useEffect(() => {
    if (parent.current) autoAnimate(parent.current, {duration: 300})
  }, [parent])

  return (
    <div className="@container">
      <form className="relative z-[1]" onSubmit={handleSubmit}>
        <fieldset
          className="mb-30 grid grid-cols-1 gap-xs @xl:grid-cols-2 @7xl:grid-cols-4 lg:gap-xl"
          aria-label="Filter study places"
        >
          <legend className="mb-10 whitespace-nowrap font-bold">Filter by:</legend>
          <SelectList
            label="Type"
            options={typeOfStudies}
            multiple
            disabled={typeOfStudies.length == 0}
            value={selectedTypes}
            onChange={(_e, value: SelectValue<string, boolean>) => setSelectedTypes(value as string[])}
          />

          <SelectList
            label="Library"
            options={libraryOptions}
            multiple
            disabled={libraryOptions.length == 0}
            value={selectedLibraries}
            onChange={(_e, value: SelectValue<string, boolean>) => setSelectedLibraries(value as string[])}
          />

          <SelectList
            label="Capacity"
            options={capacityOptions}
            multiple
            disabled={capacityOptions.length == 0}
            value={selectedCapacity}
            onChange={(_e, value: SelectValue<string, boolean>) => setSelectedCapacity(value as string[])}
          />

          <SelectList
            label="Features"
            options={featureOptions}
            multiple
            disabled={featureOptions.length == 0}
            value={selectedFeatures}
            onChange={(_e, value: SelectValue<string, boolean>) => setSelectedFeatured(value as string[])}
          />
        </fieldset>

        <button type="submit" className="button mr-20 text-16 md:text-18">
          Filter
        </button>
        <button className="button text-16 md:text-18" onClick={handleReset}>
          Reset
        </button>
      </form>

      {items.length === 0 && <SignalIcon width={50} className="mx-auto my-50 animate-ping" />}

      {items.length > 0 && (
        <p className={"type-2 mb-32 mt-60 font-bold"} aria-live="polite" aria-atomic="true">
          Showing {itemsToDisplay.length} of {items.length}
          <br />
          {itemsToDisplay.length == 0 && <>No items match the search.</>}
        </p>
      )}
      {itemsToDisplay.length > 0 && (
        <ul ref={parent} className="list-unstyled grid gap-2xl @3xl:grid-cols-2 @7xl:grid-cols-3">
          {itemsToDisplay.map(item => (
            <li key={item.id} className="">
              <SulStudyPlaceCard node={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default StudyPlacesFiltering
