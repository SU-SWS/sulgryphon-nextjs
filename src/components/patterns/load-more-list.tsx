"use client"

import {useLayoutEffect, useRef, HtmlHTMLAttributes, JSX, useId, useState} from "react"
import {useAutoAnimate} from "@formkit/auto-animate/react"
import {useBoolean, useCounter} from "usehooks-ts"
import useFocusOnRender from "@/lib/hooks/useFocusOnRender"
import useServerAction from "@/lib/hooks/useServerAction"
import {twMerge} from "tailwind-merge"
import {ArrowPathIcon} from "@heroicons/react/20/solid"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  /**
   * Load more button text/element.
   */
  buttonText?: string | JSX.Element
  /**
   * Attributes for the <ul> container.
   */
  ulProps?: HtmlHTMLAttributes<HTMLUListElement>
  /**
   * Attributes for each <li> element.
   */
  liProps?: HtmlHTMLAttributes<HTMLLIElement>
  /**
   * The number of items per page.
   */
  itemsPerPage?: number
  /**
   * Elements to display initially.
   */
  children: JSX.Element[]
  /**
   * Server action callback to fetch the next "page" contents.
   */
  loadPage?: (_page: number) => Promise<JSX.Element>
  /**
   * Count of the total number of items of all pages.
   */
  totalItems: number
}

const LoadMoreList = ({buttonText, children, ulProps, liProps, totalItems, loadPage, ...props}: Props) => {
  const id = useId()
  const {count: page, increment: incrementPage} = useCounter(0)
  const [items, setItems] = useState<JSX.Element[]>(children)
  const {value: focusOnElement, setTrue: enableFocusElement, setFalse: disableFocusElement} = useBoolean(false)
  const [runLoadPage, isPending] = useServerAction(loadPage)

  const focusItemRef = useRef<HTMLLIElement>(null)
  const [animationParent] = useAutoAnimate<HTMLUListElement>()

  const showMoreItems = () => {
    if (loadPage) {
      runLoadPage(page + 1)
        .then(results => {
          const resultChildren = results?.props.children
          setItems([...items, ...resultChildren])

          enableFocusElement()
          incrementPage()
        })
        .catch(_e => console.warn("An error happened"))
    }
  }

  const setFocusOnItem = useFocusOnRender(focusItemRef, false)

  useLayoutEffect(() => {
    if (focusOnElement) setFocusOnItem()
  }, [focusOnElement, setFocusOnItem])

  return (
    <div {...props} className={twMerge("relative", props.className)}>
      {isPending && (
        <div className="absolute left-0 top-0 z-20 h-full w-full bg-black-30 bg-opacity-80">
          <div className="absolute bottom-20 left-1/2 -translate-x-[25px]">
            <ArrowPathIcon className="animate-spin" width={50} />
          </div>
        </div>
      )}
      <ul {...ulProps} ref={animationParent}>
        {items.map((item, i) => (
          <li
            key={`${id}--${i}`}
            ref={i === children.length * page ? focusItemRef : null}
            tabIndex={i === children.length * page && focusOnElement ? 0 : undefined}
            onBlur={disableFocusElement}
            {...liProps}
          >
            {item}
          </li>
        ))}
      </ul>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {items.length} items.
      </span>

      {items.length < totalItems && (
        <button
          type="button"
          className="cta-button group rs-mt-neg1 mx-auto block w-fit rounded-full bg-digital-red px-26 pb-11 pt-10 text-16 font-semibold leading-display text-white no-underline transition-colors hover:bg-cardinal-red-dark focus:bg-black-true active:bg-black-true hocus:text-white hocus:underline md:text-18"
          onClick={showMoreItems}
        >
          {buttonText ? buttonText : "Load more"}
        </button>
      )}
    </div>
  )
}
export default LoadMoreList
