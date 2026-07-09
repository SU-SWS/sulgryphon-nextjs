import {NextRequest, NextResponse} from "next/server"
import {HONEYPOT_FIELD_NAME} from "@/lib/honeypot"

// Next.js 16 deprecated this file convention in favor of proxy.ts, but it
// is not usable here: on the pinned 16.0.10, with this repo's webpack
// bundler (package.json's dev/build scripts pass --webpack), proxy.ts
// always runs on the Node.js runtime (Next hard-rejects any attempt to
// force `runtime: "edge"` in a proxy.ts config) - yet
// build/webpack/plugins/middleware-plugin.js, which writes
// middleware-manifest.json, only registers webpack entries whose runtime
// is exactly "edge-runtime-webpack". A proxy.ts's Node.js-runtime entry is
// silently skipped, so nothing ends up in `middleware`/`sortedMiddleware`
// and it never runs - confirmed by rebuilding under both filenames and
// diffing the manifest, and by reading next/dist/build/index.js and
// next/dist/build/webpack/plugins/middleware-plugin.js directly. Revisit
// on the next Next.js upgrade (or if this repo ever switches to
// Turbopack, which this gap doesn't affect).

// `has` scopes invocation to requests that actually carry the honeypot
// param. Legit JS-enabled submissions never have it (search-form.tsx /
// sul-home-banner.client.tsx disable the field before the browser submits),
// so normal search traffic skips middleware entirely - this only runs for
// the cases that need a decision: a bot that filled it, or a JS-disabled
// visitor whose empty _hp is still in the URL. Keeps invocation volume (and
// cost) tied to suspicious/edge-case traffic, not all of /all.
//
// The "_hp" below must stay a literal, not HONEYPOT_FIELD_NAME - Next.js
// statically parses `config` at build time and silently ignores matcher
// values that aren't literals (confirmed earlier: it can't even evaluate a
// reference to an imported constant, let alone a computed expression).
export const config = {
  matcher: [{source: "/all/:path*", has: [{type: "query", key: "_hp"}]}],
}

// Runs ahead of the /all rewrite to discover.stanford.edu, catching
// JS-disabled bots and direct hits on /all that never touched the search
// form - neither of which the client-side honeypot check in
// search-form.tsx / sul-home-banner.client.tsx can see.
export function middleware(request: NextRequest) {
  // getAll, not get: get() only returns the first occurrence of a repeated
  // query param, so a crafted "?_hp=&_hp=spam" would let the empty first
  // value slip past a get()-based check while the real payload in the
  // second occurrence went unseen.
  const honeypotValues = request.nextUrl.searchParams.getAll(HONEYPOT_FIELD_NAME)

  if (honeypotValues.length === 0) return NextResponse.next()

  // Match the client-side check (`if (honeypotRef.current?.value)`) exactly:
  // any non-empty value, including whitespace-only, is treated as filled.
  // Only the truly empty string is the "JS-disabled legit visitor" case.
  if (honeypotValues.some(v => v !== "")) {
    return new NextResponse(null, {status: 403})
  }

  // JS-disabled visitor: the client-side "disable before submit" trick never
  // ran, so an empty honeypot value is still in the querystring. Drop it so
  // Bento gets the same clean URL a JS-enabled visitor would send.
  const url = request.nextUrl.clone()
  url.searchParams.delete(HONEYPOT_FIELD_NAME)
  return NextResponse.rewrite(url)
}
