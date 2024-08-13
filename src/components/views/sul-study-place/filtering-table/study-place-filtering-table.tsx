"use client"

import Link from "next/link"
import Image from "next/image"
import {Table, Thead, Tbody, Tr, Th, Td} from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import {MediaImage, NodeSulStudyPlace, TermUnion} from "@/lib/gql/__generated__/drupal.d"
import {useCallback, useId, useRef, useState} from "react"
import SelectList from "@/components/patterns/elements/select-list"
import {ClockIcon, ChevronDownIcon} from "@heroicons/react/24/outline"
import useLibraryHours, {DayHours, LocationHours} from "@/lib/hooks/useLibraryHours"
import {useBoolean, useEventListener} from "usehooks-ts"
import useOutsideClick from "@/lib/hooks/useOutsideClick"
import useTodayLibraryHours from "@/lib/hooks/useTodayLibraryHours"

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

        if (
          todayHours.opens_at &&
          todayHours.closes_at &&
          rightNow > new Date(todayHours.opens_at) &&
          rightNow < new Date(todayHours.closes_at)
        )
          openBranches.push(hourId)
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
    if (displayItem && filters.libraries.length)
      displayItem = !!(item.branchTitle && filters.libraries.includes(item.branchTitle))
    if (displayItem && filters.capacities.length)
      displayItem = !!(item.capacity && filters.capacities.includes(item.capacity))
    if (displayItem && filters.features.length)
      displayItem = !!(item.features && filters.features.filter(value => item.features?.includes(value)).length)
    return displayItem
  })

  if (onlyOpenNow) displayedItems = filterLocations(displayedItems)

  return (
    <div className="@container">
      <form onSubmit={e => e.preventDefault()}>
        <fieldset className="text-18">
          <legend className="sr-only">Filter places to study</legend>
          <div className="mb-30 flex w-full flex-wrap items-center justify-around gap-10 *:min-w-300 *:flex-1 *:2xl:min-w-0">
            {!!Object.keys(libraryHours).length && (
              <fieldset className="mr-10 flex h-25 w-full items-center">
                <legend className="sr-only">Show only open now or all locations</legend>
                <label className="group w-1/2 min-w-[134px] cursor-pointer">
                  <input
                    className="peer sr-only"
                    type="radio"
                    name="open"
                    onChange={showOpenAndClosed}
                    checked={!onlyOpenNow}
                  />
                  <span className="flex items-center whitespace-nowrap rounded-l-full border border-r-0 border-black-80 px-24 py-9 text-18 no-underline group-hover:border-cardinal-red-dark group-hover:text-cardinal-red-dark group-hover:underline peer-checked:bg-[#979694] peer-checked:bg-opacity-20 peer-focus:border-2 peer-focus:border-black-80 peer-focus:bg-[#979694] peer-focus:bg-opacity-10">
                    All locations
                  </span>
                </label>

                <label className="group w-1/2 min-w-[134px] cursor-pointer">
                  <input
                    className="peer sr-only"
                    type="radio"
                    name="open"
                    onChange={showOnlyOpenNow}
                    checked={onlyOpenNow}
                  />
                  <span className="flex items-center whitespace-nowrap rounded-r-full border border-black-80 px-22 py-9 text-18 no-underline group-hover:border-cardinal-red-dark group-hover:text-cardinal-red-dark group-hover:underline peer-checked:bg-[#979694] peer-checked:bg-opacity-20 peer-focus:border-2 peer-focus:border-black-80 peer-focus:bg-[#979694] peer-focus:bg-opacity-10">
                    <ClockIcon
                      title="Hours"
                      width={15}
                      className="mr-8 flex-shrink-0 text-black-80 group-hover:text-cardinal-red-dark"
                    />
                    Open now
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
          <caption className="sr-only" aria-live="polite" aria-atomic>
            Showing {displayedItems.length} of {items.length}
          </caption>
          <Thead className="sr-only lg:not-sr-only">
            <Tr className="block sm:hidden lg:!table-row">
              <Th className="type-1 block min-w-[100px] pl-[0px] md:table-cell lg:pr-32" scope="col">
                <span className="sr-only">Photo</span>
              </Th>
              <Th className="type-1 block pl-[0px] md:table-cell lg:pr-32" scope="col">
                Place
              </Th>
              <Th className="type-1 block pl-[0px] md:table-cell lg:pr-32" scope="col">
                Library
              </Th>
              <Th
                className="type-1 block pl-[0px] text-center md:table-cell md:text-left lg:pr-32 lg:text-center"
                scope="col"
              >
                Open/Closed
              </Th>
              <Th className="type-1 block pl-[0px] md:table-cell lg:pr-32" scope="col">
                Features
              </Th>
              <Th className="type-1 block min-w-[100px] pl-[0px] md:table-cell" scope="col">
                <span className="sr-only">Reserve this space</span>
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {displayedItems.map(item => (
              <Tr
                key={item.id}
                className="block sm:flex-col sm:flex-wrap md:grid md:grid-cols-2 md:grid-rows-[repeat(5,minmax(0,auto))] md:justify-items-start md:gap-x-20 md:text-left lg:!table-row lg:max-h-none"
              >
                <Td className="table-image m-auto block min-h-fit w-auto place-content-center justify-center sm:border-b sm:border-black-40 md:row-span-5 lg:table-cell lg:min-h-fit lg:w-[125px] lg:pr-32">
                  {item.branchImageUrl && (
                    <div className="relative block aspect-[3/2] w-auto max-w-[338px] overflow-hidden md:w-[290px] lg:max-w-[125px]">
                      <Image
                        className="object-contain"
                        src={item.branchImageUrl}
                        alt=""
                        fill
                        sizes="(max-width: 992px) 300px, 150px"
                      />
                    </div>
                  )}
                </Td>
                <Th
                  scope="row"
                  className="block w-auto pl-0 md:text-left lg:table-cell lg:w-1/5 lg:border-b lg:border-black-40 lg:pr-32"
                >
                  <div className="pt-0 text-16 font-normal leading-[23px]">
                    <h2 className="mb-[0px] font-sans text-20 font-semibold">
                      {[item.donorName, item.studyType].filter(item => !!item).join(" ")}
                    </h2>
                    {item.roomNumber && <div className="type-0 relative">Room-{item.roomNumber}</div>}
                    {item.capacity && <div className="type-0 relative">{item.capacity}</div>}
                  </div>
                </Th>
                <Td className="min-w-1/5 block w-auto sm:border-b sm:border-black-40 md:text-left lg:table-cell lg:w-1/5 lg:pr-32">
                  <Link
                    href={item.branchPath}
                    className="block w-fit text-16 font-normal leading-[23px] underline transition-colors hover:bg-black-10 hover:text-brick-dark hover:no-underline focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
                  >
                    <div>{item.branchTitle}</div>
                  </Link>
                </Td>
                <Td className="justify-left flex w-auto text-16 leading-[23px] sm:border-b sm:border-black-40 md:text-left lg:table-cell lg:w-1/5 lg:pr-32">
                  {item.libHours && <BranchHours hoursId={item.libHours} />}
                </Td>
                <Td className="block w-auto sm:border-b sm:border-black-40 md:text-left lg:table-cell lg:w-2/5 lg:pr-32">
                  {item.features && (
                    <div className="bg-black-10 px-16 py-8 text-16 leading-[23px] lg:bg-transparent lg:p-0">
                      <span className="bg-black-10 font-bold lg:hidden">Features: </span>
                      {item.features.join(", ")}
                    </div>
                  )}
                </Td>
                <Td className="block w-auto sm:border-b sm:border-black-40 md:text-left lg:table-cell lg:w-1/5">
                  {item.libCalId && (
                    <a
                      href={`https://appointments.library.stanford.edu/space/${item.libCalId}`}
                      className="button w-fit whitespace-nowrap border border-solid border-cardinal-red bg-white py-[4px] text-16 leading-[22px] text-cardinal-red hocus:bg-cardinal-red hocus:text-white hocus:shadow-button md:w-full lg:w-fit"
                      aria-haspopup="dialog"
                    >
                      <div className="flex items-center justify-end gap-xs md:justify-center lg:justify-end">
                        <div className="relative no-underline">
                          Reserve space<span className="sr-only">&nbsp;at {item.branchTitle}</span>
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

const BranchHours = ({hoursId}: {hoursId: string}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const {value: expandedHours, setFalse: collapseHours, toggle: toggleExpandedHours} = useBoolean(false)
  useOutsideClick(containerRef, collapseHours)
  const id = useId()
  const libraryHours = useLibraryHours<LocationHours>(hoursId)
  const todayLibraryHours = useTodayLibraryHours(hoursId)

  // If the user presses escape on the keyboard, close the submenus.
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !expandedHours) return

      collapseHours()
      buttonRef.current?.focus()
    },
    [collapseHours, expandedHours]
  )

  useEventListener("keydown", handleEscape, containerRef)

  if (!libraryHours?.primaryHours || !todayLibraryHours) {
    return
  }

  const {isOpen, closingTime, nextOpeningTime} = todayLibraryHours
  const rightNow = new Date()
  const sunday = new Date()
  sunday.setDate(sunday.getDate() - rightNow.getDay())
  const saturday = new Date()
  saturday.setDate(saturday.getDate() + (7 - rightNow.getDay()))

  const thisWeekHours = libraryHours.primaryHours.filter(dayHours => {
    const day = new Date(dayHours.day + " 20:00:00")
    return day >= sunday && day <= saturday
  })

  return (
    <div ref={containerRef} className="relative flex text-16 leading-[23px] lg:block">
      {isOpen && (
        <span className="mb-8 mr-8 block w-fit rounded-full bg-digital-green p-10 text-white sm:text-center md:my-0 md:ml-0 md:mr-5 md:text-left lg:m-0 lg:mx-auto lg:mb-4 lg:text-center">
          Open
        </span>
      )}

      {!isOpen && (
        <span className="mr-8 flex w-fit items-center sm:text-center md:my-0 md:ml-0 md:mr-5 md:text-left lg:m-0 lg:mx-auto lg:text-center">
          Closed
        </span>
      )}

      <div className="flex w-fit items-center whitespace-nowrap sm:text-center md:text-left lg:mx-auto lg:text-center">
        {isOpen && closingTime && `until ${closingTime}`}
        {!isOpen && nextOpeningTime && `until ${nextOpeningTime}`}

        <button ref={buttonRef} onClick={toggleExpandedHours} aria-controls={id} aria-expanded={expandedHours}>
          <span className="sr-only">Show this weeks hours</span>
          <ChevronDownIcon width={20} className={expandedHours ? "rotate-180 transition" : "transition"} />
        </button>
      </div>
      <div id={id} className={expandedHours ? "absolute top-full z-10 block" : "hidden"} role="region">
        <div className="w-300 border border-black-60 bg-white p-20 text-left">
          <div className="mb-10 font-bold">Hours this week</div>
          {thisWeekHours.map(dayHours => (
            <div key={`${hoursId}-${dayHours.weekday}`} className="grid grid-cols-2 gap-5">
              <div>{dayHours.weekday}</div>
              <div>
                {dayHours.closed && "Closed"}

                {!dayHours.closed && (
                  <>
                    {dayHours.opens_at &&
                      new Date(dayHours.opens_at).toLocaleTimeString("en-us", {
                        hour: "numeric",
                        minute: "2-digit",
                        timeZone: "America/Los_Angeles",
                      })}
                    -
                    {dayHours.closes_at &&
                      new Date(dayHours.closes_at).toLocaleTimeString("en-us", {
                        hour: "numeric",
                        minute: "2-digit",
                        timeZone: "America/Los_Angeles",
                      })}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudyPlaceFilteringTable
