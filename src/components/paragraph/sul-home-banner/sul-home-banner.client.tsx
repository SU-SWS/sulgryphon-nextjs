"use client"
import {HTMLAttributes, useEffect, useId, useState} from "react"
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid"
import {PlayIcon} from "@heroicons/react/16/solid"

type Props = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode[]
}
export const SulHomeBannerRandomClient = ({children, ...props}: Props) => {
  const [displayedChild, setDisplayedChild] = useState(0)

  useEffect(() => {
    setDisplayedChild(Math.floor(Math.random() * children.length))
  }, [children])

  return <div {...props}>{children[displayedChild]}</div>
}

export const SulHomeBannerFormClient = () => {
  const [formAction, setFormAction] = useState("/all")
  const inputId = useId()
  return (
    <form
      action={formAction}
      className="flex w-full flex-wrap items-center justify-between gap-15 rounded-2xl bg-white p-10 sm:flex-nowrap lg:w-fit lg:justify-start"
    >
      <div className="flex w-full items-center border-black-40 sm:border-r md:w-1/2 lg:w-fit">
        <label className="sr-only" htmlFor={inputId}>
          Search for books, articles, and more
        </label>
        <MagnifyingGlassIcon width={50} className="hidden lg:block" />
        <input
          className="h-50 w-full min-w-150 border-0 text-2xl font-semibold lg:min-w-300"
          name="q"
          id={inputId}
          placeholder="Search for books, articles, and more"
        />
      </div>

      <div className="relative w-2/3 sm:w-1/2 md:w-fit">
        <label className="sr-only" htmlFor={`${inputId}-action`}>
          Search all resources or only this site.
        </label>
        <select
          id={`${inputId}-action`}
          className="h-50 w-full border-0 bg-none text-2xl font-semibold hover:cursor-pointer md:w-auto"
          onChange={e => setFormAction(e.target.value)}
          value={formAction}
        >
          <option value="/all">All resources</option>
          <option value="/search">This site</option>
        </select>
        <PlayIcon className="pointer-events-none absolute right-0 top-1/2 z-10 -translate-y-1/2 rotate-90" width={20} />
      </div>
      <button
        className="button relative m-0 block h-40 w-40 shrink-0 p-0 lg:h-auto lg:w-auto lg:px-20 lg:py-10"
        type="submit"
      >
        <MagnifyingGlassIcon
          width={30}
          className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 lg:hidden"
        />
        <span aria-hidden className="hidden lg:block">
          Search
        </span>
        <span className="sr-only">Submit Search</span>
      </button>
    </form>
  )
}
