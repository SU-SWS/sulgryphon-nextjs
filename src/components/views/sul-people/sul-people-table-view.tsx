"use client";

import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Link from 'next/link';
import Image from "next/image";
import {buildUrl} from "@/lib/drupal/utils";
import LibCal from "@/components/node/stanford-person/libcal";
import {EnvelopeIcon} from "@heroicons/react/20/solid";
import EmailLink from "@/components/patterns/elements/email-link";
import {NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d";

interface Props {
  items: NodeStanfordPerson[]
  hasHeading: boolean
}


const SulPeopleTableView = async ({items, hasHeading }: Props) => {
  // const imageUrl = item.suPersonPhoto?.mediaImage.url;
  const HeadingElement = hasHeading ? 'h3' : 'h2';
  
  return (
    <Table>
      <Thead>
        <Tr>
          <Th></Th>
          <Th className="type-1">Name/Title</Th>
          <Th className="type-1">Research</Th>
          <Th className="type-1">Contact</Th>
          <Th className="type-1">Schedule</Th>
        </Tr>
      </Thead>
      <Tbody>
      {items.map((item) => ( 
        <>
        <Tr>
          <Td>image</Td>
          <Td>
            <Link href={item.path}
                className="no-underline hocus:underline active:underline text-digital-blue hocus:text-brick-dark active:text-digital-red">
              <HeadingElement className="type-0">{item.title}</HeadingElement>
            </Link>
            {(item.suPersonFullTitle) &&
              <div className="type-0">{item.suPersonFullTitle}</div>
            }
          </Td>
          <Td>
            {item.suPersonResearch}
          </Td>
          <Td>
            {(item.suPersonEmail) &&
            <div className="">
              <EnvelopeIcon title="Email" width={20} className="inline-block mr-6 text-digital-blue"/>

              <EmailLink
                email={item.suPersonEmail}
                className="underline transition-colors hover:text-brick-dark hover:bg-black-10 focus:bg-none focus:text-cardinal-red active:text-cardinal-red text-digital-blue break-words"
              />
            </div>
            }
          </Td>
          <Td>
            {item.sulPersonLibcalId &&
            <LibCal libcalId={item.sulPersonLibcalId} srText={item.title}/>
            }
          </Td>
        </Tr>
        </>)
      )
      }
      </Tbody>
    </Table>
  )
}
export default SulPeopleTableView;