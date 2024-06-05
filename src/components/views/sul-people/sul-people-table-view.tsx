"use client";

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Link from 'next/link';
import Image from "next/image";
import {buildUrl} from "@/lib/drupal/utils";
import LibCal from './libcal';
import {EnvelopeIcon} from "@heroicons/react/20/solid";
import EmailLink from "@/components/patterns/elements/email-link";
import {NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d";

interface Props {
  items: NodeStanfordPerson[]
  hasHeading: boolean
}

const SulPeopleTableView = async ({items, hasHeading }: Props) => {
  const HeadingElement = hasHeading ? 'h3' : 'h2';
  
  return (
    <Table>
      <Thead>
        <Tr className="!border-none">
          <Th className=""></Th>
          <Th className="type-1">Name/Title</Th>
          <Th className="type-1">Research</Th>
          <Th className="type-1">Contact</Th>
          <Th className="type-1">Schedule</Th>
        </Tr>
      </Thead>
      <Tbody>
      {items.map((item, index) => (
        <Tr className="!border-none">
          <Td className="md:border-b md:border-black-40">
            <Image
              src={item.suPersonPhoto?.mediaImage.url}
              alt=""
              className="object-cover rounded-full center"
              width="68"
              height="68"
            />
          </Td>
        <Td className="md:border-b md:border-black-40">
            <Link href={item.path}
                className="no-underline hocus:underline active:underline text-digital-blue hocus:text-brick-dark active:text-digital-red">
              <HeadingElement className="type-0">{item.title}</HeadingElement>
            </Link>
            {(item.suPersonFullTitle) &&
              <div className="type-0">{item.suPersonFullTitle}</div>
            }
          </Td>
          <Td className="min-w-1/5 md:border-b md:border-black-40">
          {(item.suPersonResearchInterests) &&
              <div className="type-0">{item.suPersonResearchInterests}</div>
            }
          </Td>
          <Td className="md:border-b md:border-black-40">
            {(item.suPersonEmail) &&
            <>
              <EnvelopeIcon title="Email" width={20} className="inline-block mr-6 text-digital-blue"/>

              <EmailLink
                email={item.suPersonEmail}
                className="underline transition-colors hover:text-brick-dark hover:bg-black-10 focus:bg-none focus:text-cardinal-red active:text-cardinal-red text-digital-blue break-words"
              />
            </>
            }
          </Td>
          <Td className="md:border-b md:border-black-40">
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