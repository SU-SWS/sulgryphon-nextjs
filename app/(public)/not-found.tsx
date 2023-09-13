import InternalHeaderBanner from "@/components/patterns/internal-header-banner";

const NotFound = () => {
  return (
    <main id="main-content" className="su-mb-50">
      <InternalHeaderBanner>
        <h1
          className="su-w-full su-max-w-[calc(100vw-10rem)] md::su-max-w-[calc(100vw-20rem)] 3xl:su-max-w-[calc(1500px-20rem)] su-mx-auto su-relative su-text-white su-mt-80 md:mt-100 su-mb-50 su-p-0">
          Page Not Found
        </h1>
      </InternalHeaderBanner>

      <div className="su-centered su-mb-50">
        Unable to find the content you are looking for. Please try the <a href="/all">search</a> to find what you were
        looking for.
      </div>
    </main>
  )
}
export default NotFound;