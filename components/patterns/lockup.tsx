export const Lockup = () => {
  return (
    <div>
      <a className="su-cc su-lockup su-no-underline su-inline-block" href="/">
        <div className="su-flex su-flex-col md:su-flex-row su-basefont-19">
          <div
            className=" su-logo su-text-cardinal-red su-type-4 su-leading-half su-pt-11 su-pr-7 su-mr-7 md:su-border-r su-border-solid su-border-black "> Stanford
          </div>
          <div
            className=" su-text-25 md:su-text-m2 su--mt-3 md:su-mt-0 su--ml-2 md:su-ml-0 su-font-regular su-relative su-top-6 su-text-black ">
            {process.env.NEXT_PUBLIC_SITE_NAME}
          </div>
        </div>
      </a>
    </div>
  )
}