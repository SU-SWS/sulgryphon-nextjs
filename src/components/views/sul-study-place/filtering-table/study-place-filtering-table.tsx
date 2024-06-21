"use client"

import {CalendarDaysIcon, ChevronRightIcon} from "@heroicons/react/20/solid"
import StudyPlaceTodayHoursTable from "@/components/views/sul-study-place/filtering-table/study-place-today-hours-table"
import Link from "next/link"
import Image from "next/image"
import {Table, Thead, Tbody, Tr, Th, Td} from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import {Maybe, NodeSulStudyPlace} from "@/lib/gql/__generated__/drupal.d"
import {useState} from "react"

export type StudyPlaces = {
  id: NodeSulStudyPlace["id"]
  title: NodeSulStudyPlace["id"]
  branchPath: NodeSulStudyPlace["sulStudyBranch"]["path"]
  branchTitle: NodeSulStudyPlace["sulStudyBranch"]["title"]
  features?: string[]
  branchImageUrl?: Maybe<string>
  donorName?: Maybe<string>
  studyType?: Maybe<string>
  roomNumber?: Maybe<string>
  capacity?: Maybe<string>
  libcalId?: Maybe<number>
  libHours?: Maybe<string>
}

interface Props {
  items: StudyPlaces[]
}

const StudyPlaceFilteringTable = ({items}: Props) => {
  const [displayedItems, setDisplayedItems] = useState(items)

  const filterItems = () => {
    setDisplayedItems(displayedItems.length === 5 ? items.slice(0, 20) : items.slice(0, 5))
  }

  return (
    <div>
      <button onClick={filterItems}>Click me</button>
      <Table className="responsive-table responsive-table-study">
        <Thead className="md:max-lg:not-sr-only sr-only">
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
              className="block md:grid lg:!table-row"
            >
              <Td className="image m-auto md:border-b md:border-black-40 lg:table-cell">
                {item.branchImageUrl && (
                  <Link
                    href={item.branchPath}
                    className="relative block aspect-[3/2] w-[338px] overflow-hidden lg:w-[125px]"
                    aria-labelledby={item.id}
                  >
                    <Image
                      className="object-cover"
                      src={item.branchImageUrl}
                      alt=""
                      fill
                      sizes="(max-width: 992px) 300px, 150px"
                    />
                  </Link>
                )}
              </Td>
              <Td className="place w-auto md:border-b md:border-black-40 lg:table-cell lg:w-1/5">
                <div className="pt-0 text-18 font-normal leading-display">
                  <h2 className="mb-[0px] font-sans text-20">{[item.donorName, item.studyType].filter(item => !!item).join(" ")}</h2>
                  {item.roomNumber && <div className="type-0 relative">Room-{item.roomNumber}</div>}
                  {item.capacity && <div className="type-0 relative">{item.capacity}</div>}
                </div>
              </Td>
              <Td className="min-w-1/5 libraryName w-auto md:border-b md:border-black-40 lg:table-cell lg:w-1/5">
                <Link
                  href={item.branchPath}
                  className="transition-colors hover:bg-black-10 hover:text-brick-dark hover:no-underline focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
                >
                  <div>{item.branchTitle}</div>
                </Link>
              </Td>
              <Td className="openclosed w-auto md:border-b md:border-black-40 lg:table-cell lg:w-1/5">{item.libHours && <StudyPlaceTodayHoursTable hoursId={item.libHours} />}</Td>
              <Td className="features w-auto md:border-b md:border-black-40 lg:table-cell lg:w-2/5">
                {item.features && (
                  <div className="bg-black-10 p-0 p-1em text-19 lg:bg-transparent">
                    <span className="bg-black-10 font-bold lg:hidden">Features: </span>
                    {item.features.join(", ")}
                  </div>
                )}
              </Td>
              <Td className="reserve w-auto md:border-b md:border-black-40 lg:table-cell lg:w-1/5">
                {item.libcalId && (
                  <a
                    href={`https://appointments.library.stanford.edu/space/${item.libcalId}`}
                    className="hocus:shadow-button button w-fit whitespace-nowrap border border-solid border-digital-red bg-white text-16 text-black hocus:bg-inherit hocus:text-black md:text-18"
                    aria-haspopup="dialog"
                  >
                    <div className="flex items-center justify-end gap-xs">
                      <CalendarDaysIcon
                        title="Date"
                        className="inline-block w-[24px] flex-shrink-0"
                      />
                      <div className="relative pr-30 font-bold no-underline">
                        Reserve Space <span className="sr-only">at {item.branchTitle}</span>
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
    </div>
  )
}
export default StudyPlaceFilteringTable
