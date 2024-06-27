"use client"

import Link from "next/link"
import Image from "next/image"
import LibCal from "./libcal"
import {EnvelopeIcon} from "@heroicons/react/20/solid"
import EmailLink from "@/components/patterns/elements/email-link"
import {Maybe, NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d"
import {Table, Thead, Tbody, Tr, Th, Td} from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import {useId, useRef, useState} from "react"
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid"

export type TablePerson = {
  id: NodeStanfordPerson["id"]
  title: NodeStanfordPerson["title"]
  path: NodeStanfordPerson["path"]
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
  const id = useId()
  const keywordRef = useRef<HTMLInputElement>(null)

  const [typeFilter, setTypeFilter] = useState<string[]>([])
  const [keywordFilter, setKeywordFilter] = useState("")

  let displayedItems = items

  if (typeFilter.length >= 1) {
    displayedItems = items.filter(item => !!item.types?.map(type => type.toLowerCase()).filter(value => typeFilter.includes(value)).length)
  }

  const updateTypeFilter = (type?: string) => {
    if (!type) {
      return setTypeFilter([])
    }
    setTypeFilter(prevState => {
      const newState = [...prevState]
      const existingIndex = newState.indexOf(type)
      if (existingIndex >= 0) {
        newState.splice(existingIndex, 1)
      } else {
        newState.push(type)
      }
      return newState
    })
  }

  if (keywordFilter) {
    displayedItems = displayedItems.filter(item => item.title.toLowerCase().includes(keywordFilter.toLowerCase()) || item.fullTitle?.toLowerCase().includes(keywordFilter.toLowerCase()) || item.researchAreas?.join(" ").toLowerCase().includes(keywordFilter.toLowerCase()))
  }

  return (
    <div>
      <form
        className="mx-auto mb-32 flex w-fit gap-30"
        onSubmit={e => e.preventDefault()}
      >
        <div className="relative w-fit">
          <label htmlFor={id}>Search by name, title, or subject</label>

          <input
            className="block h-40 w-full rounded-full"
            ref={keywordRef}
            type="text"
            id={id}
          />

          <button
            type="submit"
            className="absolute bottom-4 right-10 z-10"
            onClick={() => setKeywordFilter(keywordRef.current?.value || "")}
          >
            <MagnifyingGlassIcon width={30} />
            <span className="sr-only">Search</span>
          </button>
        </div>
        <div>
          <fieldset className="mx-auto flex w-fit items-center rounded-full border border-cardinal-red">
            <legend className="sr-only">Filter by speciality</legend>
            <label className="group hidden cursor-pointer border-r border-cardinal-red md:block">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={!typeFilter.length}
                onChange={() => updateTypeFilter()}
              />
              <span className="block rounded-l-full border-2 border-transparent p-10 underline group-hover:no-underline peer-checked:border-cardinal-red peer-checked:bg-red-200 peer-focus:no-underline peer-focus:outline-2 peer-focus:outline-blue-500">All specialists</span>
            </label>
            <label className="group cursor-pointer">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={typeFilter.includes("subject specialist")}
                onChange={() => updateTypeFilter("subject specialist")}
              />
              <span className="block rounded-l-full border-2 border-transparent p-10 underline group-hover:no-underline peer-checked:border-cardinal-red peer-checked:bg-red-200 peer-focus:no-underline peer-focus:outline-2 peer-focus:outline-blue-500 md:rounded-l-none">All specialists</span>
            </label>
            <label className="group cursor-pointer border-l border-cardinal-red">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={typeFilter.includes("technical specialist")}
                onChange={() => updateTypeFilter("technical specialist")}
              />
              <span className="block rounded-r-full border-2 border-transparent p-10 underline group-hover:no-underline peer-checked:border-cardinal-red peer-checked:bg-red-200 peer-focus:no-underline peer-focus:outline-2 peer-focus:outline-blue-500">Technical specialists</span>
            </label>
          </fieldset>
        </div>
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
              className="block min-w-[100px] pl-[0px] md:table-cell"
              scope="col"
            >
              <span className="sr-only">Photo</span>
            </Th>
            <Th
              className="block pl-[0px] text-24 md:table-cell"
              scope="col"
            >
              Name/Title
            </Th>
            <Th
              className="block pl-[0px] text-24 md:table-cell"
              scope="col"
            >
              Expertise
            </Th>
            <Th
              className="block pl-[0px] text-24 md:table-cell"
              scope="col"
            >
              Contact
            </Th>
            <Th
              className="block pl-[0px] text-24 md:table-cell"
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
                    className="text-20"
                    id={item.id}
                  >
                    {item.title}
                  </HeadingElement>
                </Link>
                {item.fullTitle && <div className="text-16">{item.fullTitle}</div>}
              </Td>
              <Td className="min-w-1/5 block w-auto text-center sm:text-left md:table-cell md:w-2/5 md:border-b md:border-black-40">
                {!!item.researchAreas?.length && (
                  <div className="bg-black-10 px-1em py-1em text-16 md:bg-transparent md:p-0">
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
                      className="break-words text-16 text-digital-blue underline transition-colors hover:bg-black-10 hover:text-brick-dark focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
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
