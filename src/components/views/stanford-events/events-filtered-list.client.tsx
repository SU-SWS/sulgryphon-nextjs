"use client"
import {LoadMoreListProps} from "@/components/patterns/load-more-list"
import {useLayoutEffect, useRef, useId, useState, JSX, FormEvent} from "react"
import {useBoolean, useCounter} from "usehooks-ts"
import useServerAction from "@/lib/hooks/useServerAction"
import useFocusOnRender from "@/lib/hooks/useFocusOnRender"
import {MagnifyingGlassIcon, XMarkIcon, ArrowPathIcon} from "@heroicons/react/20/solid"
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
  const [items, setItems] = useState<JSX.Element[]>(children)
  const {value: focusOnElement, setTrue: enableFocusElement, setFalse: disableFocusElement} = useBoolean(false)
  const [runLoadPage, isPending] = useServerAction(loadPage)

  const keywordRef = useRef<HTMLInputElement>(null)
  const focusItemRef = useRef<HTMLLIElement>(null)

  const showMoreItems = () => {
    if (loadPage) {
      runLoadPage(page + 1, {
        search: searchKeyword,
        eventType: eventType || undefined,
      })
        .then(results => {
          const resultChildren = results?.props.children
          setItems([...items, ...resultChildren])
          enableFocusElement()
          incrementPage()
        })
        .catch(_e => console.warn("An error happened loading more items"))
    }
  }

  const setFocusOnItem = useFocusOnRender(focusItemRef, false)

  useLayoutEffect(() => {
    if (focusOnElement) setFocusOnItem()
  }, [focusOnElement, setFocusOnItem])

  const applyFilters = () => {
    const keyword = keywordRef.current?.value || ""

    if (loadPage) {
      runLoadPage(0, {
        search: keyword,
        eventType: eventType || undefined,
      })
        .then(results => {
          const resultChildren = results?.props.children
          setFilteredTotalItems(results?.props.totalItems)
          setItems([...resultChildren])
          resetPage()
          setSearchKeyword(keyword)
          enableFocusElement()
        })
        .catch(_e => console.warn("An error happened applying filters"))
    }
  }

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault()
    applyFilters()
  }

  const handleTypeToggle = (newType: "" | "workshop") => {
    setEventType(newType)
    // Apply filters immediately when type changes
    setTimeout(() => {
      const keyword = keywordRef.current?.value || ""
      if (loadPage) {
        runLoadPage(0, {
          search: keyword,
          eventType: newType || undefined,
        })
          .then(results => {
            const resultChildren = results?.props.children
            setFilteredTotalItems(results?.props.totalItems)
            setItems([...resultChildren])
            resetPage()
            setSearchKeyword(keyword)
            enableFocusElement()
          })
          .catch(_e => console.warn("An error happened filtering by type"))
      }
    }, 0)
  }

  const clearSearch = () => {
    if (keywordRef.current) {
      keywordRef.current.value = ""
      keywordRef.current.focus()
    }
    setSearchKeyword("")
    applyFilters()
  }

  return (
    <div {...props} className={twMerge("relative", props.className)}>
      {isPending && (
        <div className="absolute left-0 top-0 z-20 h-full w-full bg-black-30 bg-opacity-80">
          <div className="absolute bottom-20 left-1/2 -translate-x-[25px]">
            <ArrowPathIcon className="animate-spin" width={50} />
          </div>
        </div>
      )}

      <form
        className="mx-auto mb-32 flex w-fit flex-wrap justify-center gap-30 lg:flex-nowrap"
        onSubmit={handleSearchSubmit}
      >
        <div className="relative w-full md:w-[435px]">
          <label className="pl-15 text-18 font-semibold leading-display" htmlFor={id}>
            Search by name, title, or subject
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
            <ToggleOption checked={eventType === ""} onChange={() => handleTypeToggle("")} first name="events-all">
              All Events
            </ToggleOption>
            <ToggleOption
              checked={eventType === "workshop"}
              onChange={() => handleTypeToggle("workshop")}
              last
              name="events-workshop"
            >
              Workshops
            </ToggleOption>
          </fieldset>
        </div>
      </form>

      <div className="flex-grow">
        <ul {...ulProps}>
          {items.map((item, i) => (
            <li
              key={`${id}--${i}`}
              ref={i === children.length * page ? focusItemRef : null}
              tabIndex={i === children.length * page && focusOnElement ? 0 : undefined}
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
