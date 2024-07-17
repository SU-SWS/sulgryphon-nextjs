"use client"

import {ClockIcon, MapPinIcon, EnvelopeIcon, PhoneIcon} from "@heroicons/react/24/outline"
import {ChevronDownIcon} from "@heroicons/react/20/solid"
import {Table, Thead, Tbody, Tr, Th, Td} from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import {Maybe, NodeSulLibrary} from "@/lib/gql/__generated__/drupal"
import {useCallback, useId, useRef} from "react"
import Image from "next/image"
import Link from "next/link"
import Address from "@/components/patterns/elements/address"
import useLibraryHours, {DayHours, LocationHours} from "@/lib/hooks/useLibraryHours"
import {useBoolean, useEventListener} from "usehooks-ts"
import useOutsideClick from "@/lib/hooks/useOutsideClick"
import useTodayLibraryHours from "@/lib/hooks/useTodayLibraryHours"

export type BranchLocation = {
  id: NodeSulLibrary["id"]
  title: NodeSulLibrary["title"]
  path: NodeSulLibrary["path"]
  imageUrl?: Maybe<string>
  email?: NodeSulLibrary["suLibraryEmail"]
  phone?: NodeSulLibrary["suLibraryPhone"]
  address?: NodeSulLibrary["suLibraryAddress"]
  mapUrl?: Maybe<string>
  hoursId?: NodeSulLibrary["suLibraryHours"]
}

type Props = {
  items: BranchLocation[]
}

const BranchLocationFilteringTable = ({items}: Props) => {
  const libraryHours = useLibraryHours<Record<string, LocationHours>>()
  const {value: onlyOpenNow, setTrue: showOnlyOpenNow, setFalse: showOpenAndClosed} = useBoolean(false)

  const filterLocations = () => {
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
    return items.filter(item => item.hoursId && openBranches.includes(item.hoursId))
  }

  const displayedItems = onlyOpenNow ? filterLocations() : items

  return (
    <div className="pb-[32px]">
      <form>
        <fieldset className="rs-mb-1 mx-auto flex w-fit items-center rounded-full border border-cardinal-red">
          <legend className="sr-only">Filter by speciality</legend>
          <label className="group cursor-pointer border-r border-cardinal-red">
            <input
              type="radio"
              name="open"
              className="peer sr-only"
              checked={!onlyOpenNow}
              onChange={showOpenAndClosed}
            />
            <span className="block rounded-l-full border-2 border-transparent p-10 underline group-hover:no-underline peer-checked:border-cardinal-red peer-checked:bg-red-200 peer-focus:no-underline peer-focus:outline-2 peer-focus:outline-blue-500">All locations</span>
          </label>
          <label className="group cursor-pointer border-l border-cardinal-red">
            <input
              type="checkbox"
              name="open"
              className="peer sr-only"
              checked={onlyOpenNow}
              onChange={showOnlyOpenNow}
            />
            <span className="flex items-center rounded-r-full border-2 border-transparent p-10 underline group-hover:no-underline peer-checked:border-cardinal-red peer-checked:bg-red-200 peer-focus:no-underline peer-focus:outline-2 peer-focus:outline-blue-500">
              <ClockIcon
                title="Hours"
                width={15}
                className="mr-8 inline-block flex-shrink-0 text-digital-red"
              />
              Open Now
            </span>
          </label>
        </fieldset>
      </form>

      <Table className="responsive-table responsive-table-branches ml-[-20px] sm:ml-0">
        <Thead className="sr-only lg:not-sr-only">
          <Tr className="block sm:hidden lg:!table-row">
            <Th
              className="type-1 block min-w-[100px] pl-[0px] md:table-cell"
              scope="col"
            >
              <span className="sr-only">Photo</span>
            </Th>
            <Th className="type-1 block min-w-[100px] whitespace-nowrap pl-[0px] text-center md:table-cell md:text-left">Library</Th>
            <Th className="type-1 block whitespace-nowrap pl-[0px] text-center md:table-cell">Open/Closed</Th>
            <Th className="type-1 block whitespace-nowrap pl-[0px] text-center md:table-cell md:text-left">Contact</Th>
            <Th className="type-1 block whitespace-nowrap pl-[0px] text-center md:table-cell md:text-left">Address</Th>
          </Tr>
        </Thead>
        <Tbody>
          {displayedItems.map(item => (
            <TableRow
              key={item.id}
              {...item}
            />
          ))}
        </Tbody>
      </Table>
    </div>
  )
}

