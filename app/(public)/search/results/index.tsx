"use client";

import {DrupalNode} from "next-drupal";
import Conditional from "@/components/utils/conditional";
import {useSearchParams} from "next/navigation";
import {useSearchResults} from "@/lib/hooks/useSearchResults";
import Loading from "@/components/patterns/icons/loading";
import {getNodeMetadata} from "../../[...slug]/metadata";
import Link from "next/link";


const SearchResults = () => {
  const params = useSearchParams();
  const [data, loading] = useSearchResults(params ? params.get('q') as string : '');
  if (loading) {
    return <Loading/>
  }
  return (
    <div aria-live="polite">
      <Conditional showWhen={data.length === 0}>
        <p>No results found for your search. Please try again.</p>
      </Conditional>
      <Conditional showWhen={data.length > 0}>
        <ul className="su-list-unstyled">
          {data.slice(0, 20).map(node => <li key={node.id}><SearchResultItem node={node}/></li>)}
        </ul>
      </Conditional>
    </div>
  )
}

const SearchResultItem = ({node}: { node: DrupalNode }) => {
  const metadata = getNodeMetadata(node)
  return (
    <>
      <h2><Link href={node.path.alias}>{node.title}</Link></h2>
      {metadata?.description && <p>{metadata.description}</p>}
    </>
  )
}

export default SearchResults;