import SiteSearch from "@/components/search/search-page"
import AlgoliaSearch from "@/components/search/algolia-search"
import {getAlgoliaCredential} from "@/lib/algolia"
import {redirect} from "next/navigation"
import {Suspense} from "react"
import {Metadata} from "next"

// Search reads the query string, so it renders per request. Invalid query strings are redirected in
// proxy.ts, where the redirect keeps its status code; the checks below are a second line of defense.
export const instant = false
// https://vercel.com/docs/functions/runtimes#max-duration
export const maxDuration = 60

export const metadata: Metadata = {
  title: "Search",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
}

/**
 * Server-rendered stand-in for the search form while the Algolia SSR request is in flight, so a
 * slow or unreachable Algolia does not leave the page with only the banner and shift the layout
 * when the form streams in.
 */
const AlgoliaSearchFallback = () => (
  <div className="rs-pb-8 2xl:w-2/3">
    <div className="grow">
      <label className="mb-8 text-28 font-semibold text-black" htmlFor="keyword-search-fallback">
        Search this site
      </label>
      <div className="relative flex max-w-600 items-center justify-center">
        <input
          id="keyword-search-fallback"
          type="search"
          className="input w-full rounded-full border border-cool-grey p-10"
          disabled
          aria-disabled
        />
      </div>
    </div>
  </div>
)

// A repeated parameter (`?q=a&q=b`) arrives as an array, so the value type is wider than string.
const Page = async (props: {searchParams?: Promise<Record<string, string | string[] | undefined>>}) => {
  const searchParams = await props.searchParams
  const searchTerms = typeof searchParams?.q === "string" ? searchParams.q : ""

  if (searchParams) {
    // Honeypot check.
    if (searchParams?.search) redirect("/search")
    // Repeated `q`: not a usable query, and an array would break the Algolia search state.
    if (searchParams.q !== undefined && typeof searchParams.q !== "string") redirect("/search")
    // Bot actor adding unwanted parameters.
    delete searchParams.search
    delete searchParams.q
    if (Object.keys(searchParams).length > 0) redirect("/search")
  }

  const algolia = await getAlgoliaCredential()

  return (
    <div className="mt-32 centered">
      <div className="mx-auto 3xl:w-10/12">
        {algolia ? (
          <>
            <Suspense fallback={<AlgoliaSearchFallback />}>
              <AlgoliaSearch appId={algolia.appId} indexName={algolia.indexName} apiKey={algolia.apiKey} />
            </Suspense>
            <noscript>JavaScript is required to load more results.</noscript>
          </>
        ) : (
          <SiteSearch searchKey={searchTerms} />
        )}
      </div>
    </div>
  )
}

export default Page
