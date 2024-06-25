"use client"

import {ClockIcon} from "@heroicons/react/24/outline"
import {Table, Thead, Tbody, Tr, Th, Td} from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import {Maybe, NodeSulLibrary} from "@/lib/gql/__generated__/drupal"
import {useId, useState} from "react"
import Image from "next/image"
import Link from "next/link"
import {EnvelopeIcon, PhoneIcon} from "@heroicons/react/24/outline"
import Address from "@/components/patterns/elements/address"
import useLibraryHours, {DayHours, LocationHours} from "@/lib/hooks/useLibraryHours"
import {useBoolean} from "usehooks-ts"
import useOutsideClick from "@/lib/hooks/useOutsideClick"
import {ChevronDownIcon} from "@heroicons/react/20/solid"

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
  const [displayedItems, setDisplayedItems] = useState(items)

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
    setDisplayedItems(items.filter(item => item.hoursId && openBranches.includes(item.hoursId)))
  }

  return (
    <div className="pb-[32px]">
      <div className="rs-mb-1 mx-auto w-fit">
        <button
          onClick={() => setDisplayedItems(items)}
          className="rounded-l-full border-2 border-digital-red px-24 py-4 text-16"
          aria-current={displayedItems.length === items.length}
        >
          All Locations
        </button>
        <button
          onClick={filterLocations}
          className="inline-block rounded-r-full border-2 border-digital-red px-24 py-4 text-16"
          aria-current={displayedItems.length !== items.length}
        >
          <ClockIcon
            title="Hours"
            width={15}
            className="mr-8 inline-block flex-shrink-0 text-digital-red"
          />
          Open Now
        </button>
      </div>
      <Table className="responsive-table">
        <Thead className="md:max-lg:not-sr-only sr-only">
          <Tr className="block sm:hidden lg:!table-row">
            <Th className="type-1 block min-w-[100px] whitespace-nowrap pl-[0px] text-center md:table-cell">Library</Th>
            <Th className="type-1 block whitespace-nowrap pl-[0px] text-center md:table-cell md:text-left">Open/Closed</Th>
            <Th className="md:table-cellwhitespace-nowrap type-1 block pl-[0px] text-center">Contact</Th>
            <Th className="md:table-cellwhitespace-nowrap type-1 block pl-[0px] text-center">Address</Th>
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
      className="block sm:flex-col sm:flex-wrap sm:text-center md:flex md:max-h-[300px] md:text-left lg:!table-row lg:max-h-none"
    >
      <Td className="m-auto block sm:mr-25 sm:border-b sm:border-black-40 md:min-h-[500px] md:w-1/2 lg:table-cell lg:min-h-fit lg:w-[125px]">
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
      <Td className="block w-auto text-center sm:border-b sm:border-black-40 md:w-1/2 md:text-left lg:table-cell lg:w-1/4">
        <Link href={path}>{title}</Link>
      </Td>
      <Td className="block w-auto sm:border-b sm:border-black-40 md:w-1/2 lg:table-cell lg:w-1/4">{hoursId && <BranchHours hoursId={hoursId} />}</Td>
      <Td className="block w-auto sm:border-b sm:border-black-40 md:w-1/2 lg:table-cell lg:w-1/4">
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
      <Td className="block w-auto sm:border-b sm:border-black-40 md:w-1/2 lg:table-cell lg:w-1/4">
        {address && mapUrl && (
          <a href={mapUrl}>
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
  const {value: expandedHours, setFalse: collapseHours, toggle: toggleExpandedHours} = useBoolean(false)
  const outsideClickProps = useOutsideClick(collapseHours)
  const id = useId()
  const libraryHours = useLibraryHours<LocationHours>(hoursId)
  if (!libraryHours.primaryHours) {
    return
  }

  // To test out various scenarios adjust right now. Go back 20 hours:
  // const rightNow = new Date(new Date().getTime() - 20 * 60 * 60 * 1000)
  // Go forward 10 hours
  // const rightNow = new Date(new Date().getTime() + 10 * 60 * 60 * 1000)
  const rightNow = new Date()

  const todayHours = libraryHours.primaryHours.find(day => {
    // Set the time so that it works with UTC time.
    const dayDate = new Date(day.day + " 20:00:00").toLocaleDateString("en-us", {weekday: "long", timeZone: "America/Los_Angeles"})
    return dayDate === rightNow.toLocaleDateString("en-us", {weekday: "long", timeZone: "America/Los_Angeles"})
  }) as DayHours

  let openTime,
    closeTime,
    isOpen = false

  if (!todayHours.closed && todayHours.opens_at && todayHours.closes_at) {
    openTime = new Date(todayHours.opens_at)
    closeTime = new Date(todayHours.closes_at)
    isOpen = rightNow > openTime && rightNow < closeTime
  }

  const closeTimeString =
    isOpen &&
    closeTime &&
    closeTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZone: "America/Los_Angeles",
    })

  const tomorrowHours = libraryHours.primaryHours.find(day => {
    // Set the time so that it works with UTC time.
    const dayDate = new Date(day.day + " 20:00:00").toLocaleDateString("en-us", {weekday: "long", timeZone: "America/Los_Angeles"})
    return dayDate === new Date(rightNow.getTime() + 1000 * 60 * 60 * 24).toLocaleDateString("en-us", {weekday: "long", timeZone: "America/Los_Angeles"})
  }) as DayHours

  const openTimeString =
    !isOpen &&
    tomorrowHours?.opens_at &&
    new Date(tomorrowHours.opens_at).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZone: "America/Los_Angeles",
    })

  return (
    <div
      {...outsideClickProps}
      className="relative"
    >
      {isOpen && <span className="block w-fit rounded-full bg-green-800 p-10 text-white sm:text-center md:text-left lg:mx-auto lg:text-center">Open</span>}

      {!isOpen && <span className="flex w-fit sm:text-center md:text-left lg:mx-auto lg:text-center">Closed</span>}

      <div className="flex w-fit items-center whitespace-nowrap sm:text-center md:text-left lg:mx-auto lg:text-center">
        {closeTimeString && <>Until {closeTimeString}</>}
        {openTimeString && <>Until {openTimeString}</>}

        {!closeTimeString && !openTimeString && "Hours this week"}

        <button
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
        <div className="w-300 border border-black-60 bg-white p-20">
          Hours this week
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
