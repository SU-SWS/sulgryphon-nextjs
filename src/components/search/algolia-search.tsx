"use client"

import {liteClient} from "algoliasearch/lite"
import {useInfiniteHits, useInstantSearch, useSearchBox} from "react-instantsearch"
import {InstantSearchNext} from "react-instantsearch-nextjs"
import {usePathname} from "next/navigation"
import {useEffect, useMemo, useRef, useState} from "react"
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid"
import AlgoliaHit, {AlgoliaHitRecord} from "@/components/search/algolia-hit"

type Props = {
  appId: string
  indexName: string
  apiKey: string
}

const AlgoliaSearch = ({appId, indexName, apiKey}: Props) => {
  const pathname = usePathname()
  // Memoised so InstantSearch isn't handed a brand new client on every render.
  const searchClient = useMemo(() => liteClient(appId, apiKey), [appId, apiKey])

  return (
    <InstantSearchNext
      key={pathname}
      indexName={indexName}
      searchClient={searchClient}
      future={{preserveSharedStateOnUnmount: true}}
      insights
      routing={{
        router: {cleanUrlOnDispose: false},
        stateMapping: {
          stateToRoute(uiState): Record<string, string> {
            const query = uiState[indexName]?.query
            return query ? {q: query} : {}
          },
          routeToState(routeState: Record<string, string>) {
            // The history router parses repeated params (`?q=a&q=b`) into an array; only a
            // string works here.
            const q: unknown = routeState.q
            return {[indexName]: {query: typeof q === "string" ? q : undefined}}
          },
        },
      }}
    >
      <div className="rs-pb-8 2xl:w-2/3">
        <SearchBox />
        <Results />
      </div>
    </InstantSearchNext>
  )
}

const SearchBox = () => {
  const {query, refine} = useSearchBox()
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState(query)
  const [prevQuery, setPrevQuery] = useState(query)

  // Resync the controlled input when the query changes from outside a submit (e.g. browser
  // back/forward navigation updates the routing middleware's state but not this input).
  if (query !== prevQuery) {
    setPrevQuery(query)
    setInputValue(query)
  }

  return (
    <form
      className="relative flex flex-col gap-xs @xl:flex-row @xl:items-end @3xl:gap-xl"
      aria-label="Site Search"
      role="search"
      noValidate
      onSubmit={e => {
        e.preventDefault()
        inputRef.current?.blur()
        refine(inputValue.trim())
      }}
    >
      <div className="sr-only">
        <label>
          Email (Leave this field empty)
          <input name="search" />
        </label>
      </div>
      <div className="flex-grow">
        <label className="mb-8 text-28 font-semibold text-black" htmlFor="keyword-search">
          Search this site
        </label>
        <div className="relative flex max-w-600 items-center justify-center">
          <input
            id="keyword-search"
            name="q"
            type="search"
            ref={inputRef}
            className="input w-full rounded-full border border-cool-grey p-10"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            maxLength={512}
            autoComplete="off"
          />
          <button type="submit" className="absolute right-10">
            <span className="sr-only">Search</span>
            <MagnifyingGlassIcon width={25} className="text-cardinal-red" />
          </button>
        </div>
      </div>
      <div className="sr-only" aria-live="polite" aria-atomic>
        {query ? `Showing results for ${query}` : ""}
      </div>
    </form>
  )
}

const Results = () => {
  const {error, results, indexUiState, status} = useInstantSearch({catchError: true})
  const query = indexUiState.query ?? ""
  const {items, showMore, isLastPage, sendEvent} = useInfiniteHits<AlgoliaHitRecord>()

  // Load More: move focus to the first newly appended item once it renders (parity with
  // LoadMoreList on the database-backed search page).
  const [focusIndex, setFocusIndex] = useState<number | null>(null)
  const focusItemRef = useRef<HTMLLIElement>(null)
  useEffect(() => {
    if (focusIndex !== null && items.length > focusIndex) focusItemRef.current?.focus()
  }, [items.length, focusIndex])

  // A ranking tie can reorder records between the page-0 and page-1 requests,
  // so the same objectID may arrive twice; keep the first occurrence so React
  // keys stay unique.
  const seen = new Set<string>()
  const uniqueItems = items.filter(hit => !seen.has(hit.objectID) && seen.add(hit.objectID))

  const hasQuery = Boolean(query.trim())
  const pending = status === "loading" || status === "stalled"
  const unavailable = Boolean(error)
  // refine() updates the UI state synchronously, so until the response lands `results` still
  // describes the previous query
  const searching = pending || results?.query !== query
  const noResults =
    !searching && !unavailable && items.length === 0 && !!results && !results.__isArtificial && results.nbHits === 0

  // One persistent live region: screen readers announce changes to an existing region, not a
  // region that is mounted together with its text, so it is rendered even without a query.
  // "Searching…" comes before the count so a new query that yields the same number of results
  // still changes the text.
  let announcement = ""
  if (hasQuery) {
    if (unavailable) announcement = "Search is unavailable"
    else if (noResults) announcement = "No results found"
    else if (searching) announcement = "Searching…"
    else if (uniqueItems.length > 0) announcement = `Showing ${uniqueItems.length} results`
  }

  // The live region is always the first child so React never remounts it when the query changes
  // between empty and non-empty.
  return (
    <>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </span>

      {hasQuery && <h2 className="rs-pt-2 type-3 m-0 pb-36">Results</h2>}

      {hasQuery && unavailable && <p>Search is temporarily unavailable. Please try again in a few minutes.</p>}

      {hasQuery && noResults && <p>No results found for the given search keywords. Please try again.</p>}

      {hasQuery && uniqueItems.length > 0 && (
        <div className="space-y-24">
          <ul className="list-unstyled mb-20">
            {uniqueItems.map((hit, i) => (
              <li
                key={hit.objectID}
                ref={i === focusIndex ? focusItemRef : undefined}
                tabIndex={i === focusIndex ? -1 : undefined}
                className="border-b border-black-20 pb-10 pt-10 first:pt-0 last:pb-0 last-of-type:border-0"
              >
                <AlgoliaHit hit={hit} onSend={() => sendEvent("click", hit, "Result Clicked")} />
              </li>
            ))}
          </ul>
          {!isLastPage && (
            <button
              type="button"
              className="cta-button group rs-mt-neg1 mx-auto block w-fit rounded-full bg-digital-red px-26 pb-11 pt-10 text-16 font-semibold leading-display text-white no-underline transition-colors hover:bg-cardinal-red-dark focus:bg-black-true active:bg-black-true disabled:opacity-50 hocus:text-white hocus:underline md:text-18"
              disabled={pending}
              aria-disabled={pending}
              onClick={() => {
setFocusIndex(uniqueItems.length)
                showMore()
              }}
            >
              Load More
            </button>
          )}
        </div>
      )}
    </>
  )
}

export default AlgoliaSearch
