"use client"

import {liteClient} from "algoliasearch/lite"
import type {LiteClient, SearchResponse, SearchResponses} from "algoliasearch/lite"
import {Configure, useInfiniteHits, useInstantSearch, useSearchBox} from "react-instantsearch"
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

type SearchMethodParams = Parameters<LiteClient["search"]>[0]
type SearchRequestOptions = NonNullable<Parameters<LiteClient["search"]>[1]>

const HITS_PER_PAGE = 12

// Only the attributes the hit component renders.
const ATTRIBUTES_TO_RETRIEVE = ["title", "url", "summary", "updated"]
const ATTRIBUTES_TO_SNIPPET = ["html:30"]
// Algolia's maximum for the `query` parameter.
const MAX_QUERY_BYTES = 512

// A minimal empty response. Every field but `hits` is optional on
// SearchResponse, but we fill in the common ones so widgets relying on them
// behave the same as a real "no results" response.
const emptyResponse = (query = ""): SearchResponse => ({
  hits: [],
  nbHits: 0,
  nbPages: 0,
  page: 0,
  hitsPerPage: 0,
  processingTimeMS: 0,
  exhaustiveNbHits: true,
  query,
  params: "",
})

// `__isArtificial` is instantsearch.js's flag for responses that did not come from Algolia.
type SsrFailedResponse = SearchResponse & {__ssrFailed: true; __isArtificial: true}

const getRequestQuery = (request: unknown): string | undefined => {
  if (!request || typeof request !== "object") return undefined
  const {query, params} = request as {query?: unknown; params?: unknown}
  if (typeof query === "string") return query
  if (typeof params === "string") return new URLSearchParams(params).get("query") ?? undefined
  if (params && typeof params === "object") {
    const nestedQuery = (params as {query?: unknown}).query
    if (typeof nestedQuery === "string") return nestedQuery
  }
  return undefined
}

// Truncate to at most `max` UTF-8 bytes without splitting a code point (surrogate pair).
const clampToBytes = (value: string, max: number): string => {
  const encoder = new TextEncoder()
  if (encoder.encode(value).length <= max) return value
  let bytes = 0
  let clamped = ""
  for (const char of value) {
    bytes += encoder.encode(char).length
    if (bytes > max) break
    clamped += char
  }
  return clamped
}

// Return a copy of the request with its query replaced, in whichever of the shapes
// getRequestQuery() the request uses.
const withRequestQuery = <T,>(request: T, query: string): T => {
  if (!request || typeof request !== "object") return request
  const {query: flatQuery, params} = request as {query?: unknown; params?: unknown}
  if (typeof flatQuery === "string") return {...request, query}
  if (typeof params === "string") {
    const searchParams = new URLSearchParams(params)
    searchParams.set("query", query)
    return {...request, params: searchParams.toString()}
  }
  if (params && typeof params === "object" && typeof (params as {query?: unknown}).query === "string") {
    return {...request, params: {...params, query}}
  }
  return request
}

const AlgoliaSearch = ({appId, indexName, apiKey}: Props) => {
  const pathname = usePathname()
  // A new client per render makes InstantSearch re-register every
  // widget on each render (the summer.stanford.edu render-loop/OOM bug).
  const searchClient = useMemo<LiteClient>(() => {
    const client = liteClient(appId, apiKey)
    // Patch `search` in place the way instantsearch's hydrateSearchClient does rather than
    // spreading the client into a new object.
    const originalSearch = client.search.bind(client)
    client.search = function search<T>(
      searchMethodParams: SearchMethodParams,
      requestOptions?: SearchRequestOptions
    ): Promise<SearchResponses<T>> {
      const requests = Array.isArray(searchMethodParams) ? searchMethodParams : searchMethodParams.requests

      // never hit Algolia for an empty query, e.g. the
      // bare /search page load before the visitor has typed anything.
      if (requests.every(request => !getRequestQuery(request)?.trim())) {
        return Promise.resolve({results: requests.map(() => emptyResponse())} as SearchResponses<T>)
      }

      // Clamp over-long queries to Algolia's 512-byte limit rather than letting it answer 400
      // The URL and the input keep the query as typed; only what is sent is shortened.
      const clampedRequests = requests.map(request => {
        const query = getRequestQuery(request)
        if (query === undefined) return request
        const clamped = clampToBytes(query, MAX_QUERY_BYTES)
        return clamped === query ? request : withRequestQuery(request, clamped)
      })
      const clampedParams = (
        Array.isArray(searchMethodParams) ? clampedRequests : {...searchMethodParams, requests: clampedRequests}
      ) as SearchMethodParams

      return originalSearch<T>(clampedParams, requestOptions).catch((error: unknown) => {
        if (typeof window !== "undefined") throw error

        // react-instantsearch-nextjs's InitializePromise.waitForResults() only
        // listens for a 'result' event; there's no 'error' path during SSR. Without this,
        // a bad key or network failure means the promise never settles, the Suspense
        // boundary never streams, and the request hangs until maxDuration.
        console.error("Algolia search failed during SSR:", error instanceof Error ? error.message : error)
        const results: SsrFailedResponse[] = requests.map(request => ({
          ...emptyResponse(getRequestQuery(request) ?? ""),
          __ssrFailed: true,
          __isArtificial: true,
        }))
        return {results} as SearchResponses<T>
      })
    }
    return client
  }, [appId, apiKey])

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
      <Configure
        hitsPerPage={HITS_PER_PAGE}
        attributesToRetrieve={ATTRIBUTES_TO_RETRIEVE}
        attributesToHighlight={[]}
        attributesToSnippet={ATTRIBUTES_TO_SNIPPET}
        snippetEllipsisText="…"
      />
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
  const {error, results, indexUiState, status, refresh} = useInstantSearch({catchError: true})
  const query = indexUiState.query ?? ""
  // We render the snippet as plain text, so leave Algolia's
  // default <em> tags in place and let the hit component strip them.
  const {items, showMore, isLastPage, sendEvent} = useInfiniteHits<AlgoliaHitRecord>({escapeHTML: false})

  // The server-side request failed. refresh() clears the cache and re-searches.
  const ssrFailed = Boolean((results as {__ssrFailed?: boolean} | undefined)?.__ssrFailed)
  useEffect(() => {
    if (ssrFailed) refresh()
  }, [ssrFailed, refresh])

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
  const unavailable = Boolean(error) || ssrFailed
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
                setFocusIndex(items.length)
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
