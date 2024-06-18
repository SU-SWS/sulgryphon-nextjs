"use client";

import {CalendarDaysIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import StudyPlaceFiltering from "@/components/views/sul-study-place/study-place-filtering";
import StudyPlaceHours from "./study-place-today-hours-table";
import Link from 'next/link';
import Image from "next/image";
import {EnvelopeIcon} from "@heroicons/react/20/solid";
import EmailLink from "@/components/patterns/elements/email-link";
import formatHtml from "@/lib/format-html";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {NodeSulStudyPlace, TermUnion} from "@/lib/gql/__generated__/drupal.d";

interface Props {
  items: NodeSulStudyPlace[]
}

const StudyPlacesFilteredCards = async ({items}: Props) => {
  return <StudyPlaceFiltering items={items}/>
}

// Filter out empty terms and deduplicate terms by their ID.
// const features: TermUnion[] = item.sulStudyFeatures?.filter((term, index, self) =>
//   term.name?.length > 0 && index === self.findIndex((t) => (
//     t.id === term.id
//   ))
// ) || [];


const SulStudyPlaceTableView  = async ({items}: Props) => {
  console.log(items);
  return (
    
    <Table className="responsive-table">
      <Thead className="sr-only sm:not-sr-only">
        <Tr className="block md:table-row sm:hidden">
          <Th className="type-1 block md:table-cell min-w-[100px]" scope="col">
            <span className="sr-only">Photo</span>
          </Th>
          <Th className="type-1 block md:table-cell" scope="col">Place</Th>
          <Th className="type-1 block md:table-cell" scope="col">Library</Th>
          <Th className="type-1 block md:table-cell" scope="col">Open/Closed</Th>
          <Th className="type-1 block md:table-cell" scope="col">Features</Th>
          <Th className="type-1 block md:table-cell min-w-[100px]" scope="col">
            <span className="sr-only">Reserve this space</span>
          </Th>
        </Tr>
      </Thead>

      <Tbody>
      {items.map(item => (
        <Tr key={item.id} className="">
          <Td className="md:border-b md:border-black-40 m-auto">
              <Link href={item.path} className="block relative aspect-[3/2] w-[338px] md:w-[125px] overflow-hidden" aria-labelledby={item.id}>
                {item.sulStudyImage?.mediaImage.url &&
                  <Image
                    className="object-cover"
                    src={item.sulStudyImage?.mediaImage.url}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 300px, 150px"
                  />
                }
              </Link>
          </Td>
          <Td className="w-auto md:w-1/5 block md:table-cell md:border-b md:border-black-40">
            <div className="leading-display text-18 pt-0 font-normal">
              <h2 className="text-20 mb-[0px]">{[item.sulStudyRoomDonorName, item.sulStudyType.name].filter(item => !!item).join(" ")}</h2>
              {item.sulStudyRoomNumber &&
                <div className="relative type-0">
                  Room-{item.sulStudyRoomNumber}
                </div>
              }
              {item.sulStudyCapacity &&
                <div className="relative type-0">
                  {item.sulStudyCapacity.name}
                </div>
              }
            </div>
          </Td>
          <Td className="w-auto md:w-2/5 block md:table-cell min-w-1/5 md:border-b md:border-black-40">
            <Link href={item.sulStudyBranch.path}
                className="transition-colors hover:text-brick-dark hover:bg-black-10 hover:no-underline focus:bg-none focus:text-cardinal-red active:text-cardinal-red">
                <div>{item.sulStudyBranch.title}</div>
            </Link>
          </Td>
          <Td className="w-auto md:w-1/5 block md:table-cell md:border-b md:border-black-40">
            {item.sulStudyBranch?.suLibraryHours &&
              <StudyPlaceHours hoursId={item.sulStudyBranch.suLibraryHours}/>
            }
          </Td>
          <Td className="w-auto md:w-1/5 block md:table-cell md:border-b md:border-black-40">
            5
          </Td>
          <Td className="w-auto md:w-1/5 block md:table-cell md:border-b md:border-black-40">
              {(item.sulStudyLibcalId) &&
              <a
                href={`https://appointments.library.stanford.edu/space/${item.sulStudyLibcalId}`}
                className="button text-black whitespace-nowrap bg-white border border-solid border-digital-red hocus:shadow-button hocus:bg-inherit hocus:text-black w-fit text-16 md:text-18" aria-haspopup="dialog"
              >
                <div className="flex justify-end items-center gap-xs">
                  <CalendarDaysIcon title="Date" className="inline-block flex-shrink-0 w-[24px]"/>
                  <div className="relative pr-30 font-bold no-underline">
                    Reserve Space <span className="sr-only">at {item.sulStudyBranch.title}</span>
                    <ChevronRightIcon className="inline absolute top-0 right-0 h-full"/>
                  </div>
                </div>
              </a>
            }
          </Td>
        </Tr>
        )
      )
      }
      </Tbody>
    </Table>
  )
}
export default SulStudyPlaceTableView;
