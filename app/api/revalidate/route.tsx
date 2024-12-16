import {NextRequest, NextResponse} from "next/server"
import {revalidatePath, revalidateTag, unstable_cache as nextCache} from "next/cache"
import {getEntityFromPath} from "@/lib/gql/fetcher"

export const revalidate = 0

const getHomePagePath = nextCache(
  async () => {
    const {entity} = await getEntityFromPath("/")
    return entity?.path
  },
  [],
  {tags: ["paths:/"]}
)

export const GET = async (request: NextRequest) => {
  const secret = request.nextUrl.searchParams.get("secret")
  if (secret !== process.env.DRUPAL_REVALIDATE_SECRET)
    return NextResponse.json({message: "Invalid token"}, {status: 403})

  const path = request.nextUrl.searchParams.get("slug")
  if (!path || path.startsWith("/node/")) return NextResponse.json({message: "Invalid slug"}, {status: 400})

  if (!path.startsWith("/tags/") && process.env.NEXT_PUBLIC_DOMAIN) {
    // 404 and 307 path responses are cached heavily. We need to invalidate the
    // path, not just the tags.
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}${path}`, {redirect: "manual"})
      .then(res => {
        if (!res.ok) {
          revalidatePath(path)
          return NextResponse.json({revalidated: true, path})
        }
      })
      .catch(_e => console.warn("something went wrong checking for path"))
  }

  const tagsInvalidated = path.includes("/tags/") ? [] : [`paths:${path}`]
  if (path.startsWith("/tags/"))
    path
      .substring(6)
      .split("/")
      .map(tag => tagsInvalidated.push(tag))

  // When the home page is saved, it's url slug might be like `/home`. If the home page matches the slug, invalidate
  // the home page path.
  if ((await getHomePagePath()) === path) tagsInvalidated.push("paths:/")

  tagsInvalidated.map(tag => revalidateTag(tag))

  return NextResponse.json({revalidated: true, tags: tagsInvalidated})
}