const TableRow = ({id, imageUrl, path, title, phone, email, mapUrl, address, hoursId}: BranchLocation) => {
  return (
    <Tr
      key={id}
      className="block sm:flex-col sm:flex-wrap sm:text-center md:grid md:grid-cols-2 md:grid-rows-4 md:justify-items-start md:gap-x-20 md:text-left md:align-top lg:!table-row lg:max-h-none"
    >
      <Td className="m-auto flex min-h-fit justify-center sm:mr-25 sm:border-b sm:border-black-40 md:row-span-4 lg:table-cell lg:w-[125px]">
        <div className="relative block aspect-[3/2] w-[338px] overflow-hidden lg:w-[125px]">
          {imageUrl && (
            <Image
              className="object-contain"
              src={imageUrl}
              alt=""
              fill
              sizes="300px"
            />
          )}
        </div>
      </Td>
      <Td className="flex w-auto sm:border-b sm:border-black-40 md:text-left lg:table-cell lg:w-1/4">
        <Link
          href={path}
          className="inline-block w-full text-center md:w-auto md:text-left"
        >
          {title}
        </Link>
      </Td>
      <Td className="branch-hours flex w-auto justify-center sm:border-b sm:border-black-40 md:items-center md:justify-start lg:table-cell lg:w-1/4">{hoursId && <BranchHours hoursId={hoursId} />}</Td>
      <Td className="block w-auto sm:border-b sm:border-black-40 lg:table-cell lg:w-1/4">
        {phone && (
          <a
            href={`tel:${phone.replaceAll(/[^0-9]/g, "")}`}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <PhoneIcon
              title="Phone Number"
              width={20}
            />
            {phone}
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <EnvelopeIcon
              title="Email"
              width={20}
            />
            {email}
          </a>
        )}
      </Td>
      <Td className="block w-auto sm:border-b sm:border-black-40 lg:table-cell lg:w-1/4">
        {address && mapUrl && (
          <a
            href={mapUrl}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <MapPinIcon
              title="Map"
              width={20}
              className="min-w-20"
            />
            <Address
              {...address}
              className="text-center md:text-left"
            />
          </a>
        )}
      </Td>
    </Tr>
  )
}

const BranchHours = ({hoursId}: {hoursId: string}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const {value: expandedHours, setFalse: collapseHours, toggle: toggleExpandedHours} = useBoolean(false)
  const outsideClickProps = useOutsideClick(collapseHours)
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

  if (!libraryHours.primaryHours || !todayLibraryHours) {
    return
  }

  const {isOpen, closingTime, nextOpeningTime} = todayLibraryHours

  return (
    <div
      {...outsideClickProps}
      ref={containerRef}
      className="relative flex text-16 md:flex lg:block"
    >
      {isOpen && <span className="m-auto mb-8 mr-8 block w-fit rounded-full bg-digital-green p-10 text-white sm:text-center md:my-0 md:ml-0 md:mr-5 md:text-left lg:m-0 lg:mx-auto lg:text-center">Open</span>}

      {!isOpen && <span className="m-auto mr-8 flex w-fit sm:text-center md:my-0 md:ml-0 md:mr-5 md:text-left lg:m-0 lg:mx-auto lg:text-center">Closed</span>}

      <div className="flex w-fit items-center whitespace-nowrap sm:text-center md:text-left lg:mx-auto lg:text-center">
        {isOpen && closingTime && `Until ${closingTime}`}
        {!isOpen && nextOpeningTime && `Until ${nextOpeningTime}`}
        {!closingTime && !nextOpeningTime && "Hours this week"}

        <button
          ref={buttonRef}
          onClick={toggleExpandedHours}
          aria-controls={id}
          aria-expanded={expandedHours}
        >
          <span className="sr-only">Show this weeks hours</span>
          <ChevronDownIcon
            width={20}
            className={expandedHours ? "rotate-180 transition" : "transition"}
          />
        </button>
      </div>
      <div
        id={id}
        className={expandedHours ? "absolute top-full z-10 block" : "hidden"}
        role="region"
      >
        <div className="w-300 border border-black-60 bg-white p-20 text-left">
          <div className="mb-10 font-bold">Hours this week</div>
          {libraryHours.primaryHours.map(dayHours => (
            <div
              key={`${hoursId}-${dayHours.weekday}`}
              className="grid grid-cols-2 gap-5"
            >
              <div>{dayHours.weekday}</div>
              <div>
                {dayHours.closed && "Closed"}

                {!dayHours.closed && (
                  <>
                    {dayHours.opens_at &&
                      new Date(dayHours.opens_at).toLocaleTimeString("en-us", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    -
                    {dayHours.closes_at &&
                      new Date(dayHours.closes_at).toLocaleTimeString("en-us", {
                        hour: "numeric",
                        minute: "2-digit",
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

export default BranchLocationFilteringTable
