"use client";

import {FormEvent, useEffect, useRef, useState} from "react";
import {useSearchParams} from "next/navigation";
import {ArrowPathIcon} from "@heroicons/react/20/solid";
import Link from "@/components/patterns/elements/drupal-link";

export type SearchResult = {
  id: string
  title: string
  path: string
  changed: string
  description?: string
}

const Search = ({search}: { search: (_search: string) => Promise<SearchResult[]> }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const params = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([])
  const [searchString, setSearchString] = useState<string>(params?.get('q') || '')
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    search(params?.get('q') || '').then(nodes => setResults(nodes));
  }, [params, search])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true)

    const searchString = inputRef.current?.value || '';
    search(searchString).then(results => {
      setResults(results);
      setSearchString(searchString);
      setIsLoading(false)
    });
  }

  return (
    <div>
      <form className="relative flex flex-col @xl:flex-row @xl:items-end gap-xs @3xl:gap-xl" onSubmit={onSubmit}>
        <div className="flex-grow">
          <label className="text-white mb-2" htmlFor="keyword-search">Keyword Search</label>
          <input ref={inputRef} id="keyword-search" className="input border border-cool-grey w-full rounded p-10"/>
        </div>
        <button
          type="submit"
          className="rounded-full p-15 bg-digital-red hover:bg-cardinal-red-dark transition text-white hocus:underline"
        >
          Search
        </button>
      </form>

      <div className="sr-only" aria-live="polite">
        Showing {results.length} {!searchString ? 'suggestions.' : `results for ${searchString}.`}
      </div>

      {isLoading &&
        <div className="fixed top-0 left-0 bg-black w-screen h-screen opacity-30">
          <ArrowPathIcon width={50} className="animate-spin fixed top-1/2 left-1/2 text-white"/>
        </div>
      }

      {results.length === 0 && <div>No results found for your search. Please try another keyword.</div>}

      {results.length > 0 &&
        <ul className="list-unstyled">
          {results.map(result =>
            <li key={result.id} className="border-b border-black-20 last:border-0 py-20">
              <SearchResultItem item={result}/>
            </li>
          )}
        </ul>
      }
    </div>
  )
}

const SearchResultItem = ({item}: { item: SearchResult }) => {
  const lastUpdated = new Date(item.changed as string).toLocaleDateString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  return (
    <>
      <Link href={item.path as string ?? '#'} className="no-underline hocus:underline">
        <h2 className="text-m2">
          {item.title}
        </h2>
      </Link>
      {item?.description && <p>{item.description}</p>}

      {lastUpdated &&
        <div className="rs-py-4">
          Last updated {lastUpdated}
        </div>
      }
    </>
  )
}

export default Search