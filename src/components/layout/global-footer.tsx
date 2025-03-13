const GlobalFooter = () => {
  return (
    <div className="global-footer rs-py-1 bg-cardinal-red text-white">
      <div className="centered flex flex-col lg:flex-row" title="Common Stanford resources">
        <div className="mb-9 mt-5 text-center">
          <a rel="nofollow" className="logo type-3 text-white hocus:text-white" href="https://www.stanford.edu">
            Stanford <br /> University
          </a>
        </div>
        <div className="flex-grow text-left sm:text-center lg:pl-45 lg:text-left xl:pl-50 [&_a:focus]:text-white [&_a:focus]:underline [&_a:hover]:text-white [&_a:hover]:underline [&_a]:text-white [&_a]:no-underline">
          <nav
            aria-label="global footer menu"
            className="mb-10 flex flex-row justify-center sm:flex-col sm:items-center lg:items-start"
          >
            <ul className="list-unstyled mb-10 mr-19 flex flex-col p-0 text-15 sm:mb-4 sm:mr-0 sm:flex-row md:text-17 2xl:text-18">
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a rel="nofollow" href="https://www.stanford.edu">
                  Stanford Home
                </a>
              </li>
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a rel="nofollow" href="https://visit.stanford.edu/plan/">
                  {" "}
                  Maps &amp; Directions
                </a>
              </li>
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a rel="nofollow" href="https://www.stanford.edu/search/">
                  {" "}
                  Search Stanford
                </a>
              </li>
              <li>
                <a rel="nofollow" href="https://emergency.stanford.edu">
                  {" "}
                  Emergency Info
                </a>
              </li>
            </ul>
            <ul className="list-unstyled mb-10 ml-19 flex flex-col p-0 text-15 sm:mb-0 sm:ml-0 sm:flex-row sm:text-14 sm:link-regular md:text-15 xl:text-16">
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a rel="nofollow" href="https://www.stanford.edu/site/terms/" title="Terms of use for sites">
                  Terms of Use
                </a>
              </li>
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a rel="nofollow" href="https://www.stanford.edu/site/privacy/" title="Privacy and cookie policy">
                  Privacy
                </a>
              </li>
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a
                  rel="nofollow"
                  href="https://uit.stanford.edu/security/copyright-infringement"
                  title="Report alleged copyright infringement"
                >
                  Copyright
                </a>
              </li>
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a
                  rel="nofollow"
                  href="https://adminguide.stanford.edu/chapter-1/subchapter-5/policy-1-5-4"
                  title="Ownership and use of Stanford trademarks and images"
                >
                  Trademarks
                </a>
              </li>
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a
                  rel="nofollow"
                  href="https://bulletin.stanford.edu/pages/c7vDgeOuJIfpZe8GKmW3"
                  title="Non-discrimination policy"
                >
                  Non-Discrimination
                </a>
              </li>
              <li>
                <a
                  rel="nofollow"
                  href="https://www.stanford.edu/site/accessibility"
                  title="Report web accessibility issues"
                >
                  Accessibility
                </a>
              </li>
            </ul>
          </nav>
          <div className="text-center text-13 sm:text-14 lg:text-left">
            <span className="whitespace-no-wrap">© Stanford University.</span>
            <span className="whitespace-no-wrap"> &nbsp; Stanford, California 94305. </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default GlobalFooter
