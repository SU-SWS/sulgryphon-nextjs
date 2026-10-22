import {NextRequest, NextResponse} from "next/server"
import {HONEYPOT_FIELD_NAME} from "@/lib/honeypot"
import {secretsMatch} from "@/lib/security"

// EXPERIMENTAL: testing whether proxy.ts (Next 16's replacement for
// middleware.ts) actually works with this repo's webpack bundler. Local
// builds can't confirm it either way (they fail earlier at an unrelated
// step), so we're checking on a real Vercel preview. Test: hit
// /all?q=test&_hp=spam - if it doesn't reach Bento, this works; if it does,
// revert to middleware.ts (confirmed working).
//
// The "_hp" below must stay a literal - Next statically parses `config` at
// build time and won't resolve HONEYPOT_FIELD_NAME.
export const config = {
  matcher: [{source: "/all/:path*", has: [{type: "query", key: "_hp"}]}, "/preview/:path*", "/search"],
}

// Blocks bot/direct-hit traffic to /all (the Bento rewrite) that skips the
// client-side honeypot check in search-form.tsx / sul-home-banner.client.tsx
// - JS-disabled bots, or requests that never touched the form at all. The
// `has` matcher above means this only runs when _hp is actually present, so
// normal search traffic (which strips it client-side) never invokes this.
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  // With Cache Components these pages stream after a static shell, so a redirect or 404 raised while
  // rendering can no longer change the status code. Decide those here, before rendering starts.
  if (pathname.startsWith("/preview")) return handlePreview(request)
  if (pathname === "/search") return handleSearch(request)

  // getAll: a repeated "?_hp=&_hp=spam" would hide the real value from get().
  const honeypotValues = request.nextUrl.searchParams.getAll(HONEYPOT_FIELD_NAME)

  if (honeypotValues.length === 0) return NextResponse.next()

  // Any non-empty value (including whitespace) is a bot signal, matching the
  // client-side check. Only the exact empty string reaches the rewrite below.
  if (honeypotValues.some(v => v !== "")) {
    return new NextResponse(null, {status: 403})
  }

  // JS-disabled visitor: client-side never stripped the empty _hp, so do it
  // here instead, keeping the URL Bento sees the same either way.
  const url = request.nextUrl.clone()
  url.searchParams.delete(HONEYPOT_FIELD_NAME)
  return NextResponse.rewrite(url)
}

// Draft content must never be indexed or held in a shared cache, and the preview url carries the
// shared secret in its query string, so keep that url out of any outbound Referer header.
const PREVIEW_HEADERS: Record<string, string> = {
  "Referrer-Policy": "no-referrer",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Cache-Control": "no-store, max-age=0",
}

/**
 * Gate the editor preview routes on the secret shared with Drupal.
 *
 * Drupal links to `/preview?secret=...&slug=/path`, which is redirected to `/preview/path?secret=...`.
 * Every preview request must carry the secret. Every response here is a dead end for crawlers and
 * caches, and an unauthorized request is rewritten to the 404 page rather than redirected so it is
 * indistinguishable from a missing page.
 */
const handlePreview = async (request: NextRequest) => {
  const notFound = () => withPreviewHeaders(NextResponse.rewrite(new URL("/404", request.url), {status: 404}))

  // Fail closed. Without a configured secret there is nothing to authorize against, so an empty
  // environment variable must never turn into an open door to unpublished content.
  const expectedSecret = process.env.DRUPAL_PREVIEW_SECRET
  if (!expectedSecret) {
    console.error("DRUPAL_PREVIEW_SECRET is not set. Preview routes are disabled.")
    return notFound()
  }

  const secret = request.nextUrl.searchParams.get("secret")
  if (!secret || !(await secretsMatch(secret, expectedSecret))) return notFound()

  if (request.nextUrl.pathname === "/preview" && request.nextUrl.searchParams.has("slug")) {
    const slug = request.nextUrl.searchParams.get("slug")
    if (!isSafePreviewSlug(slug)) return notFound()

    // The home page previews at /preview itself; `/preview/` would only be redirected again.
    const destination = new URL(slug === "/" ? "/preview" : `/preview${slug}`, request.url)
    // Set the parameter rather than interpolating it so the secret is always escaped.
    destination.searchParams.set("secret", secret)
    return withPreviewHeaders(NextResponse.redirect(destination))
  }

  return withPreviewHeaders(NextResponse.next())
}

const withPreviewHeaders = (response: NextResponse) => {
  Object.entries(PREVIEW_HEADERS).forEach(([header, value]) => response.headers.set(header, value))
  return response
}

/**
 * Drupal sends the page to preview as a `slug` query parameter, which is pasted straight into the
 * redirect location. Accept only a plain, relative path: an authority (`//host`), a backslash (which
 * some browsers normalize to `/`), or a `..` segment would all walk the editor off `/preview` — and
 * carry the secret along in the query string. The decoded form is checked too, so a `%2e%2e` or
 * `%5c` cannot smuggle the same characters past these checks.
 */
const isSafePreviewSlug = (slug: string | null): slug is string => {
  if (!slug) return false

  let decoded: string
  try {
    decoded = decodeURIComponent(slug)
  } catch {
    // Malformed percent encoding.
    return false
  }

  return [slug, decoded].every(
    value =>
      value.startsWith("/") &&
      !value.startsWith("//") &&
      !value.includes("\\") &&
      !value.includes("?") &&
      !value.includes("#") &&
      !value.split("/").includes("..")
  )
}

const MAX_SEARCH_LENGTH = 256

/**
 * Bot actors fill the honeypot `search` field, repeat `q`, or add unwanted parameters. Send them
 * back to a bare /search.
 */
const handleSearch = (request: NextRequest) => {
  const params = request.nextUrl.searchParams
  const honeypot = params.getAll("search").some(value => value !== "")
  const repeatedQuery = params.getAll("q").length > 1
  const extraParams = [...params.keys()].some(key => key !== "q" && key !== "search")
  // Each distinct query is a search request and a cache entry; no real search is this long.
  const tooLong = (params.get("q")?.length ?? 0) > MAX_SEARCH_LENGTH

  if (honeypot || repeatedQuery || extraParams || tooLong) return NextResponse.redirect(new URL("/search", request.url))
}
