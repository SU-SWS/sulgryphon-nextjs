import InternalHeaderBanner from "@/components/patterns/internal-header-banner"

const NotFound = () => {
  return (
    <main id="main-content" className="mb-50">
      <InternalHeaderBanner>
        <h1 className="md::max-w-[calc(100vw-20rem)] relative mx-auto mb-50 mt-80 w-full max-w-[calc(100vw-10rem)] p-0 text-white md:mt-100 3xl:max-w-[calc(1500px-20rem)]">
          Page Not Found
        </h1>
      </InternalHeaderBanner>

      <div className="centered mb-50">
        Unable to find the content you are looking for. Please try the <a href="/all">search</a> to find what you were
        looking for.
      </div>
    </main>
  )
}
export default NotFound
