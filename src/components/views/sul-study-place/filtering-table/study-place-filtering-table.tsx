"use client"

import {CalendarDaysIcon, ChevronRightIcon} from "@heroicons/react/20/solid"
import StudyPlaceTodayHoursTable from "@/components/views/sul-study-place/filtering-table/study-place-today-hours-table"
import Link from "next/link"
import Image from "next/image"
import {Table, Thead, Tbody, Tr, Th, Td} from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import {MediaImage, NodeSulStudyPlace, TermUnion} from "@/lib/gql/__generated__/drupal.d"
import {useCallback, useState} from "react"
import SelectList from "@/components/patterns/elements/select-list"
import {ClockIcon} from "@heroicons/react/24/outline"
import useLibraryHours, {DayHours, LocationHours} from "@/lib/hooks/useLibraryHours"
import {useBoolean} from "usehooks-ts"

export type StudyPlaces = {
  id: NodeSulStudyPlace["id"]
  title: NodeSulStudyPlace["id"]
  branchPath: NodeSulStudyPlace["sulStudyBranch"]["path"]
  branchTitle: NodeSulStudyPlace["sulStudyBranch"]["title"]
  features?: TermUnion["name"][]
  branchImageUrl?: MediaImage["mediaImage"]["url"]
  donorName?: NodeSulStudyPlace["sulStudyRoomDonorName"]
  studyType?: NodeSulStudyPlace["sulStudyType"]["name"]
  roomNumber?: NodeSulStudyPlace["sulStudyRoomNumber"]
  capacity?: TermUnion["name"]
  libCalId?: NodeSulStudyPlace["sulStudyLibcalId"]
  libHours?: NodeSulStudyPlace["sulStudyBranch"]["suLibraryHours"]
}

interface Props {
  items: StudyPlaces[]
}

type FiltersType = {
  types: string[]
  capacities: string[]
  libraries: string[]
  features: string[]
}

