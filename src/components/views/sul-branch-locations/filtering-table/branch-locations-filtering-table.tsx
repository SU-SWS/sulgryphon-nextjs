"use client"

import {MapPinIcon, EnvelopeIcon, PhoneIcon} from "@heroicons/react/24/outline"
import {ChevronDownIcon} from "@heroicons/react/20/solid"
import {Table, Thead, Tbody, Tr, Th, Td} from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import {Maybe, NodeSulLibrary} from "@/lib/gql/__generated__/drupal.d"
import {RefObject, useCallback, useId, useRef} from "react"
import Image from "next/image"
import Link from "next/link"
import Address from "@/components/patterns/elements/address"
import useLibraryHours, {DayHours, LocationHours} from "@/lib/hooks/useLibraryHours"
import {useBoolean, useEventListener} from "usehooks-ts"
import useOutsideClick from "@/lib/hooks/useOutsideClick"
import useTodayLibraryHours from "@/lib/hooks/useTodayLibraryHours"
import ToggleOption from "@/components/patterns/toggle-option"

export type BranchLocation = {
  uuid: NodeSulLibrary["uuid"]
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

      if (
        todayHours.opens_at &&
        todayHours.closes_at &&
        rightNow > new Date(todayHours.opens_at) &&
        rightNow < new Date(todayHours.closes_at)
      )
        openBranches.push(hourId)
    })
    return items.filter(item => item.hoursId && openBranches.includes(item.hoursId))
  }

  const displayedItems = onlyOpenNow ? filterLocations() : items

  return (
    <div className="pb-[32px]">
      <form action="javascript:void(0);">
        <fieldset className="rs-mb-1 mx-auto flex h-25 w-fit items-center rounded-full">
          <legend className="sr-only">Filter by speciality</legend>

          <ToggleOption checked={!onlyOpenNow} onChange={showOpenAndClosed} first name="branch-open">
            All locations
          </ToggleOption>

          <ToggleOption checked={onlyOpenNow} onChange={showOnlyOpenNow} last name="branch-open">
            Open now
          </ToggleOption>
        </fieldset>
      </form>

      <Table className="responsive-table responsive-table-branches sm:ml-0">
        <Thead className="sr-only xl:not-sr-only">
          <Tr className="block sm:hidden xl:!table-row">
            <Th className="type-1 block min-w-[100px] pl-[0px] md:table-cell xl:pr-16" scope="col">
              <span className="sr-only">Photo</span>
            </Th>
            <Th className="type-1 block min-w-[100px] whitespace-nowrap pl-[0px] text-center xl:rs-pr-5 md:table-cell md:text-left xl:pr-20">
              Library
            </Th>
            <Th className="type-1 block whitespace-nowrap pl-[0px] text-center xl:rs-pr-5 md:table-cell xl:pr-20">
              Open/Closed
            </Th>
            <Th className="type-1 block whitespace-nowrap pl-[0px] text-center xl:rs-pr-5 md:table-cell md:text-left xl:pr-20">
              Contact
            </Th>
            <Th className="type-1 block whitespace-nowrap pl-[0px] text-center md:table-cell md:text-left">Address</Th>
          </Tr>
        </Thead>
        <Tbody>
          {displayedItems.map(item => (
            <TableRow key={item.uuid} {...item} />
          ))}
        </Tbody>
      </Table>
    </div>
  )
}

