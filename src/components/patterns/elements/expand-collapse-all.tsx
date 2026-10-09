"use client"

import {useBoolean} from "usehooks-ts"
import {HTMLAttributes, useEffect, useRef} from "react"
import {MinusIcon, PlusIcon} from "@heroicons/react/16/solid"
import {twMerge} from "tailwind-merge"

type Props = HTMLAttributes<HTMLButtonElement>

const ExpandCollapseAll = ({...props}: Props) => {
  const {value: expand, toggle} = useBoolean(true)
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const buttons = ref.current?.parentElement?.parentElement?.getElementsByTagName("button") || []
    for (let i = 0; i < buttons.length; i++) {
      if (!expand && buttons[i].getAttribute("aria-expanded") === "false") {
        buttons[i].click()
      }

      if (expand && buttons[i].getAttribute("aria-expanded") === "true") {
        buttons[i].click()
      }
    }
  }, [expand])

  return (
    <button
      ref={ref}
      onClick={toggle}
      {...props}
      className={twMerge(
        "cta-button group flex w-fit items-center gap-5 rounded-full border-2 border-digital-red px-26 pt-10 pb-11 text-16 leading-display font-semibold whitespace-nowrap text-digital-red no-underline transition-colors md:text-18 hocus:bg-cardinal-red hocus:text-white hocus:underline",
        props.className
      )}
    >
      {expand ? "Expand All" : "Collapse All"}
      {expand && <PlusIcon width={20} />}
      {!expand && <MinusIcon width={20} />}
    </button>
  )
}

export default ExpandCollapseAll
