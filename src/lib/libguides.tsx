import {LibGuide} from "@/lib/drupal/drupal"
import {cacheLife, cacheTag} from "next/cache"

const LIBGUIDES_API = "https://lgapi-us.libapps.com/1.2"
// A slow LibApps API must not stall the page render (or the build's prerender).
const REQUEST_TIMEOUT_MS = 10000

type FetchOptions = {
  /** LibGuides account id, to list one person's guides. */
  accountId?: number
  /** LibGuides subject id, to list a subject's guides. */
  subjectId?: number
  /** Extra cache tags, so revalidating e.g. the person's page also refreshes their guides. */
  cacheTags?: string[]
}

type GuideResponse = {
  id: number | string
  name: string
  url: string
  type_label: string
  status: number | string
}

/**
 * Fetch the published LibGuides for an account or a subject.
 *
 * Never throws: on any failure it logs and returns an empty list, cached only briefly so the next
 * render soon tries again.
 */
const fetchLibGuides = async ({accountId, subjectId, cacheTags = []}: FetchOptions): Promise<LibGuide[]> => {
  if (!accountId && !subjectId) return []

  if (!process.env.LIBGUIDE_CLIENT_ID || !process.env.LIBGUIDE_CLIENT_SECRET) {
    console.warn("LIBGUIDE_CLIENT_ID and LIBGUIDE_CLIENT_SECRET are required to fetch LibGuides.")
    return []
  }

  return getCachedLibGuides(accountId, subjectId, cacheTags)
}

/**
 * Errors are handled inside the cache scope rather than thrown out of it: Next reports an error thrown
 * from a `use cache` function to the page render, which fails the whole page.
 *
 * Guides are edited in LibGuides, which Drupal never hears about, so a successful result expires on its
 * own. A failure is kept for minutes only. The page rendering the guides is itself cached and takes
 * the shortest lifetime of the caches it used, so it renders again soon instead of keeping "no guides"
 * until it's next revalidated.
 */
const getCachedLibGuides = async (
  accountId: number | undefined,
  subjectId: number | undefined,
  cacheTags: string[]
): Promise<LibGuide[]> => {
  "use cache: remote"

  cacheTag("all-cache", "libguides", ...cacheTags)

  try {
    const params = new URLSearchParams({status: "1"})
    if (subjectId) params.set("subject_ids", String(subjectId))
    if (accountId) params.set("account_ids", String(accountId))

    const guides = await requestJson<GuideResponse[]>(`${LIBGUIDES_API}/guides?${params}`, {
      headers: {Authorization: `Bearer ${await getAccessToken()}`},
    })
    if (!Array.isArray(guides)) throw new Error("Unexpected response from the guides endpoint")

    cacheLife("days")
    return guides
      .filter(guide => Number(guide.status) === 1)
      .map(guide => ({id: String(guide.id), title: guide.name, url: guide.url, type: guide.type_label}))
  } catch (e) {
    console.warn("Unable to fetch LibGuides: " + (e instanceof Error ? e.message : e))
    cacheLife("minutes")
    return []
  }
}

const getAccessToken = async (): Promise<string> => {
  const {access_token} = await requestJson<{access_token?: string}>(`${LIBGUIDES_API}/oauth/token`, {
    method: "POST",
    // URLSearchParams form-encodes the credentials and sets the urlencoded content type.
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.LIBGUIDE_CLIENT_ID as string,
      client_secret: process.env.LIBGUIDE_CLIENT_SECRET as string,
    }),
  })
  if (!access_token) throw new Error("No access token in the OAuth response")
  return access_token
}

const requestJson = async <T,>(url: string, init: RequestInit): Promise<T> => {
  const response = await fetch(url, {...init, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)})
  // Report the path only: the query string and body are not useful in logs.
  if (!response.ok) throw new Error(`HTTP ${response.status} from ${new URL(url).pathname}`)
  return (await response.json()) as T
}

export default fetchLibGuides