const TableRow = ({uuid, imageUrl, path, title, phone, email, mapUrl, address, hoursId}: BranchLocation) => {
  return (
    <Tr
      key={uuid}
      className="block sm:flex-col sm:flex-wrap sm:text-center md:grid md:grid-cols-2 md:grid-rows-[repeat(4,minmax(0,auto))] md:justify-items-start md:gap-x-20 md:text-left md:align-top xl:!table-row xl:max-h-none"
    >
      <Td className="table-image m-auto flex min-h-fit w-auto place-content-center justify-center sm:border-b sm:border-black-40 md:row-span-4 xl:mr-25 xl:table-cell xl:w-[125px] xl:pr-16 xl:align-middle">
        {imageUrl && (
          <Link
            href={path || "#"}
            className="relative my-16 block aspect-[3/2] w-[300px] max-w-[338px] overflow-hidden md:w-[360px] xl:max-w-[125px]"
            aria-hidden="true"
            tabIndex={-1}
          >
            <Image src={imageUrl} className="object-contain" alt="" fill sizes="300px" />
          </Link>
        )}
      </Td>
      <Th
        scope="row"
        className="flex w-auto px-0 text-center xl:rs-pr-5 md:text-left xl:table-cell xl:w-1/4 xl:border-b xl:border-black-40 xl:pr-20 xl:align-middle"
      >
        <Link
          href={path || "#"}
          className="m-auto mb-16 inline-block w-fit text-center text-[20px] font-semibold no-underline hover:bg-black-10 hover:text-brick-dark focus:bg-none focus:text-cardinal-red active:text-cardinal-red hocus:underline md:m-[unset] md:w-auto md:text-left"
        >
          <span className="mb-0 font-sans text-20 font-semibold">{title}</span>
        </Link>
      </Th>
      <Td className="branch-hours flex w-auto justify-center xl:rs-pr-5 sm:border-b sm:border-black-40 md:items-center md:justify-start xl:table-cell xl:w-1/4 xl:pr-20 xl:align-middle">
        {hoursId && (
          <div className="pb-16 xl:pb-0">
            <BranchHours hoursId={hoursId} />
          </div>
        )}
        {/* Without this, the responsive table library injects a "&nbsp;". */}
        {""}
      </Td>
      <Td className="block w-auto xl:rs-pr-5 sm:border-b sm:border-black-40 xl:table-cell xl:w-1/4 xl:pr-20 xl:align-middle">
        {phone && (
          <a
            href={`tel:${phone.replaceAll(/[^0-9]/g, "")}`}
            className="m-auto flex w-fit items-center justify-center gap-4 text-16 font-normal leading-normal no-underline hover:bg-black-10 hover:text-brick-dark hover:underline focus:bg-none md:m-[unset] md:justify-start"
          >
            <PhoneIcon title="Phone Number" width={20} />
            {phone}
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="m-auto mb-16 flex w-fit items-center justify-center gap-4 text-16 font-normal leading-normal no-underline hover:bg-black-10 hover:text-brick-dark hover:underline focus:bg-none md:mx-[unset] md:justify-start xl:mb-0"
          >
            <EnvelopeIcon title="Email" width={20} />
            {email}
          </a>
        )}
        {/* Without this, the responsive table library injects a "&nbsp;". */}
        {""}
      </Td>
      <Td className="block w-auto text-16 leading-normal sm:border-b sm:border-black-40 xl:table-cell xl:w-1/4 xl:align-middle">
        {address && mapUrl && (
          <div className="pb-16 xl:pb-0">
            <a href={mapUrl} className="flex items-center justify-center gap-4 md:justify-start">
              <MapPinIcon title="Map" width={20} className="min-w-20" />
              <Address
                {...address}
                className="text-center font-normal no-underline hover:bg-black-10 hover:text-brick-dark hover:underline focus:bg-none md:text-left"
              />
            </a>
          </div>
        )}
      </Td>
    </Tr>
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

  useEventListener("keydown", handleEscape, containerRef as RefObject<HTMLDivElement>)

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
    <div ref={containerRef} className="relative flex text-16 leading-normal md:flex xl:block">
      {isOpen && (
        <span className="m-auto mb-8 mr-8 block w-fit rounded-full bg-digital-green p-10 text-white sm:text-center md:my-0 md:ml-0 md:mr-5 md:text-left xl:m-0 xl:mx-auto xl:mb-4 xl:text-center">
          Open
        </span>
      )}

      {!isOpen && (
        <span className="m-auto mr-8 flex w-fit items-center sm:text-center md:my-0 md:ml-0 md:mr-5 md:text-left xl:m-0 xl:mx-auto xl:text-center">
          Closed
        </span>
      )}

      <div className="flex w-fit items-center whitespace-nowrap sm:text-center md:text-left xl:mx-auto xl:text-center">
        {isOpen && closingTime && `until ${closingTime}`}
        {!isOpen && nextOpeningTime && `until ${nextOpeningTime}`}
        {!isOpen && !nextOpeningTime && `Hours this week`}

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

export default BranchLocationFilteringTable
