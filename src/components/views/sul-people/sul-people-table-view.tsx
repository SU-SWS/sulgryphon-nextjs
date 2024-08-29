"use client"

import Link from "next/link"
import Image from "next/image"
import LibCal from "./libcal"
import {XMarkIcon} from "@heroicons/react/20/solid"
import {EnvelopeIcon} from "@heroicons/react/24/outline"
import {Maybe, NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d"
import {Table, Thead, Tbody, Tr, Th, Td} from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import {HTMLAttributes, useId, useRef, useState} from "react"
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid"
import {CheckIcon} from "@heroicons/react/16/solid"
import {twMerge} from "tailwind-merge"
import {clsx} from "clsx"

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
  const HeadingElement = hasHeading ? "h2" : "h3"
  const id = useId()
  const keywordRef = useRef<HTMLInputElement>(null)

  const [typeFilter, setTypeFilter] = useState<string>("")
  const [keywordFilter, setKeywordFilter] = useState("")

  let displayedItems = items

  if (typeFilter) {
    displayedItems = items.filter(
      item => !!item.types?.map(type => type.toLowerCase()).filter(value => typeFilter === value).length
    )
  }

  if (keywordFilter) {
    displayedItems = displayedItems.filter(
      item =>
        item.title.toLowerCase().includes(keywordFilter.toLowerCase()) ||
        item.fullTitle?.toLowerCase().includes(keywordFilter.toLowerCase()) ||
        item.researchAreas?.join(" ").toLowerCase().includes(keywordFilter.toLowerCase())
    )
  }

  return (
    <div>
      <form
        className="mx-auto mb-32 flex w-fit flex-wrap justify-center gap-30 lg:flex-nowrap"
        onSubmit={e => e.preventDefault()}
      >
        <div className="relative w-full md:w-[435px]">
          <label className="pl-15 text-18 font-semibold leading-[23px]" htmlFor={id}>
            Search by name, title, or subject
          </label>

          <input
            className="block h-[40.69px] w-full rounded-full p-9 pl-15 text-18"
            ref={keywordRef}
            type="text"
            id={id}
          />

          {keywordFilter && (
            <button
              type="reset"
              className="absolute bottom-6 right-32 z-10"
              aria-label="Clear keyword search"
              onClick={() => {
                if (keywordRef.current) {
                  keywordRef.current.value = ""
                  keywordRef.current.focus()
                }
                setKeywordFilter("")
              }}
            >
              <XMarkIcon className="pr-5 text-black-50" width={30} />
            </button>
          )}

          <button
            type="submit"
            className="absolute bottom-6 right-10 z-10"
            onClick={() => setKeywordFilter(keywordRef.current?.value || "")}
          >
            <MagnifyingGlassIcon className="text-digital-red-dark" width={25} />
            <span className="sr-only">Search</span>
          </button>
        </div>
        <div className="w-full self-end md:w-[435px]">
          <fieldset className="mx-auto flex w-fit items-center rounded-full">
            <legend className="sr-only">Filter by speciality</legend>
            <ToggleOption checked={!typeFilter} onChange={() => setTypeFilter("")} first>
              All specialists
            </ToggleOption>
            <ToggleOption
              checked={typeFilter === "subject specialist"}
              onChange={() => setTypeFilter("subject specialist")}
              last
            >
              Subject specialists
            </ToggleOption>
          </fieldset>
        </div>
      </form>
      {!displayedItems.length && <p>No results matching your search terms were found.</p>}

      {!!displayedItems.length && (
        <Table className="responsive-table sul-people-table text-center md:text-left">
          <caption className="sr-only" aria-live="polite" aria-atomic>
            Showing {displayedItems.length} of {items.length}
          </caption>
          <Thead className="sr-only lg:not-sr-only lg:border-b lg:border-black-40">
            <Tr className="block sm:hidden lg:!table-row">
              <Th className="block min-w-[100px] pl-[0px] lg:table-cell" scope="col">
                <span className="sr-only">Photo</span>
              </Th>
              <Th className="block pl-[0px] text-24 lg:table-cell" scope="col">
                Name/Title
              </Th>
              <Th className="block pl-[0px] text-24 lg:table-cell" scope="col">
                Expertise
              </Th>
              <Th className="block pl-[0px] text-24 lg:table-cell" scope="col">
                Contact
              </Th>
              <Th className="block pl-[0px] text-24 lg:table-cell" scope="col">
                Schedule
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {displayedItems.map(item => (
              <Tr
                key={item.id}
                className="block pt-16 sm:flex-col sm:flex-wrap md:grid md:grid-cols-2 md:grid-rows-[repeat(5,minmax(0,auto))] md:justify-items-start md:gap-x-20 md:text-left md:first:pt-0 lg:!table-row lg:max-h-none"
              >
                <Td className="table-image m-auto flex min-h-fit w-auto place-content-center justify-center sm:border-b sm:border-black-40 sm:first:border-0 md:row-span-5 lg:table-cell lg:min-h-fit lg:w-[125px]">
                  {item.photoUrl && (
                    <Link
                      href={item.path}
                      className="relative mb-16 block aspect-[1/1] w-[200px] overflow-hidden rounded-full md:mb-32 lg:mb-0 lg:w-[68px]"
                      aria-hidden="true"
                      tabIndex={-1}
                    >
                      <Image
                        className="object-cover"
                        src={item.photoUrl}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 300px, 150px"
                      />
                    </Link>
                  )}
                </Td>
                <Th
                  scope="row"
                  className="block w-auto px-0 text-center sm:p-0 md:text-left lg:table-cell lg:w-1/4 lg:py-16 lg:pr-72"
                >
                  {item.title && (
                    <Link
                      href={item.path}
                      className="mb-16 inline-block text-digital-blue no-underline hover:bg-black-10 hover:text-brick-dark focus:bg-none focus:text-cardinal-red active:text-cardinal-red hocus:underline"
                    >
                      <HeadingElement className="mb-0 font-sans text-20 font-semibold" id={item.id}>
                        {item.title}
                      </HeadingElement>
                    </Link>
                  )}
                  {item.fullTitle && (
                    <div className="pb-16 text-16 font-normal leading-[23px] lg:pb-0">{item.fullTitle}</div>
                  )}
                </Th>
                <Td className="min-w-1/5 block w-auto px-0 py-16 text-center md:border-b md:border-black-40 md:px-9 md:py-16 md:text-left lg:table-cell lg:w-2/5 lg:pr-72">
                  {!!item.researchAreas?.length && (
                    <div className="mb-16 bg-black-10 px-1em py-1em text-16 leading-[23px] md:bg-transparent md:p-0 lg:mb-0">
                      <span className="font-bold md:hidden">Expertise: </span>
                      {item.researchAreas.join(", ")}
                    </div>
                  )}
                </Td>
                <Td className="block w-auto px-0 py-16 text-center md:border-b md:border-black-40 md:px-9 md:py-16 md:text-left lg:table-cell lg:w-1/5 lg:pr-72">
                  {item.email && (
                    <div className="pb-16 lg:pb-0">
                      <Link
                        href={`mailto:${item.email}`}
                        prefetch={false}
                        className="whitespace-nowrap text-16 font-normal leading-[23px] text-digital-blue underline transition-colors hover:bg-black-10 hover:text-brick-dark focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
                      >
                        <EnvelopeIcon title="Email" width={20} className="mr-6 inline-block" />
                        {item.email}
                      </Link>
                    </div>
                  )}
                </Td>
                <Td className="block w-auto px-0 py-16 text-center md:border-b md:border-black-40 md:px-9 md:py-16 md:text-left lg:table-cell lg:w-1/5">
                  {item.libCalId && (
                    <div className="pb-16 lg:pb-0">
                      <LibCal libcalId={item.libCalId} srText={item.title} />
                    </div>
                  )}
                  {/* Without this, the responsive table library injects a "&nbsp;". */}
                  {""}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </div>
  )
}

const ToggleOption = ({
  checked,
  onChange,
  first,
  last,
  children,
  ...props
}: HTMLAttributes<HTMLLabelElement> & {
  checked: boolean
  onChange: () => void
  first?: boolean
  last?: boolean
}) => {
  return (
    <label {...props} className="group cursor-pointer">
      <input type="radio" name="specialist" className="peer sr-only" checked={checked} onChange={onChange} />

      <span
        className={twMerge(
          "peer-focus:nounderline flex items-center whitespace-nowrap border border-black-80 p-4 pr-32 text-14 leading-[30px] no-underline hover:text-cardinal-red-dark hover:underline peer-checked:bg-[#979694] peer-checked:bg-opacity-20 peer-checked:pl-16 peer-checked:transition-all peer-checked:ease-in-out peer-focus:border-2 peer-focus:border-black-80 peer-focus:bg-[#979694] peer-focus:bg-opacity-10 peer-focus:text-black-80 peer-focus:underline md:text-16 peer-checked:[&_svg]:text-black",
          clsx({
            "rounded-l-full": first,
            "rounded-r-full": last,
            "border-r-0": !last,
          })
        )}
      >
        <CheckIcon width={20} className="text-transparent" />
        {children}
      </span>
    </label>
  )
}

export default SulPeopleTableView
