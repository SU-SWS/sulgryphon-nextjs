import {NextRequest, NextResponse} from "next/server"
import {HONEYPOT_FIELD_NAME} from "@/lib/honeypot"

// Runs ahead of the /all rewrite to discover.stanford.edu (see vercel.json),
// catching JS-disabled bots and direct hits on /all that never touched the
// search form - neither of which the client-side honeypot check in
// search-form.tsx / sul-home-banner.client.tsx can see.
export const matcher = ["/all", "/all/:path*"]

export const handle = (request: NextRequest): NextResponse => {
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
