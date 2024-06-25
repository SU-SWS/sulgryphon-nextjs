"use client"

import Link from "next/link"
import Image from "next/image"
import LibCal from "./libcal"
import {EnvelopeIcon} from "@heroicons/react/20/solid"
import EmailLink from "@/components/patterns/elements/email-link"
import {Maybe, NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d"
import {Table, Thead, Tbody, Tr, Th, Td} from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import {useState} from "react"

export type TablePerson = {
  id: string
  title: string
  path: string
  types: string[]
  photoUrl?: Maybe<string>
  fullTitle?: NodeStanfordPerson["suPersonFullTitle"]
  researchAreas?: string[]
  email?: NodeStanfordPerson["suPersonEmail"]
  libCalId?: NodeStanfordPerson["sulPersonLibcalId"]
}

type Props = {
  items: TablePerson[]
  hasHeading: boolean
}

const SulPeopleTableView = ({items, hasHeading}: Props) => {
  const HeadingElement = hasHeading ? "h3" : "h2"

  const [typeFilter, setTypeFilter] = useState("")
  let displayedItems = items

  if (typeFilter) {
    displayedItems = items.filter(item => item.types?.map(type => type.toLowerCase()).includes(typeFilter.toLowerCase()))
  }

  return (
    <div>
      <form className="mx-auto mb-32 flex w-fit text-16 text-digital-red *:min-w-fit *:border *:border-cardinal-red *:p-10">
        <button
          type="button"
          className={"hidden rounded-l-full underline hocus:no-underline md:block " + (!typeFilter ? "bg-red-200" : "")}
          aria-current={!typeFilter}
          onClick={() => setTypeFilter("")}
        >
          All specialists
        </button>
        <button
          type="button"
          className={"rounded-l-full underline hocus:no-underline md:rounded-l-none " + (typeFilter === "subject specialist" ? "bg-red-200" : "")}
          aria-current={typeFilter === "subject specialist"}
          onClick={() => setTypeFilter("subject specialist")}
        >
          Subject specialists
        </button>
        <button
          type="button"
          className={"rounded-r-full underline hocus:no-underline " + (typeFilter === "technical specialist" ? "bg-red-200" : "")}
          aria-current={typeFilter === "technical specialist"}
          onClick={() => setTypeFilter("technical specialist")}
        >
          Technical specialists
        </button>
      </form>
      <Table className="responsive-table text-center md:text-left">
        <caption
          className="sr-only"
          aria-live="polite"
          aria-atomic
        >
          Showing {displayedItems.length} of {items.length}
        </caption>
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
          {displayedItems.map(item => (
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
                  {item.photoUrl && (
                    <Image
                      className="object-cover"
                      src={item.photoUrl}
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
                {item.fullTitle && <div className="text-19">{item.fullTitle}</div>}
              </Td>
              <Td className="min-w-1/5 block w-auto text-center sm:text-left md:table-cell md:w-2/5 md:border-b md:border-black-40">
                {!!item.researchAreas?.length && (
                  <div className="bg-black-10 px-1em py-1em text-19 md:bg-transparent md:p-0">
                    <span className="font-bold md:hidden">Expertise: </span>
                    {item.researchAreas.join(", ")}
                  </div>
                )}
              </Td>
              <Td className="block w-auto text-center sm:text-left md:table-cell md:w-1/5 md:border-b md:border-black-40">
                {item.email && (
                  <>
                    <EnvelopeIcon
                      title="Email"
                      width={20}
                      className="mr-6 inline-block text-digital-blue"
                    />

                    <EmailLink
                      email={item.email}
                      className="break-words text-19 text-digital-blue underline transition-colors hover:bg-black-10 hover:text-brick-dark focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
                    />
                  </>
                )}
              </Td>
              <Td className="block w-auto text-center sm:text-left md:table-cell md:w-1/5 md:border-b md:border-black-40">
                {item.libCalId && (
                  <LibCal
                    libcalId={item.libCalId}
                    srText={item.title}
                  />
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  )
}
export default SulPeopleTableView
