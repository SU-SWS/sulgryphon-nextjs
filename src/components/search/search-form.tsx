"use client"

import {FormEvent, HTMLAttributes, Suspense, useId, useRef} from "react"
import {useRouter, useSearchParams} from "next/navigation"

type FormProps = HTMLAttributes<HTMLDivElement> & {
  action: string
  inputProps?: Omit<HTMLAttributes<HTMLInputElement>, "ref">
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
  const honeypotRef = useRef<HTMLInputElement>(null)
  const honeypotId = useId()
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
    // Bot trap: a human never fills the visually/SR-hidden honeypot field.
    // A populated value means an automated submission — block it before it
    // reaches the external /all (discover.stanford.edu) app.
    if (honeypotRef.current?.value) {
      e.preventDefault()
      return
    }

    if (action === "/search") {
      e.preventDefault()
      const newSearch = inputRef.current?.value
      router.push(`/search?q=${newSearch}`)
    }
    // action="/all": honeypot empty -> native form submission proceeds as today.
  }

  return (
    <div {...props}>
      <form
        action={action}
        className="relative flex flex-col gap-xs @xl:flex-row @xl:items-end @3xl:gap-xl"
        onSubmit={formSubmit}
      >
        <div className="flex-grow">
          {/* eslint-disable-next-line react-hooks/refs */}
          <label className="mb-2 text-white" htmlFor={inputProps.id}>
            Keyword Search
          </label>
          {/* eslint-disable-next-line react-hooks/refs */}
          <input {...inputProps} ref={inputRef} />
        </div>
        {/* Honeypot bot trap. Hidden both visually and from assistive tech
            (aria-hidden + off-screen + tabIndex -1 + autoComplete off). Humans never
            populate it; see formSubmit for the block. Do NOT use sr-only here — that
            is announced by screen readers. */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={honeypotId}>Leave this field blank</label>
          <input
            id={honeypotId}
            type="text"
            name="search"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
            ref={honeypotRef}
          />
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
