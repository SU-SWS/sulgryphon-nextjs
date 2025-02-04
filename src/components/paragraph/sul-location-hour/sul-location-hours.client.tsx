"use client"

import Card from "@/components/patterns/card"
import {ClockIcon} from "@heroicons/react/24/outline"
import {MapPinIcon} from "@heroicons/react/24/solid"
import Image from "next/image"
import {HTMLAttributes, ReactNode, useId, useState} from "react"
import {ErrorBoundary} from "react-error-boundary"
import CachedClientFetch from "@/components/utils/cached-client-fetch"
import useTodayLibraryHours from "@/lib/hooks/useTodayLibraryHours"
import SelectList from "@/components/patterns/elements/select-list"
import {buildUrl} from "@/lib/drupal/utils"
import {NodeSulLibrary} from "@/lib/gql/__generated__/drupal.d"
import Link from "next/link"
import MoonStarsIcon from "@/components/patterns/icons/MoonStarsIcon"

type HoursProps = HTMLAttributes<HTMLDivElement> & {
  libraries: NodeSulLibrary[]
  alert?: string | ReactNode
}

const SulLocationHoursClient = ({libraries, alert, ...props}: HoursProps) => {
  if (!libraries || libraries.length === 0) return
  return (
    <ErrorBoundary fallback={<></>}>
      <CachedClientFetch>
        <LibrariesTodayHours libraries={libraries} alert={alert} {...props} />
      </CachedClientFetch>
    </ErrorBoundary>
  )
}

interface option {
  value: string
  label: string
}

const LibrariesTodayHours = ({
  libraries,
  alert,
  ...props
}: {
  libraries: HoursProps["libraries"]
  alert?: string | ReactNode
}) => {
  const formId = useId()
  const [selectedLibrary, setSelectedLibrary] = useState(
    libraries.find(library => library.suLibraryHours === "green")?.id ?? libraries[0].id
  )
  const library = libraries.find((item, index) => (selectedLibrary ? item.id === selectedLibrary : index === 0))

  const libraryOptions: option[] = []
  libraries.map(library => {
    libraryOptions.push({value: library.id, label: library.title})
  })

  const imageUrl = library?.suLibraryContactImg?.mediaImage.url || library?.suLibraryBanner?.mediaImage.url

  return (
    <Card
      {...props}
      className=""
      image={
        imageUrl && (
          <span className="relative block h-full w-full">
            <Image
              className="object-cover object-center"
              src={buildUrl(imageUrl).toString()}
              alt=""
              fill
              sizes="500px"
            />
            <span className="absolute bottom-0 z-10 w-full bg-cardinal-red p-10">
              <span className="mx-auto flex w-fit items-center gap-10 text-12 font-semibold leading-normal text-white sm:text-16">
                <MoonStarsIcon className="ml-10" />
                <span className="[&_a:hocus]:text-black [&_a]:text-white">{alert}</span>
              </span>
            </span>
          </span>
        )
      }
      footerClasses="p-0"
      footer={
        <div className="basefont-20 relative">
          <div className="mb-16 flex flex-col items-start justify-between xl:flex-row xl:items-center">
            <h2 id={formId} className="type-1 mb-03em font-serif font-bold leading-tight text-black">
              Library hours
            </h2>
            <a href="https://library-hours.stanford.edu/libraries">See all hours</a>
          </div>

          <div className="mb-10">
            <SelectList
              ariaLabelledby={formId}
              options={libraryOptions}
              defaultValue={libraryOptions.find(option => option.value === selectedLibrary)?.value}
              onChange={(_e, value) => setSelectedLibrary(value as string)}
            />
          </div>
          <div className="flex flex-col items-start justify-between xl:flex-row xl:items-center">
            {library?.suLibraryHours && <TodayLibraryHours branchId={library.suLibraryHours} />}

            {library?.suLibraryMapLink?.url && (
              <Link href={library.suLibraryMapLink.url} prefetch={false} className="flex items-center">
                <span className="sr-only">{library.title}&nbsp;</span>
                <MapPinIcon title="Map" width={25} className="mr-5" />
                Location
              </Link>
            )}
          </div>
        </div>
      }
    />
  )
}

const TodayLibraryHours = ({branchId}: {branchId?: string}) => {
  const libraryHours = useTodayLibraryHours(branchId || "")

  if (!libraryHours) return

  const {closedAllDay, isOpen, closingTime, nextOpeningTime} = libraryHours
  const hoursDisplay =
    !closedAllDay && isOpen
      ? "Open until " + closingTime
      : "Closed" + (nextOpeningTime ? ` until ${nextOpeningTime}` : "")
  if (!hoursDisplay) return

  return (
    <div className="mb-4 flex items-center text-black" aria-live="polite" aria-atomic>
      <ClockIcon title="Hours" width={25} className="mr-5" />
      <div>{hoursDisplay}</div>
    </div>
  )
}

export default SulLocationHoursClient
