import InternalHeaderBanner from "./components/patterns/internal-header-banner";
import {SignalIcon} from "@heroicons/react/20/solid";

const Loading = () => {
  return (
    <div>
      <InternalHeaderBanner>
        <h1 className="su-cc su-pt-[110px] su-pb-50 lg:su-pb-20 su-relative su-text-white" aria-hidden={true}>
          <span className="sr-only">Loading</span>
        </h1>
      </InternalHeaderBanner>

      <div className="su-cc su-mb-50">
        <SignalIcon width={100} className="su-animate-ping su-mx-auto su-my-50" />
      </div>
    </div>
  )
}
export default Loading;