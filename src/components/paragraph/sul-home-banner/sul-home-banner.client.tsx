"use client"
import {HTMLAttributes, useEffect, useId, useState} from "react"
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid"
import {PlayIcon} from "@heroicons/react/16/solid"

type Props = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode[]
}
export const SulHomeBannerRandomClient = ({children, ...props}: Props) => {
  const [displayedChild, setDisplayedChild] = useState(-1)

  useEffect(() => {
    setDisplayedChild(Math.floor(Math.random() * children.length))
  }, [children])

  return (
    <div {...props}>
      {/* To avoid initial loading of an image and then switching to another, 
      display an empty container and allow the children to display after 
      the useEffect completes. */}
      {displayedChild === -1 && <div className="relative h-400" />}
      {displayedChild >= 0 && children[displayedChild]}
    </div>
  )
}

export const SulHomeBannerFormClient = () => {
  const [query, setQuery] = useState("")
  const [formAction, setFormAction] = useState("/all")
  const inputId = useId()
  return (
    <form
      action={formAction}
      className="flex w-full flex-wrap items-center justify-between gap-10 rounded-2xl bg-white px-16 py-8 md:w-fit md:justify-start md:px-24 md:py-16 lg:gap-32 lg:px-40 lg:py-24 xs:flex-nowrap"
    >
      <div className="flex w-full items-center overflow-hidden xs:w-fit">
        <label className="sr-only" htmlFor={inputId}>
          Search for books, articles, and more
        </label>
        <MagnifyingGlassIcon width={40} className="hidden sm:block" />
        <input
          className="block h-40 w-full min-w-[25rem] border-0 text-16 focus-within:border md:min-w-[32rem] md:text-20 xl:min-w-[35rem] xl:text-22"
          name="q"
          id={inputId}
          placeholder="Search for books, articles, and more"
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <div className="hidden h-50 w-[.5px] shrink-0 bg-black xs:block" />

      <div className="relative w-2/3 md:w-fit">
        <label className="sr-only" htmlFor={`${inputId}-action`}>
          Search all resources or only this site.
        </label>
        <select
          id={`${inputId}-action`}
          className="h-40 w-full border-0 bg-none text-16 font-semibold leading-normal hover:cursor-pointer md:w-auto md:min-w-[15rem] md:text-20 xl:text-22"
          onChange={e => setFormAction(e.target.value)}
          value={formAction}
        >
          <option value="/all">All library resources</option>
          <option value="https://searchworks.stanford.edu/">Catalog</option>
          <option
            value={`https://searchworks.stanford.edu/articles?q={${encodeURIComponent(query)}}&f[eds_search_limiters_facet][]=Direct+access+to+full+text`}
          >
            Articles+
          </option>
          <option value="/search">This site</option>
        </select>
        <PlayIcon className="pointer-events-none absolute right-0 top-1/2 z-10 -translate-y-1/2 rotate-90" width={20} />
      </div>
      <button
        className="button relative m-0 block h-40 w-40 shrink-0 p-0 md:h-auto md:w-auto md:px-20 md:py-10"
        type="submit"
      >
        <MagnifyingGlassIcon
          width={30}
          className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 md:hidden"
        />
        <span aria-hidden className="hidden md:block">
          Search
        </span>
        <span className="sr-only">Submit Search</span>
      </button>
    </form>
  )
}
