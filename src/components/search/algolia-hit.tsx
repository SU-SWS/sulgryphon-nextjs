import Link from "@/components/patterns/elements/drupal-link"
import {Snippet} from "react-instantsearch"
import type {useInfiniteHits} from "react-instantsearch"

export type AlgoliaHitRecord = {
  objectID: string
  title: string
  url: string
  summary?: string
  updated?: number
  html?: string
}

// The hit type as useInfiniteHits() hands it to us derived from the hook so nothing is
// imported from the transitive instantsearch.js dependency.
type AlgoliaHit = ReturnType<typeof useInfiniteHits<AlgoliaHitRecord>>["items"][number]

/**
 * Indexed urls are absolute and point at the public site, not at NEXT_PUBLIC_DRUPAL_BASE_URL, so
 * <Link> can't strip them. Drop the origin to keep client side navigation.
 */
const toRelative = (url: string): string => {
  try {
    return url.replace(new URL(url).origin, "") || "/"
  } catch {
    return "#"
  }
}

type Props = {
  hit: AlgoliaHit
  onSend?: () => void
}

const AlgoliaHit = ({hit, onSend}: Props) => {
  const lastUpdated = hit.updated
    ? new Date(hit.updated * 1000).toLocaleDateString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "America/Los_Angeles",
      })
    : undefined

  return (
    <article aria-labelledby={hit.objectID}>
      <Link
        href={toRelative(hit.url ?? "#")}
        className="no-underline hocus:underline"
        onClick={onSend}
        onAuxClick={e => {
          // auxclick also fires for the right button (context menu)
          if (e.button === 1) onSend?.()
        }}
      >
        <h3 className="type-2" id={hit.objectID}>
          {hit.title || "Untitled"}
        </h3>
      </Link>

      {hit.summary && <p>{hit.summary}</p>}
      {!hit.summary && (
        <p>
          <Snippet attribute="html" hit={hit} />
        </p>
      )}

      {lastUpdated && <div className="mt-12 pb-10 text-right">Last updated {lastUpdated}</div>}
    </article>
  )
}
export default AlgoliaHit
