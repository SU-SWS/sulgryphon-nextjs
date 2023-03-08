import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {useId} from "react";

const SearchForm = ({action, inputProps = {}, ...props}) => {
  inputProps = {
    className: "su-input su-w-full su-p-10 su-rounded",
    placeholder: "Search",
    name: "q",
    ...inputProps
  }

  const inputId = useId();
  return (
    <div {...props}>
      <form action={action} className="su-relative">
        <label htmlFor={inputId + '-searchworks'} className="su-sr-only">Text search</label>
        <input
          id={inputId + '-search'}
          {...inputProps}
        />
        <button className="su-bg-cardinal-red su-rounded-full su-p-5 su-absolute su-top-5 su-right-10">
          <MagnifyingGlassIcon height={20} className="su-text-white"/>
          <span className="su-sr-only">Submit search</span>
        </button>
      </form>
    </div>
  )
}
export default SearchForm;