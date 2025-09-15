"use client"
import {LoadMoreListProps} from "@/components/patterns/load-more-list"
import {useLayoutEffect, useRef, useId, useState, JSX, FormEvent} from "react"
import {useBoolean, useCounter} from "usehooks-ts"
import useServerAction from "@/lib/hooks/useServerAction"
import useFocusOnRender from "@/lib/hooks/useFocusOnRender"
import {MagnifyingGlassIcon, XMarkIcon} from "@heroicons/react/20/solid"
import {twMerge} from "tailwind-merge"
import ToggleOption from "@/components/patterns/toggle-option"

type EventFilters = {
  search?: string
  eventType?: string
}

type Props = Omit<LoadMoreListProps, "loadPage"> & {
  loadPage?: (page: number, filters?: EventFilters) => Promise<JSX.Element>
}

const EventsFilteredListClient = ({buttonText, children, ulProps, liProps, totalItems, loadPage, ...props}: Props) => {
  const {count: filteredTotalItems, setCount: setFilteredTotalItems} = useCounter(totalItems)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [eventType, setEventType] = useState<"" | "workshop">("")
  const id = useId()
  const {count: page, increment: incrementPage, reset: resetPage} = useCounter(0)

  const initialItems = Array.isArray(children) ? children : [children].filter(Boolean)
  const [items, setItems] = useState<JSX.Element[]>(initialItems)

  const {value: focusOnElement, setTrue: enableFocusElement, setFalse: disableFocusElement} = useBoolean(false)
  const [runLoadPage] = useServerAction(loadPage)

  const keywordRef = useRef<HTMLInputElement>(null)
  const focusItemRef = useRef<HTMLLIElement>(null)

  const showMoreItems = () => {
    if (loadPage) {
      runLoadPage(page + 1, {
        search: searchKeyword,
        eventType: eventType || undefined,
      })
        .then(results => {
          const resultChildren = Array.isArray(results?.props.children)
            ? results.props.children
            : [results?.props.children].filter(Boolean)
          setItems([...items, ...resultChildren])
          enableFocusElement()
          incrementPage()
        })
        .catch(error => {
          console.warn("An error happened loading more items", error)
        })
    }
  }

  const setFocusOnItem = useFocusOnRender(focusItemRef, false)

  useLayoutEffect(() => {
    if (focusOnElement) setFocusOnItem()
  }, [focusOnElement, setFocusOnItem])

  const applyFilters = (searchValue?: string, typeValue?: "" | "workshop") => {
    const keyword = searchValue ?? ""
    const type = typeValue ?? eventType

    if (loadPage) {
      runLoadPage(0, {
        search: keyword || undefined,
        eventType: type || undefined,
      })
        .then(results => {
          const resultChildren = Array.isArray(results?.props.children)
            ? results.props.children
            : [results?.props.children].filter(Boolean)
          setFilteredTotalItems(results?.props.totalItems || 0)
          setItems([...resultChildren])
          resetPage()
          setSearchKeyword(keyword)
          enableFocusElement()
        })
        .catch(error => {
          console.warn("An error happened applying filters", error)
        })
    }
  }

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault()
    applyFilters(keywordRef.current?.value)
  }

  const handleTypeToggle = (newType: "" | "workshop") => {
    setEventType(newType)
    applyFilters(keywordRef.current?.value, newType)
  }

  const clearSearch = () => {
    if (keywordRef.current) {
      keywordRef.current.value = ""
      keywordRef.current.focus()
    }
    setSearchKeyword("")
    applyFilters("")
  }

  return (
    <div {...props} className={twMerge("relative", props.className)}>
      <form
        className="mx-auto mb-32 flex w-fit flex-wrap justify-center gap-16 md:mb-60 md:flex-nowrap md:gap-30"
        onSubmit={handleSearchSubmit}
      >
        <div className="relative w-full md:w-[435px]">
          <label className="pl-15 text-18 font-semibold leading-display" htmlFor={id}>
            Search by event title
          </label>

          <input
            className="peer block h-[40.69px] w-full rounded-full p-9 pl-15 text-18"
            ref={keywordRef}
            type="text"
            id={id}
            placeholder=""
          />

          <button
            type="button"
            className="absolute bottom-6 right-32 z-10 peer-placeholder-shown:hidden"
            aria-label="Clear keyword search"
            onClick={clearSearch}
          >
            <XMarkIcon className="pr-5 text-black-50" width={30} />
          </button>

          <button type="submit" className="absolute bottom-6 right-10 z-10">
            <MagnifyingGlassIcon className="text-digital-red-dark" width={25} />
            <span className="sr-only">Search</span>
          </button>
        </div>

        <div className="w-full self-end md:w-[435px]">
          <fieldset className="mx-auto flex w-fit items-center rounded-full">
            <legend className="sr-only">Filter by event type</legend>
            <ToggleOption
              checked={eventType === "workshop"}
              onChange={() => handleTypeToggle("workshop")}
              first
              name="events-workshops"
            >
              Workshops
            </ToggleOption>
            <ToggleOption checked={eventType === ""} onChange={() => handleTypeToggle("")} last name="events-all">
              All Events
            </ToggleOption>
          </fieldset>
        </div>
      </form>

      <div className="flex-grow">
        <ul {...ulProps}>
          {items.map((item, i) => (
            <li
              key={`${id}--${i}`}
              ref={i === initialItems.length * page ? focusItemRef : null}
              tabIndex={i === initialItems.length * page && focusOnElement ? 0 : undefined}
              onBlur={disableFocusElement}
              {...liProps}
            >
              {item}
            </li>
          ))}
        </ul>

        <span className="sr-only" aria-live="polite" aria-atomic="true">
          Showing {items.length} of {filteredTotalItems} events.
        </span>

        {items.length < filteredTotalItems && loadPage && (
          <button onClick={showMoreItems}>{buttonText || "Load More Events"}</button>
        )}
      </div>
    </div>
  )
}

export default EventsFilteredListClient
