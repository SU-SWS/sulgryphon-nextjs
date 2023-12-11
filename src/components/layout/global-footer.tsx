const GlobalFooter = () => {
  return (
    <div
      className="global-footer basefont-20 rs-py-1 text-white bg-cardinal-red">
      <div className="centered flex flex-col lg:flex-row" title="Common Stanford resources">
        <div className="text-center mt-5 mb-9">
          <a  rel="nofollow" className="logo text-white hocus:text-white type-3" href="https://www.stanford.edu">
            Stanford <br/> University
          </a>
        </div>
        <div
          className="lg:pl-45 xl:pl-50 text-left sm:text-center lg:text-left flex-grow [&_a]:text-white [&_a]:no-underline [&_a:hover]:underline [&_a:hover]:text-white [&_a:focus]:underline [&_a:focus]:text-white">
          <nav aria-label="global footer menu"
               className="flex flex-row sm:flex-col justify-center sm:items-center lg:items-start mb-10">
            <ul
              className="list-unstyled mb-10 sm:mb-4 mr-19 sm:mr-0 p-0 text-15 md:text-17 2xl:text-18 flex flex-col sm:flex-row">
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a  rel="nofollow" href="https://www.stanford.edu">
                  Stanford Home
                </a>
              </li>
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a  rel="nofollow" href="https://visit.stanford.edu/plan/"> Maps &amp; Directions
                </a>
              </li>
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a  rel="nofollow" href="https://www.stanford.edu/search/"> Search
                  Stanford
                </a>
              </li>
              <li>
                <a  rel="nofollow" href="https://emergency.stanford.edu"> Emergency
                  Info
                </a>
              </li>
            </ul>
            <ul
              className="list-unstyled mb-10 sm:mb-0 ml-19 sm:ml-0 p-0 text-15 sm:text-14 md:text-15 xl:text-16 flex flex-col sm:flex-row sm:link-regular">
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a  rel="nofollow" href="https://www.stanford.edu/site/terms/" title="Terms of use for sites">
                  Terms of Use
                </a>
              </li>
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a  rel="nofollow" href="https://www.stanford.edu/site/privacy/" title="Privacy and cookie policy">
                  Privacy
                </a>
              </li>
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a  rel="nofollow" href="https://uit.stanford.edu/security/copyright-infringement"
                   title="Report alleged copyright infringement"
                >
                  Copyright
                </a>
              </li>
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a  rel="nofollow" href="https://adminguide.stanford.edu/chapter-1/subchapter-5/policy-1-5-4"
                   title="Ownership and use of Stanford trademarks and images">
                  Trademarks
                </a>
              </li>
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a  rel="nofollow" href="https://bulletin.stanford.edu/pages/c7vDgeOuJIfpZe8GKmW3" title="Non-discrimination policy">
                  Non-Discrimination
                </a>
              </li>
              <li>
                <a  rel="nofollow" href="https://www.stanford.edu/site/accessibility" title="Report web accessibility issues">
                  Accessibility
                </a>
              </li>
            </ul>
          </nav>
          <div className="text-13 sm:text-14 text-center lg:text-left">
            <span className="whitespace-no-wrap">© Stanford University.</span>
            <span className="whitespace-no-wrap"> &nbsp; Stanford, California 94305. </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default GlobalFooter;