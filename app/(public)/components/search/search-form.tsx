"use client";

import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {useId, useRef} from "react";
import {useRouter, useSearchParams} from "next/navigation";

interface keyable {
  [key: string]: any
}

interface FormProps extends keyable {
  action: string,
  inputProps?: keyable
}

const SearchForm = ({action = '/search', inputProps = {}, ...props}: FormProps) => {
  const params = useSearchParams();
  const inputId = useId();

  inputProps = {
    id: inputId + '-search',
    className: "su-input su-w-full su-p-10 su-rounded",
    placeholder: "Search",
    name: "q",
    ref: useRef(),
    defaultValue: (params ? params.get('q') : '') as string,
    ...inputProps
  }

  const router = useRouter()

  const formSubmit = (e) => {
    if (action === '/search') {
      e.preventDefault();
      const newSearch = inputProps.ref.current.value;
      router.push(`/search?q=${newSearch}`)
    }
  }

  return (
    <div {...props}>
      <form action={action} className="su-relative" onSubmit={formSubmit}>
        <label htmlFor={inputProps.id} className="su-sr-only">Text search</label>
        <input {...inputProps}/>
        <button className="su-bg-cardinal-red su-rounded-full su-p-5 su-absolute su-top-5 su-right-10">
          <MagnifyingGlassIcon height={20} className="su-text-white"/>
          <span className="su-sr-only">Submit search</span>
        </button>
      </form>
    </div>
  )
}
export default SearchForm;