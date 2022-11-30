import {ReactNodeLike} from "prop-types";

interface InternalHeaderBannerProps {
  children: ReactNodeLike
}

const InternalHeaderBanner = ({children}: InternalHeaderBannerProps) => {
  return (
    <div className="su-bg-black-true su-mb-50 su-relative su-overflow-hidden">
      <div className="su-relative su-z-10">
        {children}
      </div>

      <div className="su-bg-right-bottom lg:su-bg-interior-header-sprinkles su-absolute su-h-2/3 su-w-1/2 su-bottom-0 su-right-0">
        <div className="su-bg-gradient-to-b su-from-black-true su-to-transparent su-absolute su-w-full su-h-full">
          <div className="su-bg-gradient-to-r su-from-black-true su-to-transparent su-absolute su-w-full su-h-full">
            {/*Empty elements. They are absolute positioned to provide visual affects only.*/}
          </div>
        </div>
      </div>

      <div className="su-relative su-z-10">
        <svg viewBox="0 0 1500 70">
          <path d="M0,71 Q500,65 800,20 Q1200,-30 1500,71" stroke="#fff" className="su-fill-white"></path>
        </svg>
      </div>
    </div>
  )
}

export default InternalHeaderBanner;