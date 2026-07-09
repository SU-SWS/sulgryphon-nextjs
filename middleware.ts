import {NextRequest, NextResponse} from "next/server"
import * as blockHoneypot from "@/lib/middleware/block-honeypot"

// To add another concern: create src/lib/middleware/<name>.ts exporting
// `matcher` (path patterns) and `handle` (request => response), then list
// it here. Only the first handler whose matcher matches the request runs.
const handlers = [blockHoneypot]

const matchesPath = (pathname: string, pattern: string): boolean => {
  if (pattern.endsWith("/:path*")) {
    const prefix = pattern.slice(0, -"/:path*".length)
    return pathname === prefix || pathname.startsWith(`${prefix}/`)
  }
  return pathname === pattern
}

export const config = {
  matcher: handlers.flatMap(handler => handler.matcher),
}

export function middleware(request: NextRequest) {
  const handler = handlers.find(({matcher}) => matcher.some(pattern => matchesPath(request.nextUrl.pathname, pattern)))
  return handler ? handler.handle(request) : NextResponse.next()
}
