import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {useId} from "react";
import {useRouter} from "next/router";

export const SearchForm = ({placeholder = "Search", action = "/search", ...props}) => {
  const inputId = useId();
  const router = useRouter()
  const query = router.query?.q as string ?? '';

  return (
    <div {...props}>
      <form action={action} className="su-relative">
        <label htmlFor={inputId + '-searchworks'} className="su-sr-only">Text search</label>
        <input
          id={inputId + '-searchworks'}
          name="q"
          className="su-input su-w-full su-p-10 su-rounded"
          placeholder={placeholder}
          defaultValue={query}
        />
        <button className="su-bg-cardinal-red su-rounded-full su-p-5 su-absolute su-top-5 su-right-10">
          <MagnifyingGlassIcon height={20} className="su-text-white"/>
          <span className="su-sr-only">Submit search</span>
        </button>
      </form>
    </div>
  );
}