const StudyPlaceFilteringTable = ({items}: Props) => {
  const {value: onlyOpenNow, setTrue: showOnlyOpenNow, setFalse: showOpenAndClosed} = useBoolean(false)
  const [filters, setFilters] = useState<FiltersType>({types: [], capacities: [], libraries: [], features: []})
  const libraryHours = useLibraryHours<Record<string, LocationHours>>()

  const filterLocations = useCallback(
    (showingItems: StudyPlaces[]) => {
      const rightNow = new Date()
      const openBranches: string[] = []

      Object.keys(libraryHours).map(hourId => {
        const todayHours = libraryHours[hourId].primaryHours.find(day => {
          const dayDate = new Date(day.day + " 20:00:00").toLocaleDateString("en-us", {
            weekday: "long",
            timeZone: "America/Los_Angeles",
          })
          return dayDate === rightNow.toLocaleDateString("en-us", {weekday: "long", timeZone: "America/Los_Angeles"})
        }) as DayHours

        if (todayHours.opens_at && todayHours.closes_at && rightNow > new Date(todayHours.opens_at) && rightNow < new Date(todayHours.closes_at)) openBranches.push(hourId)
      })
      return showingItems.filter(item => item.libHours && openBranches.includes(item.libHours))
    },
    [libraryHours]
  )

  const types: string[] = []
  const capacities: string[] = []
  const libraries: string[] = []
  const features: string[] = []

  items.map(item => {
    if (item.studyType) types.push(item.studyType)
    if (item.capacity) capacities.push(item.capacity)
    libraries.push(item.branchTitle)
    item.features?.map(feat => features.push(feat))
  })

  const typeOptions = [...new Set(types)].sort().map(opt => ({label: opt, value: opt}))
  const capacityOptions = [...new Set(capacities)].sort().map(opt => ({label: opt, value: opt}))
  const libraryOptions = [...new Set(libraries)].sort().map(opt => ({label: opt, value: opt}))
  const featureOptions = [...new Set(features)].sort().map(opt => ({label: opt, value: opt}))

  let displayedItems = items.filter(item => {
    let displayItem = true
    if (displayItem && filters.types.length) displayItem = !!(item.studyType && filters.types.includes(item.studyType))
    if (displayItem && filters.libraries.length) displayItem = !!(item.branchTitle && filters.libraries.includes(item.branchTitle))
    if (displayItem && filters.capacities.length) displayItem = !!(item.capacity && filters.capacities.includes(item.capacity))
    if (displayItem && filters.features.length) displayItem = !!(item.features && filters.features.filter(value => item.features?.includes(value)).length)
    return displayItem
  })

  if (onlyOpenNow) displayedItems = filterLocations(displayedItems)

  return (
    <div className="@container">
      <form onSubmit={e => e.preventDefault()}>
        <fieldset>
          <legend className="sr-only">Filter places to study</legend>
          <div className="mb-30 flex w-full flex-wrap items-center justify-around gap-10 *:min-w-300 *:flex-1 *:2xl:min-w-0">
            {!!Object.keys(libraryHours).length && (
              <fieldset className="flex w-full items-center">
                <legend className="sr-only">Show only open now or all locations</legend>
                <label className="group w-1/2 cursor-pointer">
                  <input
                    className="peer sr-only"
                    type="radio"
                    name="open"
                    onChange={showOpenAndClosed}
                    checked={!onlyOpenNow}
                  />
                  <span className="flex items-center whitespace-nowrap rounded-l-full border border-r-0 border-black-80 px-24 py-8 text-16 underline group-hover:no-underline peer-checked:bg-[#979694] peer-checked:bg-opacity-20 peer-focus:border-2 peer-focus:border-black-80 peer-focus:bg-[#979694] peer-focus:bg-opacity-10">All Locations</span>
                </label>

                <label className="group w-1/2 cursor-pointer">
                  <input
                    className="peer sr-only"
                    type="radio"
                    name="open"
                    onChange={showOnlyOpenNow}
                    checked={onlyOpenNow}
                  />
                  <span className="flex items-center whitespace-nowrap rounded-r-full border border-black-80 px-24 py-8 text-16 underline group-hover:no-underline peer-checked:bg-[#979694] peer-checked:bg-opacity-20 peer-focus:border-2 peer-focus:border-black-80 peer-focus:bg-[#979694] peer-focus:bg-opacity-10">
                    <ClockIcon
                      title="Hours"
                      width={15}
                      className="mr-8 flex-shrink-0 text-black-80"
                    />
                    Open Now
                  </span>
                </label>
              </fieldset>
            )}

            <SelectList
              options={typeOptions}
              label="Type of place"
              multiple
              onChange={(_e, values) => setFilters(prevFilter => ({...prevFilter, types: values as string[]}))}
            />
            <SelectList
              options={capacityOptions}
              label="Capacity"
              multiple
              onChange={(_e, values) => setFilters(prevFilter => ({...prevFilter, capacities: values as string[]}))}
            />
            <SelectList
              options={libraryOptions}
              label="Library"
              multiple
              onChange={(_e, values) => setFilters(prevFilter => ({...prevFilter, libraries: values as string[]}))}
            />
            <SelectList
              options={featureOptions}
              label="Features"
              multiple
              onChange={(_e, values) => setFilters(prevFilter => ({...prevFilter, features: values as string[]}))}
            />
          </div>
        </fieldset>
      </form>
      {!displayedItems.length && <p>No results match your search.</p>}
      {!!displayedItems.length && (
        <Table className="responsive-table responsive-table-study">
          <caption
            className="sr-only"
            aria-live="polite"
            aria-atomic
          >
            Showing {displayedItems.length} of {items.length}
          </caption>
          <Thead className="sr-only lg:not-sr-only">
            <Tr className="block sm:hidden lg:!table-row">
              <Th
                className="type-1 block min-w-[100px] pl-[0px] md:table-cell"
                scope="col"
              >
                <span className="sr-only">Photo</span>
              </Th>
              <Th
                className="type-1 block pl-[0px] md:table-cell"
                scope="col"
              >
                Place
              </Th>
              <Th
                className="type-1 block pl-[0px] md:table-cell"
                scope="col"
              >
                Library
              </Th>
              <Th
                className="type-1 block pl-[0px] text-center md:table-cell md:text-left"
                scope="col"
              >
                Open/Closed
              </Th>
              <Th
                className="type-1 block pl-[0px] md:table-cell"
                scope="col"
              >
                Features
              </Th>
              <Th
                className="type-1 block min-w-[100px] pl-[0px] md:table-cell"
                scope="col"
              >
                <span className="sr-only">Reserve this space</span>
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {displayedItems.map(item => (
              <Tr
                key={item.id}
                className="block sm:flex-col sm:flex-wrap md:flex md:max-h-[425px] lg:!table-row lg:max-h-none"
              >
                <Td className="m-auto block sm:mr-25 sm:border-b sm:border-black-40 md:min-h-[425px] md:w-1/2 lg:table-cell lg:min-h-fit lg:w-[125px]">
                  {item.branchImageUrl && (
                    <Link
                      href={item.branchPath}
                      className="relative block aspect-[3/2] w-[338px] overflow-hidden lg:min-w-[125px]"
                      aria-labelledby={item.id}
                    >
                      <Image
                        className="object-contain"
                        src={item.branchImageUrl}
                        alt=""
                        fill
                        sizes="(max-width: 992px) 300px, 150px"
                      />
                    </Link>
                  )}
                </Td>
                <Td className="block w-auto sm:border-b sm:border-black-40 md:w-1/2 lg:table-cell lg:w-1/5">
                  <div className="pt-0 text-18 font-normal leading-display">
                    <h2 className="mb-[0px] font-sans text-20">{[item.donorName, item.studyType].filter(item => !!item).join(" ")}</h2>
                    {item.roomNumber && <div className="type-0 relative">Room-{item.roomNumber}</div>}
                    {item.capacity && <div className="type-0 relative">{item.capacity}</div>}
                  </div>
                </Td>
                <Td className="min-w-1/5 block w-auto sm:border-b sm:border-black-40 md:w-1/2 lg:table-cell lg:w-1/5">
                  <Link
                    href={item.branchPath}
                    className="transition-colors hover:bg-black-10 hover:text-brick-dark hover:no-underline focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
                  >
                    <div>{item.branchTitle}</div>
                  </Link>
                </Td>
                <Td className="block w-auto sm:border-b sm:border-black-40 md:w-1/2 lg:table-cell lg:w-1/5">{item.libHours && <StudyPlaceTodayHoursTable hoursId={item.libHours} />}</Td>
                <Td className="block w-auto sm:border-b sm:border-black-40 md:w-1/2 lg:table-cell lg:w-2/5">
                  {item.features && (
                    <div className="bg-black-10 px-16 py-8 text-19 lg:bg-transparent lg:p-0">
                      <span className="bg-black-10 font-bold lg:hidden">Features: </span>
                      {item.features.join(", ")}
                    </div>
                  )}
                </Td>
                <Td className="block w-auto sm:border-b sm:border-black-40 md:w-1/2 lg:table-cell lg:w-1/5">
                  {item.libCalId && (
                    <a
                      href={`https://appointments.library.stanford.edu/space/${item.libCalId}`}
                      className="button w-fit whitespace-nowrap border border-solid border-digital-red bg-white text-16 text-black hocus:bg-digital-red hocus:text-white hocus:shadow-button md:text-18"
                      aria-haspopup="dialog"
                    >
                      <div className="flex items-center justify-end gap-xs">
                        <CalendarDaysIcon
                          title="Date"
                          className="inline-block w-[24px] flex-shrink-0"
                        />
                        <div className="relative pr-30 font-bold no-underline">
                          Reserve Space<span className="sr-only">&nbsp;at {item.branchTitle}</span>
                          <ChevronRightIcon className="absolute right-0 top-0 inline h-full" />
                        </div>
                      </div>
                    </a>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </div>
  )
}
export default StudyPlaceFilteringTable
