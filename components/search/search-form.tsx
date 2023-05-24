"use client";

import {Suspense, useId, useRef} from "react";
import {useRouter, useSearchParams} from "next/navigation";

interface keyable {
  [key: string]: any
}

interface FormProps extends keyable {
  action: string,
  inputProps?: keyable
}

const SearchForm = ({...props}: FormProps) => {
  return (
    <Suspense fallback={<></>}>
      <SearchFormComponent {...props}/>
    </Suspense>
  )
}

const SearchFormComponent = ({action = '/search', inputProps = {}, ...props}: FormProps) => {
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
      <form action={action} className="su-relative su-flex su-items-end su-gap-xl" onSubmit={formSubmit}>
        <div className="su-flex-grow">
          <label htmlFor={inputProps.id}>Keyword Search</label>
          <input {...inputProps}/>
        </div>
        <button
          type="submit"
          className="su-rounded-full su-p-15 su-bg-digital-red hover:su-bg-black su-transition su-text-white"
        >
          Search
        </button>
      </form>
    </div>
  )
}
export default SearchForm;