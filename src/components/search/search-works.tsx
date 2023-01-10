import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";

const SearchWorks = ({placeholder="Search", ...props}) => {
  return (
    <div {...props}>
      <form action="https://searchworks.stanford.edu" className="su-relative">
        <label htmlFor="searchworks-search" className="su-sr-only">Text search</label>
        <input id="searchworks-search" name="q" className="su-input su-w-full su-p-10 su-rounded"
               placeholder={placeholder}/>
        <button className="su-bg-cardinal-red su-rounded-full su-p-5 su-absolute su-top-5 su-right-10">
          <MagnifyingGlassIcon height={20} className="su-text-white"/>
          <span className="su-sr-only">Submit search</span>
        </button>
      </form>
    </div>
  )
}
export default SearchWorks;