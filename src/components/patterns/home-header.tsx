import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {useEffect, useState} from "react";
import axios from "axios";
import Conditional from "@/components/simple/conditional";

const HomeHeader = () => {
  return (
    <div className="su-bg-black-true su-mb-50 su-relative su-overflow-hidden">
      <div className="su-relative su-z-10 su-cc lg:su-grid lg:su-grid-cols-2 su-gap-xl">
        <form action="https://searchworks.stanford.edu" className="su-mb-20 su-mx-40">
          <h2 className="su-text-white">What can we help you find?</h2>

          <div className="su-relative">
            <label htmlFor="searchworks-search" className="su-sr-only">Text search</label>
            <input id="searchworks-search" name="q" className="su-input su-w-full su-p-10 su-rounded"
                   placeholder="Search"/>
            <button className="su-bg-cardinal-red su-rounded-full su-p-5 su-absolute su-top-5 su-right-10">
              <MagnifyingGlassIcon height={20} className="su-text-white"/>
              <span className="su-sr-only">Submit search</span>
            </button>
          </div>
          <p className="su-text-white">
            Search gives results from this site, the catalog, articles+, guides, online exhibits, and Yewno
          </p>

        </form>

        <BranchHours className=""/>
      </div>

      <div
        className="su-bg-right-bottom lg:su-bg-home-header-sprinkles su-absolute su-h-2/3 su-w-1/2 su-bottom-0 su-right-0">
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

export default HomeHeader

const BranchHours = (props) => {
  const [libraries, setLibraries] = useState([])
  const [chosenLibraryHours, setChosenLibraryHours] = useState(null)
  const [chosenLibrary, setChosenLibrary] = useState(null);

  useEffect(() => {
    axios.get('/api/node/node--sul_library')
      .then(response => {
        setLibraries(response.data)
        setChosenLibrary(response.data[0].id)
      });
  }, [])

  useEffect(() => {
    if (chosenLibrary) {
      const node = libraries.find(library => library.id === chosenLibrary);
      axios.get(`https://library-hours.stanford.edu/api/v1/library/${node.su_library__url_name}/location/library-circulation/hours/for/today`).then(response => setChosenLibraryHours(response.data))
    }
  }, [chosenLibrary, libraries])

  return (
    <div {...props}>
      <div className="su-text-white">
        Today&apos;s Hours

        <label className="su-sr-only">Choose a library to view the hours</label>
        <select onChange={e => setChosenLibrary(e.target.value)}>
          <option value="">--Please choose an branch--</option>
          {libraries.map(library => <option key={library.id} value={library.id}>{library.title}</option>)}
        </select>

        <Conditional showWhen={chosenLibraryHours}>
          <Hours hours={chosenLibraryHours}/>
        </Conditional>
      </div>

    </div>
  )
}

const Hours = ({hours}) => {
  return (
    <div>
      Branch hours
    </div>
  )
}