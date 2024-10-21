"use client"

import LoadMoreList from "@/components/patterns/load-more-list"
import {HTMLAttributes, JSX, useCallback, useId, useRef, useState} from "react"
import {useCounter} from "usehooks-ts"
import useServerAction from "@/lib/hooks/useServerAction"
import ToggleOption from "@/components/patterns/toggle-option"
import SelectList from "@/components/patterns/elements/select-list"
import {ArrowPathIcon, XMarkIcon} from "@heroicons/react/20/solid"
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid"
import {SelectOptionDefinition, SelectValue} from "@mui/base/useSelect"

type Props = HTMLAttributes<HTMLDivElement> & {
  /**
   * Total number of items to build the pager.
   */
  totalItems: number
  /**
   * Server action to load a page.
   */
  loadPage?: (_page: number, _filters?: Record<string, any>) => Promise<JSX.Element>

  typeOptions: SelectOptionDefinition<string>[]
}

const FilteringNewsCardViewClient = ({children, totalItems, loadPage, typeOptions = []}: Props) => {
  const titleFilterRef = useRef<HTMLInputElement>(null)
  const id = useId()
  const {count: totalResults, setCount: setTotalResults} = useCounter(totalItems)
  const [items, setItems] = useState<JSX.Element[]>(Array.isArray(children) ? children : [children])
  const [dateFilter, setDateFilter] = useState<string>()
  const [titleFilter, setTitleFilter] = useState<string>("")
  const [typeFilter, setTypeFilter] = useState<string>()

  const onActionFinished = useCallback(
    (response: JSX.Element | undefined) => {
      if (response) {
        setItems(response.props.children)
        setTotalResults(response.props.totalItems)
      }
    },
    [setTotalResults, setItems]
  )

  const [runAction, isPending] = useServerAction<[number, Record<string, any>], JSX.Element>(loadPage, onActionFinished)

  const onDateChange = (date?: string) => {
    runAction(0, {date, title: titleFilterRef.current?.value, type: typeFilter}).then(() => setDateFilter(date))
  }

  const onFilterTitle = () => {
    runAction(0, {
      title: titleFilterRef.current?.value,
      date: dateFilter,
      type: typeFilter,
    }).then(() => setTitleFilter(titleFilterRef.current?.value || ""))
  }

  const onTypeChange = (typeValue: string) => {
    runAction(0, {
      title: titleFilterRef.current?.value,
      date: dateFilter,
      type: typeValue === "all" ? undefined : typeValue,
    }).then(() => setTypeFilter(typeValue === "all" ? undefined : typeValue))
  }

  return (
    <div>
      {isPending && (
        <div className="absolute left-0 top-0 z-10 h-full w-full rounded-2xl bg-black-20 bg-opacity-30">
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
            <ArrowPathIcon className="animate-spin" width={50} />
          </div>
        </div>
      )}
      <form onSubmit={e => e.preventDefault()}>
        <div className="relative w-full md:w-[435px]">
          <label className="pl-15 text-18 font-semibold leading-[23px]" htmlFor={id}>
            Search by title
          </label>

          <input
            className="block h-[40.69px] w-full rounded-full p-9 pl-15 text-18"
            ref={titleFilterRef}
            type="text"
            id={id}
          />

          {titleFilter && (
            <button
              type="reset"
              className="absolute bottom-6 right-32 z-10"
              aria-label="Clear keyword search"
              onClick={() => {
                if (titleFilterRef.current) {
                  titleFilterRef.current.value = ""
                  titleFilterRef.current.focus()
                }
                setTitleFilter("")
              }}
            >
              <XMarkIcon className="pr-5 text-black-50" width={30} />
            </button>
          )}

          <button type="submit" className="absolute bottom-6 right-10 z-10" onClick={onFilterTitle}>
            <MagnifyingGlassIcon className="text-digital-red-dark" width={25} />
            <span className="sr-only">Search</span>
          </button>
        </div>

        <fieldset className="rs-mb-1 mx-auto flex h-25 w-fit items-center rounded-full">
          <legend className="sr-only">Filter by speciality</legend>
          <ToggleOption
            name="now - 30 days"
            checked={dateFilter === "now - 30 days"}
            onChange={() => onDateChange("now - 30 days")}
            first
          >
            Last 30 days
          </ToggleOption>
          <ToggleOption
            name="now - 12 years"
            checked={dateFilter === "now - 12 months"}
            onChange={() => onDateChange("now - 12 months")}
          >
            Last 12 months
          </ToggleOption>
          <ToggleOption name="all" checked={!dateFilter} onChange={() => onDateChange(undefined)} last>
            All News
          </ToggleOption>
        </fieldset>

        <div>
          <label id={`${id}-type`}>Type</label>
          <SelectList
            options={[{value: "all", label: "All"}, ...typeOptions]}
            ariaLabelledby={`${id}-type`}
            defaultValue="all"
            onChange={(_e, value) => onTypeChange(value as string)}
          />
        </div>
      </form>
      {items.length === 0 && <p>No news items match your queries. Please try a new search.</p>}
      {items.length > 0 && (
        <LoadMoreList
          key={`${dateFilter}-${typeFilter}-${titleFilter}`}
          className="@container"
          ulProps={{className: "list-unstyled grid gap-[90px] @4xl:grid-cols-2 @7xl:grid-cols-3 mb-50"}}
          liProps={{className: "w-full max-w-[500px] mx-auto"}}
          loadPage={loadPage}
          totalItems={totalResults}
        >
          {items}
        </LoadMoreList>
      )}
    </div>
  )
}
export default FilteringNewsCardViewClient
