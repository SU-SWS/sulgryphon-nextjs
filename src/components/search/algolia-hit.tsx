import Link from "@/components/patterns/elements/drupal-link"
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

/** Hosts whose URLs are rewritten to site-relative paths so Next's router handles them. */
const getSiteHosts = (): string[] => {
  const hosts = ["library.stanford.edu"]
  try {
    hosts.push(new URL(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string).host)
  } catch {
    // Unset or malformed base URL: only the production host is treated as local.
  }
  return hosts
}

/**
 * Convert the indexed absolute URL to a site-relative path so Next's router handles it.
 *
 */
const toRelative = (url: string): string => {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return url
    const local = getSiteHosts().includes(parsed.host) || !parsed.hostname.includes(".")
    return local ? `${parsed.pathname}${parsed.search}${parsed.hash}` || "/" : url
  } catch {
    return url || "#"
  }
}

/**
 * Plain-text snippet of the `html` attribute, if Algolia returned one. `_snippetResult` is typed
 * as a recursive union, so narrow it here rather than casting.
 *
 */
const getHtmlSnippet = (hit: AlgoliaHit): string | undefined => {
  const snippet = hit._snippetResult?.html
  if (!snippet || Array.isArray(snippet) || typeof snippet.value !== "string") return undefined
  return snippet.value.replace(/<\/?(em|mark)>/g, "").trim() || undefined
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
  const description = hit.summary || getHtmlSnippet(hit)

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
      {description && <p>{description}</p>}
      {lastUpdated && <div className="mt-12 pb-10 text-right">Last updated {lastUpdated}</div>}
    </article>
  )
}
export default AlgoliaHit
