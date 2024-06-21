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

// const StudyPlacesFilteredTable = async ({items}: Props) => {
//   return <StudyPlaceFilteringTable items={items} />
// }

// Filter out empty terms and deduplicate terms by their ID.
// const features: TermUnion[] = item.sulStudyFeatures?.filter((term, index, self) =>
//   term.name?.length > 0 && index === self.findIndex((t) => (
//     t.id === term.id
//   ))
// ) || [];

const SulStudyPlaceTableView = ({items}: Props) => {
  return (
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
        {items.map(item => (
          <Tr
            key={item.id}
            className="block md:grid lg:!table-row"
          >
            <Td className="image m-auto md:border-b md:border-black-40 lg:table-cell">
              <Link
                href={item.path}
                className="relative block aspect-[3/2] w-[338px] overflow-hidden lg:w-[125px]"
                aria-labelledby={item.id}
              >
                {item.sulStudyImage?.mediaImage.url && (
                  <Image
                    className="object-cover"
                    src={item.sulStudyImage?.mediaImage.url}
                    alt=""
                    fill
                    sizes="(max-width: 992px) 300px, 150px"
                  />
                )}
              </Link>
            </Td>
            <Td className="place w-auto md:border-b md:border-black-40 lg:table-cell lg:w-1/5">
              <div className="pt-0 text-18 font-normal leading-display">
                <h2 className="mb-[0px] font-sans text-20">{[item.sulStudyRoomDonorName, item.sulStudyType.name].filter(item => !!item).join(" ")}</h2>
                {item.sulStudyRoomNumber && <div className="type-0 relative">Room-{item.sulStudyRoomNumber}</div>}
                {item.sulStudyCapacity && <div className="type-0 relative">{item.sulStudyCapacity.name}</div>}
              </div>
            </Td>
            <Td className="min-w-1/5 libraryName w-auto md:border-b md:border-black-40 lg:table-cell lg:w-1/5">
              <Link
                href={item.sulStudyBranch.path}
                className="transition-colors hover:bg-black-10 hover:text-brick-dark hover:no-underline focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
              >
                <div>{item.sulStudyBranch.title}</div>
              </Link>
            </Td>
            <Td className="openclosed w-auto md:border-b md:border-black-40 lg:table-cell lg:w-1/5">{item.sulStudyBranch?.suLibraryHours && <StudyPlaceHours hoursId={item.sulStudyBranch.suLibraryHours} />}</Td>
            <Td className="features w-auto md:border-b md:border-black-40 lg:table-cell lg:w-2/5">
              {!!item.sulStudyFeatures?.length && (
                <ul className="list-none bg-black-10 p-0 p-1em text-19 md:bg-transparent">
                  <>
                    <span className="bg-black-10 font-bold md:hidden">Features: </span>
                  </>
                  {item.sulStudyFeatures.map((feature, index) => (
                    <li
                      key={`feature${index}`}
                      className="inline w-auto bg-black-10 md:bg-transparent"
                    >
                      <>
                        {feature.name}
                        <span className="list-comma">, </span>
                      </>
                    </li>
                  ))}
                </ul>
              )}
            </Td>
            <Td className="reserve w-auto md:border-b md:border-black-40 lg:table-cell lg:w-1/5">
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
