"use client";

import {useSearchParams} from "next/navigation";
import Loading from "@/components/patterns/icons/loading";
import Link from "@/components/patterns/elements/drupal-link";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import useDataFetch from "@/lib/hooks/useDataFetch";
import {Suspense} from "react";
import {Metadata} from "next";
import {StanfordNode} from "@/lib/drupal/drupal";

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
  const {isLoading, data} = useDataFetch<StanfordNode[]>(`/api/search?q=${searchString}`)

  if (isLoading) return <Loading/>

  return (
    <div aria-live="polite">
      {(!data || data.length === 0) &&
        <p>No results found for your search. Please try again.</p>
      }
      {(data && data.length > 0) &&
        <ul className="list-unstyled">
          {data.slice(0, 20).map((item, i) =>
            <li key={`search-result-${i}`} className="border-b border-black-20 last:border-0 pb-30 pt-30 first:pt-0">
              <SearchResultItem item={item}/>
            </li>
          )}
        </ul>
      }
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
      <Link href={item.other?.path as string ?? '#'} className="no-underline hocus:underline">
        <h2 className="text-m2">
          {title}
        </h2>
      </Link>
      {item?.description && <p>{item.description}</p>}

      {lastUpdated &&
      <div className="text-black-60 text-m0">
        Last Updated: {lastUpdated}
      </div>
      }
    </>
  )
}

export default SearchResults;