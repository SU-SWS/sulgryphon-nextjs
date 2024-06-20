"use client"

import Link from "next/link"
import Image from "next/image"
import LibCal from "./libcal"
import {EnvelopeIcon} from "@heroicons/react/20/solid"
import EmailLink from "@/components/patterns/elements/email-link"
import {NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d"
import formatHtml from "@/lib/format-html"
import {Table, Thead, Tbody, Tr, Th, Td} from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

interface Props {
  items: NodeStanfordPerson[]
  hasHeading: boolean
}

const SulPeopleTableView = ({items, hasHeading}: Props) => {
  const HeadingElement = hasHeading ? "h3" : "h2"

  return (
    <Table className="responsive-table text-center md:text-left">
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
            Name/Title
          </Th>
          <Th
            className="type-1 block pl-[0px] md:table-cell"
            scope="col"
          >
            Expertise
          </Th>
          <Th
            className="type-1 block pl-[0px] md:table-cell"
            scope="col"
          >
            Contact
          </Th>
          <Th
            className="type-1 block pl-[0px] md:table-cell"
            scope="col"
          >
            Schedule
          </Th>
        </Tr>
      </Thead>

      <Tbody>
        {items.map(item => (
          <Tr
            key={item.id}
            className=""
          >
            <Td className="m-auto text-center sm:text-left md:border-b md:border-black-40">
              <Link
                href={item.path}
                className="relative block aspect-[1/1] w-[200px] overflow-hidden rounded-full md:w-[68px]"
                aria-labelledby={item.id}
              >
                {item.suPersonPhoto?.mediaImage.url && (
                  <Image
                    className="object-cover"
                    src={item.suPersonPhoto?.mediaImage.url}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 300px, 150px"
                  />
                )}
              </Link>
            </Td>
            <Td className="block w-auto text-center sm:text-left md:table-cell md:w-1/5 md:border-b md:border-black-40">
              <Link
                href={item.path}
                className="inline-block text-digital-blue no-underline hover:bg-black-10 hover:text-brick-dark focus:bg-none focus:text-cardinal-red active:text-cardinal-red hocus:underline"
              >
                <HeadingElement
                  className="type-1"
                  id={item.id}
                >
                  {item.title}
                </HeadingElement>
              </Link>
              {item.suPersonFullTitle && <div className="text-19">{item.suPersonFullTitle}</div>}
            </Td>
            <Td className="min-w-1/5 block w-auto text-center sm:text-left md:table-cell md:w-2/5 md:border-b md:border-black-40">
              {!!item.suPersonResearch?.length && (
                <ul className="list-none bg-black-10 px-1em py-1em text-19 md:bg-transparent md:p-0">
                  <>
                    <span className="font-bold md:hidden">Expertise: </span>
                  </>
                  {item.suPersonResearch?.map((research, i) => (
                    <li
                      key={`person-research-${i}`}
                      className="inline w-auto"
                    >
                      <>
                        {formatHtml(research.processed)}
                        <span className="list-comma">, </span>
                      </>
                    </li>
                  ))}
                </ul>
              )}
            </Td>
            <Td className="block w-auto text-center sm:text-left md:table-cell md:w-1/5 md:border-b md:border-black-40">
              {item.suPersonEmail && (
                <>
                  <EnvelopeIcon
                    title="Email"
                    width={20}
                    className="mr-6 inline-block text-digital-blue"
                  />

                  <EmailLink
                    email={item.suPersonEmail}
                    className="break-words text-19 text-digital-blue underline transition-colors hover:bg-black-10 hover:text-brick-dark focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
                  />
                </>
              )}
            </Td>
            <Td className="block w-auto text-center sm:text-left md:table-cell md:w-1/5 md:border-b md:border-black-40">
              {item.sulPersonLibcalId && (
                <LibCal
                  libcalId={item.sulPersonLibcalId}
                  srText={item.title}
                />
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
export default SulPeopleTableView
