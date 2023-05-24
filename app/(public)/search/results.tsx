"use client";

import Conditional from "@/components/utils/conditional";
import {useSearchParams} from "next/navigation";
import Loading from "@/components/patterns/icons/loading";
import Link from "next/link";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import useDataFetch from "@/lib/hooks/useDataFetch";
import {Suspense} from "react";
import {Metadata} from "next";

const SearchResults = () => {
  return (
    <CachedClientFetch>
      <Suspense fallback={<></>}>
        <SearchResultsList/>
      </Suspense>
    </CachedClientFetch>
  )
}

const SearchResultsList = () => {
  const params = useSearchParams();
  const searchString = params ? params.get('q') as string : '';
  const {isLoading, data} = useDataFetch(`/api/search?q=${searchString}`)

  if (isLoading) {
    return <Loading/>
  }

  return (
    <div aria-live="polite">
      <Conditional showWhen={data.length === 0}>
        <p>No results found for your search. Please try again.</p>
      </Conditional>
      <Conditional showWhen={data.length > 0}>
        <ul className="su-list-unstyled">
          {data.slice(0, 20).map((item, i) =>
            <li key={`search-result-${i}`} className="su-border-b su-border-black-20 last:su-border-0 su-pb-30 su-pt-30 first:su-pt-0">
              <SearchResultItem item={item}/>
            </li>
          )}
        </ul>
      </Conditional>
    </div>
  )
}

const SearchResultItem = ({item}: { item: Metadata }) => {
  const lastUpdated = item.other?.changed ? new Date(item.other?.changed as string).toLocaleDateString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }) : null;

  const title = (item.title as string)?.replace(' | ' + process.env.NEXT_PUBLIC_SITE_NAME, '');
  return (
    <>
      <Link href={item.other?.path as string ?? '#'} className="su-no-underline hocus:su-underline">
        <h2 className="su-text-m2">
          {title}
        </h2>
      </Link>
      {item?.description && <p>{item.description}</p>}

      {lastUpdated &&
      <div className="su-text-black-60 su-text-m0">
        Last Updated: {lastUpdated}
      </div>
      }
    </>
  )
}

export default SearchResults;