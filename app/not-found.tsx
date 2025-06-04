import InternalHeaderBanner from "@/components/patterns/internal-header-banner"
import Link from "next/link"

const NotFound = () => {
  return (
    <main id="main-content" className="mb-50">
      <InternalHeaderBanner>
        <h1 className="relative mx-auto mb-50 mt-80 w-full max-w-[calc(100vw-10rem)] p-0 md:mt-100 md:max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)]">
          Page Not Found
        </h1>
      </InternalHeaderBanner>

      <div className="centered mb-50">
        Unable to find the content you are looking for. Please try the{" "}
        <Link prefetch={false} href="/all">
          search
        </Link>{" "}
        to find what you were looking for.
      </div>
    </main>
  )
}
export default NotFound
