import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";

const SearchWorks = (props) => {
  const inputId = 'searchworks-' + Math.random().toString(16).slice(2);

  return (
    <div {...props}>
      <form action="https://searchworks.stanford.edu" className="su-relative su-mb-20 su-mx-40">
        <label htmlFor={inputId} className="su-sr-only">Text search</label>
        <input id={inputId} name="q" className="su-input su-w-full su-p-10 su-rounded-full"
               placeholder="Search this site"/>
        <button className="su-bg-cardinal-red su-rounded-full su-p-5 su-absolute su-top-5 su-right-10">
          <MagnifyingGlassIcon height={20} className="su-text-white"/>
          <span className="su-sr-only">Submit search</span>
        </button>
      </form>
    </div>
  )
}
export default SearchWorks;