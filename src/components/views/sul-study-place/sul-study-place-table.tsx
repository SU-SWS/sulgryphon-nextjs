"use client"

import {CalendarDaysIcon, ChevronRightIcon} from "@heroicons/react/20/solid"
import StudyPlaceFiltering from "@/components/views/sul-study-place/study-place-filtering"
import StudyPlaceHours from "./study-place-today-hours-table"
import Link from "next/link"
import Image from "next/image"
import {Table, Thead, Tbody, Tr, Th, Td} from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import {NodeSulStudyPlace, TermUnion} from "@/lib/gql/__generated__/drupal.d"

interface Props {
  items: NodeSulStudyPlace[]
}

const StudyPlacesFilteredCards = async ({items}: Props) => {
  return <StudyPlaceFiltering items={items} />
}

// Filter out empty terms and deduplicate terms by their ID.
// const features: TermUnion[] = item.sulStudyFeatures?.filter((term, index, self) =>
//   term.name?.length > 0 && index === self.findIndex((t) => (
//     t.id === term.id
//   ))
// ) || [];



const SulStudyPlaceTableView = async ({items}: Props) => {
  return (
    <Table className="responsive-table">
      <Thead className="sr-only sm:not-sr-only">
        <Tr className="block sm:hidden md:table-row">
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
        {items.map(item => (
          <Tr
            key={item.id}
            className=""
          >
            <Td className="m-auto md:border-b md:border-black-40">
              <Link
                href={item.path}
                className="relative block aspect-[3/2] w-[338px] overflow-hidden md:w-[125px]"
                aria-labelledby={item.id}
              >
                {item.sulStudyImage?.mediaImage.url && (
                  <Image
                    className="object-cover"
                    src={item.sulStudyImage?.mediaImage.url}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 300px, 150px"
                  />
                )}
              </Link>
            </Td>
            <Td className="block w-auto md:table-cell md:w-1/5 md:border-b md:border-black-40">
              <div className="pt-0 text-18 font-normal leading-display">
                <h2 className="mb-[0px] text-20">{[item.sulStudyRoomDonorName, item.sulStudyType.name].filter(item => !!item).join(" ")}</h2>
                {item.sulStudyRoomNumber && <div className="type-0 relative">Room-{item.sulStudyRoomNumber}</div>}
                {item.sulStudyCapacity && <div className="type-0 relative">{item.sulStudyCapacity.name}</div>}
              </div>
            </Td>
            <Td className="min-w-1/5 block w-auto md:table-cell md:w-2/5 md:border-b md:border-black-40">
              <Link
                href={item.sulStudyBranch.path}
                className="transition-colors hover:bg-black-10 hover:text-brick-dark hover:no-underline focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
              >
                <div>{item.sulStudyBranch.title}</div>
              </Link>
            </Td>
            <Td className="block w-auto md:table-cell md:w-1/5 md:border-b md:border-black-40">{item.sulStudyBranch?.suLibraryHours && <StudyPlaceHours hoursId={item.sulStudyBranch.suLibraryHours} />}</Td>
            <Td className="block w-auto md:table-cell md:w-1/5 md:border-b md:border-black-40">
              <ul className="list-none p-0 m-0">
                {item.sulStudyFeatures?.map((feature, index) => (
                  <li key={index} className="type-0">
                    {feature.name}
                  </li>
                ))}
              </ul>
            </Td>
            <Td className="block w-auto md:table-cell md:w-1/5 md:border-b md:border-black-40">
              {item.sulStudyLibcalId && (
                <a
                  href={`https://appointments.library.stanford.edu/space/${item.sulStudyLibcalId}`}
                  className="hocus:shadow-button button w-fit whitespace-nowrap border border-solid border-digital-red bg-white text-16 text-black hocus:bg-inherit hocus:text-black md:text-18"
                  aria-haspopup="dialog"
                >
                  <div className="flex items-center justify-end gap-xs">
                    <CalendarDaysIcon
                      title="Date"
                      className="inline-block w-[24px] flex-shrink-0"
                    />
                    <div className="relative pr-30 font-bold no-underline">
                      Reserve Space <span className="sr-only">at {item.sulStudyBranch.title}</span>
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
  )
}
export default SulStudyPlaceTableView
