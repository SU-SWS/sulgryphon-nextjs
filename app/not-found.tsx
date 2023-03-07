import InternalHeaderBanner from "./components/patterns/internal-header-banner";

const NotFound = () => {
  return (
    <div>
      <InternalHeaderBanner>
        <h1 className="su-cc su-pt-[110px] su-pb-50 lg:su-pb-20 su-relative su-text-white">Page Not Found</h1>
      </InternalHeaderBanner>

      <div className="su-cc su-mb-50">
        Unable to find the content you are looking for. Please try somewhere else.
      </div>
    </div>
  )
}
export default NotFound;