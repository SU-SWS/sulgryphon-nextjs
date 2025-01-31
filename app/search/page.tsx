import SiteSearch from "@/components/search/search-page"
import {redirect} from "next/navigation"

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = false
export const dynamic = "force-dynamic"
// https://vercel.com/docs/functions/runtimes#max-duration
export const maxDuration = 60

const Page = async (props: {searchParams?: Promise<Record<string, string>>}) => {
  const searchParams = await props.searchParams
  const searchTerms = searchParams?.q || ""

  if (searchParams) {
    // Honeypot check.
    if (searchParams?.search) redirect("/search")
    // Bot actor adding unwanted parameters.
    delete searchParams.search
    delete searchParams.q
    if (Object.keys(searchParams).length > 0) redirect("/search")
  }
  return (
    <div className="centered mt-32">
      <div className="mx-auto 3xl:w-10/12">
        <SiteSearch searchKey={searchTerms} />
      </div>
    </div>
  )
}
export default Page
