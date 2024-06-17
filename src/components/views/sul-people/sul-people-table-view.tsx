"use client";

import Link from 'next/link';
import Image from "next/image";
import LibCal from './libcal';
import {EnvelopeIcon} from "@heroicons/react/20/solid";
import EmailLink from "@/components/patterns/elements/email-link";
import {NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d";
import formatHtml from "@/lib/format-html";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

interface Props {
  items: NodeStanfordPerson[]
  hasHeading: boolean
}

const SulPeopleTableView = ({items, hasHeading }: Props ) => {
  const HeadingElement = hasHeading ? 'h3' : 'h2';

  return (
    <Table className="responsive-table text-center md:text-left">
      <Thead className="sr-only sm:not-sr-only">
        <Tr className="block md:table-row sm:hidden">
          <Th className="type-1 block md:table-cell min-w-[100px]" scope="col">
            <span className="sr-only">Photo</span>
          </Th>
          <Th className="type-1 block md:table-cell" scope="col">Name/Title</Th>
          <Th className="type-1 block md:table-cell" scope="col">Expertise</Th>
          <Th className="type-1 block md:table-cell" scope="col">Contact</Th>
          <Th className="type-1 block md:table-cell" scope="col">Schedule</Th>
        </Tr>
      </Thead>

      <Tbody>
      {items.map(item => (
        <Tr key={item.id} className="">
          <Td className="md:border-b md:border-black-40 m-auto text-center sm:text-left">
              <Link href={item.path} className="block relative rounded-full aspect-[1/1] w-[200px] md:w-[68px] overflow-hidden" aria-labelledby={item.id}>
                {item.suPersonPhoto?.mediaImage.url &&
                  <Image
                    className="object-cover"
                    src={item.suPersonPhoto?.mediaImage.url}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 300px, 150px"
                  />
                }
              </Link>
          </Td>
          <Td className="w-auto md:w-1/5 block md:table-cell md:border-b md:border-black-40 text-center sm:text-left">
            <Link href={item.path}
                className="no-underline inline-block hocus:underline hover:text-brick-dark hover:bg-black-10 focus:bg-none focus:text-cardinal-red active:text-cardinal-red text-digital-blue ">
              <HeadingElement className="type-1" id={item.id}>{item.title}</HeadingElement>
            </Link>
            {(item.suPersonFullTitle) &&
              <div className="text-19">{item.suPersonFullTitle}</div>
            }
          </Td>
          <Td className="w-auto md:w-2/5 block md:table-cell min-w-1/5 md:border-b md:border-black-40 text-center sm:text-left">
          {!!item.suPersonResearch?.length &&
              <ul className="text-19 list-none p-0">
                <><span className="md:hidden font-bold bg-black-10 md:bg-transparent">Expertise: </span></>
                {item.suPersonResearch.map((research, i) =>
                  <li key={`person-research-${i}`} className="inline bg-black-10 md:bg-transparent w-auto">
                    <>
                    {item.suPersonResearch.map((research, i) => formatHtml(research.processed)).join(', ')}
                    </>
                  </li>
                  )}
              </ul>
            }
          </Td>
          <Td className="w-auto md:w-1/5 block md:table-cell md:border-b md:border-black-40 text-center sm:text-left">
            {(item.suPersonEmail) &&
            <>
              <EnvelopeIcon title="Email" width={20} className="inline-block mr-6 text-digital-blue"/>

              <EmailLink
                email={item.suPersonEmail}
                className="text-19 underline transition-colors hover:text-brick-dark hover:bg-black-10 focus:bg-none focus:text-cardinal-red active:text-cardinal-red text-digital-blue break-words"
              />
            </>
            }
          </Td>
          <Td className="w-auto md:w-1/5 block md:table-cell md:border-b md:border-black-40 text-center sm:text-left">
            {item.sulPersonLibcalId &&
            <LibCal libcalId={item.sulPersonLibcalId} srText={item.title}/>
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
export default SulPeopleTableView;