"use client";

import Link from 'next/link';
import Image from "next/image";
import LibCal from './libcal';
import {EnvelopeIcon} from "@heroicons/react/20/solid";
import EmailLink from "@/components/patterns/elements/email-link";
import {NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d";

interface Props {
  items: NodeStanfordPerson[]
  hasHeading: boolean
}

const SulPeopleTableView = async ({items, hasHeading }: Props ) => {
  const HeadingElement = hasHeading ? 'h3' : 'h2';
  console.log(items);
  return (
    <table className="text-center md:text-left">
      <thead className="sr-only sm:not-sr-only">
        <tr className="block md:table-row sm:hidden">
          <th className="type-1 block md:table-cell min-w-[100px]"></th>
          <th className="type-1 block md:table-cell ">Name/Title</th>
          <th className="type-1 block md:table-cell ">Expertise</th>
          <th className="type-1 block md:table-cell ">Contact</th>
          <th className="type-1 block md:table-cell ">Schedule</th>
        </tr>
      </thead>
      <tbody>
      {items.map((item, id) => (
        <tr key="{id}" className="block md:text-left md:table-row">
          <td className="w-[216px] md:max-w-[200px] block md:table-cell md:border-b md:border-black-40 m-auto">
            <div
              className="relative rounded-full aspect-[1/1] w-[130px] @lg:w-[150px] overflow-hidden">
              <Link href={item.path}>
              <Image
                className="rounded-full object-cover"
                src={item.suPersonPhoto?.mediaImage.url}
                alt=""
                fill
                sizes="(max-width: 1700px) 100vw, 1500px"
              />
              </Link>
            </div>
          </td>
        <td className="w-auto md:w-1/5 block md:table-cell md:border-b md:border-black-40">
            <Link href={item.path}
                className="no-underline inline-block hocus:underline hover:text-brick-dark hover:bg-black-10 focus:bg-none focus:text-cardinal-red active:text-cardinal-red text-digital-blue ">
              <HeadingElement className="type-0">{item.title}</HeadingElement>
            </Link>
            {(item.suPersonFullTitle) &&
              <div className="type-0">{item.suPersonFullTitle}</div>
            }
          </td>
          <td className="w-auto md:w-2/5 block md:table-cell min-w-1/5 md:border-b md:border-black-40">
          {(item.suPersonResearchInterests) &&
              <div className="type-0">{item.suPersonResearchInterests}</div>
            }
          </td>
          <td className="w-auto md:w-1/5 block md:table-cell md:border-b md:border-black-40">
            {(item.suPersonEmail) &&
            <>
              <EnvelopeIcon title="Email" width={20} className="inline-block mr-6 text-digital-blue"/>

              <EmailLink
                email={item.suPersonEmail}
                className="underline transition-colors hover:text-brick-dark hover:bg-black-10 focus:bg-none focus:text-cardinal-red active:text-cardinal-red text-digital-blue break-words"
              />
            </>
            }
          </td>
          <td className="w-auto md:w-1/5 block md:table-cell md:border-b md:border-black-40">
            {item.sulPersonLibcalId &&
            <LibCal libcalId={item.sulPersonLibcalId} srText={item.title}/>
            }
          </td>
        </tr>
        )
      )
      }
      </tbody>
    </table>
  )
}
export default SulPeopleTableView;