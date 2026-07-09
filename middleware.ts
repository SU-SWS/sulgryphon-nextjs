import {NextRequest, NextResponse} from "next/server"
import * as blockHoneypot from "@/lib/middleware/block-honeypot"

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

// To add another concern: create src/lib/middleware/<name>.ts exporting
// `matcher` (path patterns) and `handle` (request => response), then list
// it in `handlers` below. Only the first handler whose matcher matches the
// request runs.
const handlers = [blockHoneypot]

const matchesPath = (pathname: string, pattern: string): boolean => {
  if (pattern.endsWith("/:path*")) {
    const prefix = pattern.slice(0, -"/:path*".length)
    return pathname === prefix || pathname.startsWith(`${prefix}/`)
  }
  return pathname === pattern
}

// Next.js statically parses this at build time and only accepts literal
// values here (see https://nextjs.org/docs/messages/invalid-page-config) -
// it can't evaluate handlers.flatMap(...), or even a reference to an
// imported/local constant. Keep this list in sync by hand with the
// `matcher` each handler above exports; the handlers themselves use their
// own `matcher` for the actual per-request dispatch below.
export const config = {
  matcher: ["/all", "/all/:path*"],
}

export function middleware(request: NextRequest) {
  const handler = handlers.find(({matcher}) => matcher.some(pattern => matchesPath(request.nextUrl.pathname, pattern)))
  return handler ? handler.handle(request) : NextResponse.next()
}
