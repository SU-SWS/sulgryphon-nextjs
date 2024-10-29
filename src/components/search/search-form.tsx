"use client"

import {FormEvent, HTMLAttributes, Suspense, useId, useRef} from "react"
import {useRouter, useSearchParams} from "next/navigation"

type FormProps = HTMLAttributes<HTMLDivElement> & {
  action: string
  inputProps?: HTMLAttributes<HTMLInputElement>
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
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  inputProps = {
    id: inputId + "-search",
    className: "input w-full p-10 rounded",
    // @ts-expect-error Placeholder does exist on an input element.
    placeholder: "Search",
    name: "q",
    ref: useRef(undefined),
    defaultValue: (params ? params.get("q") : "") as string,
    ...inputProps,
  }

  const router = useRouter()

  const formSubmit = (e: FormEvent) => {
    if (action === "/search") {
      e.preventDefault()
      const newSearch = inputRef.current?.value
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
          <input {...inputProps} ref={inputRef} />
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
