import {NextRequest, NextResponse} from "next/server"
import {HONEYPOT_FIELD_NAME} from "@/components/patterns/elements/honeypot-field"

// Runs ahead of the /all rewrite to discover.stanford.edu (see vercel.json),
// catching JS-disabled bots and direct hits on /all that never touched the
// search form - neither of which the client-side honeypot check in
// search-form.tsx / sul-home-banner.client.tsx can see.
export const matcher = ["/all", "/all/:path*"]

export const handle = (request: NextRequest): NextResponse => {
  const honeypot = request.nextUrl.searchParams.get(HONEYPOT_FIELD_NAME)

  if (honeypot === null) return NextResponse.next()

  if (honeypot.trim()) {
    return new NextResponse(null, {status: 403})
  }

  // JS-disabled visitor: the client-side "disable before submit" trick never
  // ran, so an empty honeypot value is still in the querystring. Drop it so
  // Bento gets the same clean URL a JS-enabled visitor would send.
  const url = request.nextUrl.clone()
  url.searchParams.delete(HONEYPOT_FIELD_NAME)
  return NextResponse.rewrite(url)
}
