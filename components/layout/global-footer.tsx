const GlobalFooter = () => {
  return (
    <div
      className="su-global-footer su-basefont-20 su-rs-py-1 su-text-white su-bg-cardinal-red">
      <div className="su-centered su-flex su-flex-col lg:su-flex-row" title="Common Stanford resources">
        <div className="su-text-center su-mt-5 su-mb-9">
          <a className="su-logo su-text-white hocus:su-text-white su-type-3" href="https://www.stanford.edu">
            Stanford <br/> University
          </a>
        </div>
        <div className="lg:su-pl-45 xl:su-pl-50 su-text-left sm:su-text-center lg:su-text-left su-flex-grow [&_a]:su-text-white [&_a]:su-no-underline [&_a:hover]:su-underline [&_a:hover]:su-text-white [&_a:focus]:su-underline [&_a:focus]:su-text-white">
          <nav aria-label="global footer menu"
               className="su-flex su-flex-row sm:su-flex-col su-justify-center sm:su-items-center lg:su-items-start su-mb-10">
            <ul
              className="su-list-unstyled su-mb-10 sm:su-mb-4 su-mr-19 sm:su-mr-0 su-p-0 su-text-15 md:su-text-17 2xl:su-text-18 su-flex su-flex-col sm:su-flex-row">
              <li className="sm:su-mr-10 md:su-mr-20 lg:su-mr-27">
                <a href="https://www.stanford.edu"> 
                  Stanford Home
                </a>
              </li>
              <li className="sm:su-mr-10 md:su-mr-20 lg:su-mr-27">
                <a href="https://visit.stanford.edu/plan/"> Maps &amp; Directions <span
                  className="su-sr-only">(link is external)</span>
                </a>
              </li>
              <li className="sm:su-mr-10 md:su-mr-20 lg:su-mr-27">
                <a href="https://www.stanford.edu/search/"> Search
                  Stanford
                </a>
              </li>
              <li>
                <a href="https://emergency.stanford.edu"> Emergency
                  Info
                </a>
              </li>
            </ul>
            <ul
              className="su-list-unstyled su-mb-10 sm:su-mb-0 su-ml-19 sm:su-ml-0 su-p-0 su-text-15 sm:su-text-14 md:su-text-15 xl:su-text-16 su-flex su-flex-col sm:su-flex-row sm:su-link-regular">
              <li className="sm:su-mr-10 md:su-mr-20 lg:su-mr-27">
                <a href="https://www.stanford.edu/site/terms/" title="Terms of use for sites"> Terms of
                  Use <span
                    className="su-sr-only">(link is external)</span>
                </a>
              </li>
              <li className="sm:su-mr-10 md:su-mr-20 lg:su-mr-27">
                <a href="https://www.stanford.edu/site/privacy/" title="Privacy and cookie policy">Privacy
                </a>
              </li>
              <li className="sm:su-mr-10 md:su-mr-20 lg:su-mr-27">
                <a href="https://uit.stanford.edu/security/copyright-infringement"
                   title="Report alleged copyright infringement"
                >Copyright
                </a>
              </li>
              <li className="sm:su-mr-10 md:su-mr-20 lg:su-mr-27">
                <a href="https://adminguide.stanford.edu/chapter-1/subchapter-5/policy-1-5-4" title="Ownership and use of Stanford trademarks and images">
                  Trademarks
                </a>
              </li>
              <li className="sm:su-mr-10 md:su-mr-20 lg:su-mr-27">
                <a href="https://bulletin.stanford.edu/pages/c7vDgeOuJIfpZe8GKmW3" title="Non-discrimination policy">
                  Non-Discrimination
                </a>
              </li>
              <li>
                <a href="https://www.stanford.edu/site/accessibility" title="Report web accessibility issues">
                  Accessibility
                </a>
              </li>
            </ul>
          </nav>
          <div className="su-text-13 sm:su-text-14 su-text-center lg:su-text-left">
            <span className="su-whitespace-no-wrap">© Stanford University.</span>
            <span className="su-whitespace-no-wrap"> &nbsp; Stanford, California 94305. </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default GlobalFooter;