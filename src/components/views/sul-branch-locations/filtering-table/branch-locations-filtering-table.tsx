"use client"

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
    <div>
      <div className="mx-auto w-fit">
        <button
          onClick={() => setDisplayedItems(items)}
          className="rounded-l-full border-2 border-digital-red"
          aria-current={displayedItems.length === items.length}
        >
          All Locations
        </button>
        <button
          onClick={filterLocations}
          className="rounded-r-full border-2 border-digital-red"
          aria-current={displayedItems.length !== items.length}
        >
          Open Now
        </button>
      </div>
      <Table>
        <Thead>
          <Tr>
            <Th className="whitespace-nowrap text-center">Library</Th>
            <Th className="whitespace-nowrap text-center">Open/Closed</Th>
            <Th className="whitespace-nowrap text-center">Contact</Th>
            <Th className="whitespace-nowrap text-center">Address</Th>
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
    <Tr key={id}>
      <Td className="flex items-center gap-10">
        <div className="relative aspect-[4/3] w-[200px]">
          {imageUrl && (
            <Image
              className="object-cover"
              src={imageUrl}
              alt=""
              fill
              sizes="300px"
            />
          )}
        </div>
        <Link href={path}>{title}</Link>
      </Td>
      <Td>{hoursId && <BranchHours hoursId={hoursId} />}</Td>
      <Td>
        {phone && (
          <a
            href={`tel:${phone.replaceAll(/[^0-9]/g, "")}`}
            className="flex items-center gap-4"
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
            className="flex items-center gap-4"
          >
            <EnvelopeIcon
              title="Email"
              width={20}
            />
            {email}
          </a>
        )}
      </Td>
      <Td>
        {address && mapUrl && (
          <a href={mapUrl}>
            <Address {...address} />
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
      {isOpen && <span className="mx-auto block w-fit rounded-full bg-green-800 p-10 text-white">Open</span>}

      {!isOpen && <span className="text-centered mx-auto block p-10">Closed</span>}

      <div className="mx-auto flex w-fit items-center whitespace-nowrap">
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
