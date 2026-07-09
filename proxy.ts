import {NextRequest, NextResponse} from "next/server"
import * as blockHoneypot from "@/lib/middleware/block-honeypot"

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

export function proxy(request: NextRequest) {
  const handler = handlers.find(({matcher}) => matcher.some(pattern => matchesPath(request.nextUrl.pathname, pattern)))
  return handler ? handler.handle(request) : NextResponse.next()
}
