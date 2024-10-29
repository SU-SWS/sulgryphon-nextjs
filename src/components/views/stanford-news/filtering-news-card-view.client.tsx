"use client"

import LoadMoreList from "@/components/patterns/load-more-list"
import {HTMLAttributes, JSX, useCallback, useId, useRef, useState} from "react"
import {useCounter} from "usehooks-ts"
import useServerAction from "@/lib/hooks/useServerAction"
import ToggleOption from "@/components/patterns/toggle-option"
import SelectList from "@/components/patterns/elements/select-list"
import {ArrowPathIcon, XMarkIcon, MagnifyingGlassIcon} from "@heroicons/react/20/solid"
import {SelectOptionDefinition} from "@mui/base/useSelect"

type Props = HTMLAttributes<HTMLDivElement> & {
  /**
   * Total number of items to build the pager.
   */
  totalItems: number
  /**
   * Server action to load a page.
   */
  loadPage?: (
    _page: number,
    _filters?: Record<string, string | number | Array<string | number> | undefined>
  ) => Promise<JSX.Element>

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

  const [runAction, isPending] = useServerAction<
    [number, Record<string, string | number | Array<string | number> | undefined>],
    JSX.Element
  >(loadPage, onActionFinished)

  const onDateChange = (date?: string) => {
    runAction(0, {
      date,
      title: titleFilterRef.current?.value,
      type: typeFilter,
    })
      .then(() => setDateFilter(date))
      .catch(_e => console.warn("Failed to filter news list"))
  }

  const onFilterTitle = () => {
    runAction(0, {
      title: titleFilterRef.current?.value,
      date: dateFilter,
      type: typeFilter,
    })
      .then(() => setTitleFilter(titleFilterRef.current?.value || ""))
      .catch(_e => console.warn("Failed to filter news list"))
  }

  const onTypeChange = (typeValue: string) => {
    runAction(0, {
      title: titleFilterRef.current?.value,
      date: dateFilter,
      type: typeValue === "all" ? undefined : typeValue,
    })
      .then(() => setTypeFilter(typeValue === "all" ? undefined : typeValue))
      .catch(_e => console.warn("Failed to filter news list"))
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
        <fieldset className="text-18">
          <legend className="sr-only">Filter news</legend>
          <div className="mb-50 flex w-full flex-col flex-wrap items-end justify-center gap-15 *:w-full *:min-w-[250px] sm:flex-row sm:*:w-fit">
            <div className="relative w-full md:w-[435px]">
              <label className="pl-15 text-18 font-semibold leading-[23px]" htmlFor={id}>
                Search by title
              </label>

              <div className="relative h-40 w-full">
                <input
                  className="g-full block h-full w-full rounded-full p-9 pl-15 text-18"
                  ref={titleFilterRef}
                  type="text"
                  id={id}
                />

                {titleFilter && (
                  <button
                    type="reset"
                    className="absolute right-0 top-0 z-10 mr-32 flex h-full items-center"
                    aria-label="Clear keyword search"
                    onClick={() => {
                      if (titleFilterRef.current) {
                        titleFilterRef.current.value = ""
                        titleFilterRef.current.focus()
                      }
                    }}
                  >
                    <XMarkIcon className="pr-5 text-black-50" width={30} />
                  </button>
                )}

                <button
                  type="submit"
                  className="absolute right-0 top-0 z-10 mr-10 flex h-full items-center"
                  onClick={onFilterTitle}
                >
                  <MagnifyingGlassIcon className="text-digital-red-dark" width={25} />
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>

            <fieldset className="flex h-fit w-full items-center md:mb-0">
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
                name="now - 90 days"
                checked={dateFilter === "now - 90 days"}
                onChange={() => onDateChange("now - 90 days")}
              >
                Last 90 days
              </ToggleOption>
              <ToggleOption name="all" checked={!dateFilter} onChange={() => onDateChange(undefined)} last>
                All News
              </ToggleOption>
            </fieldset>

            <SelectList
              label="Type of news"
              options={typeOptions}
              emptyLabel="All"
              ariaLabelledby={`${id}-type`}
              onChange={(_e, value) => onTypeChange(value as string)}
            />
          </div>
        </fieldset>
      </form>
      {items.length === 0 && <p>No news items match your queries. Please try a new search.</p>}
      {items.length > 0 && (
        <LoadMoreList
          key={`${dateFilter}-${typeFilter}-${titleFilter}`}
          className="@container"
          ulProps={{className: "list-unstyled grid gap-50 @4xl:grid-cols-2 @7xl:grid-cols-3 mb-50"}}
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
