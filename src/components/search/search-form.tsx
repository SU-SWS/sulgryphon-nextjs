"use client"

import {FormEvent, Suspense, useId, useRef} from "react"
import {useRouter, useSearchParams} from "next/navigation"

interface FormProps extends Record<string, any> {
  action: string
  inputProps?: Record<string, any>
}

const SearchForm = ({...props}: FormProps) => {
  return (
    <Suspense fallback={<></>}>
      <SearchFormComponent {...props} />
    </Suspense>
  )
}

const SearchFormComponent = ({action = "/search", inputProps = {}, ...props}: FormProps) => {
  const params = useSearchParams()
  const inputId = useId()

  inputProps = {
    id: inputId + "-search",
    className: "input w-full p-10 rounded",
    placeholder: "Search",
    name: "q",
    ref: useRef(),
    defaultValue: (params ? params.get("q") : "") as string,
    ...inputProps,
  }

  const router = useRouter()

  const formSubmit = (e: FormEvent) => {
    if (action === "/search") {
      e.preventDefault()
      const newSearch = inputProps.ref.current.value
      router.push(`/search?q=${newSearch}`)
    }
  }

  return (
    <div {...props}>
      <form
        action={action}
        className="relative flex flex-col gap-xs @xl:flex-row @xl:items-end @3xl:gap-xl"
        onSubmit={formSubmit}
      >
        <div className="flex-grow">
          <label className="mb-2 text-white" htmlFor={inputProps.id}>
            Keyword Search
          </label>
          <input {...inputProps} />
        </div>
        <button
          type="submit"
          className="rounded-full bg-digital-red p-15 text-16 text-white transition hover:bg-cardinal-red-dark hocus:underline md:text-18"
        >
          Search
        </button>
      </form>
    </div>
  )
}
export default SearchForm
