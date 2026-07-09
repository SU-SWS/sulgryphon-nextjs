import {NextRequest, NextResponse} from "next/server"
import {HONEYPOT_FIELD_NAME} from "@/lib/honeypot"

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
  matcher: [{source: "/all/:path*", has: [{type: "query", key: "_hp"}]}],
}

// Blocks bot/direct-hit traffic to /all (the Bento rewrite) that skips the
// client-side honeypot check in search-form.tsx / sul-home-banner.client.tsx
// - JS-disabled bots, or requests that never touched the form at all. The
// `has` matcher above means this only runs when _hp is actually present, so
// normal search traffic (which strips it client-side) never invokes this.
export function proxy(request: NextRequest) {
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
