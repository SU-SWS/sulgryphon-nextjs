import SiteSearch from "@/components/search/search-page"
import AlgoliaSearch from "@/components/search/algolia-search"
import {getAlgoliaCredential} from "@/lib/algolia"
import {Suspense} from "react"
import {Metadata} from "next"

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

type SearchParams = Promise<Record<string, string | string[] | undefined>>

// Invalid query strings (honeypot, repeated or overlong `q`, extra parameters) are redirected in proxy.ts,
// before rendering. The page itself doesn't read the query string, so with Algolia it is fully static:
// the search runs in the browser.
const Page = async (props: {searchParams?: SearchParams}) => {
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
          // Without Algolia, Drupal's search view needs the query on the server, so only this part is dynamic.
          <Suspense>
            <DrupalSearch searchParams={props.searchParams} />
          </Suspense>
        )}
      </div>
    </div>
  )
}

const DrupalSearch = async ({searchParams}: {searchParams?: SearchParams}) => {
  // A repeated parameter (`?q=a&q=b`) arrives as an array; only a string is a usable query.
  const q = (await searchParams)?.q
  return <SiteSearch searchKey={typeof q === "string" ? q : ""} />
}

export default Page
