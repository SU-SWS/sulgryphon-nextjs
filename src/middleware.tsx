import {NextResponse} from "next/server";

export const middleware = () => {
  const response = NextResponse.next()

  const midnight = new Date();
  midnight.setHours(23);
  midnight.setMinutes(59);

  // Set the cookie to expire at midnight tonight.
  response.cookies.set({
    name: 'addEditoria11y',
    value: "true",
    path: '/',
    maxAge: Math.round(midnight.getTime() / 1000) - Math.round(new Date().getTime() / 1000)
  })
  return response;
}

export const config = {
  matcher: '/api/preview'
}