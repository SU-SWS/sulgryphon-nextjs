"use client";

import {DrupalNode} from "next-drupal";
import Conditional from "@/components/utils/conditional";
import {useSearchParams} from "next/navigation";
import Loading from "@/components/patterns/icons/loading";
import {getNodeMetadata} from "../[...slug]/metadata";
import Link from "next/link";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import useDataFetch from "@/lib/hooks/useDataFetch";

const SearchResults = () => {
  return (
    <CachedClientFetch>
      <SearchResultsList/>
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
          {data.slice(0, 20).map(node =>
            <li key={node.id}>
              <SearchResultItem node={node}/>
            </li>
          )}
        </ul>
      </Conditional>
    </div>
  )
}

const SearchResultItem = ({node}: { node: DrupalNode }) => {
  const metadata = getNodeMetadata(node)
  return (
    <>
      <Link href={node.path.alias}>
        <h2 className="su-text-m3">
          {node.title}
        </h2>
      </Link>
      {metadata?.description && <p>{metadata.description}</p>}
    </>
  )
}

export default SearchResults;