import {NextResponse} from "next/server"
import {revalidateTag, unstable_cache as nextCache} from "next/cache"
import {fetchLibraryHours} from "../fetch-library-hours"

export const revalidate = 0

const checkEtagHeader = async () => {
  const getPreviousEtag = nextCache(
    async () => {
      const fetchData = await fetchLibraryHours()
      return fetchData.headers.get("etag")
    },
    ["library-hours-etag"],
    {tags: ["library-hours"]}
  )

  const fetchData = await fetchLibraryHours()
  return fetchData.headers.get("etag") != (await getPreviousEtag())
}

export const GET = async () => {
  const invalidated = await checkEtagHeader()
  if (invalidated) revalidateTag("library-hours")
  return NextResponse.json({invalidated})
}
