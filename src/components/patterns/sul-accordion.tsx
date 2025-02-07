"use client"

import {HTMLAttributes, JSX, useId} from "react"
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/20/solid"
import {twMerge} from "tailwind-merge"
import useAccordion from "@/lib/hooks/useAccordion"

type Props = HTMLAttributes<HTMLElement> & {
  /**
   * Button clickable element or string.
   */
  button: JSX.Element | string
  /**
   * Heading level element.
   */
  headingLevel?: "h2" | "h3" | "h4"
  /**
   * If the accordion should be visible on first render.
   */
  initiallyVisible?: boolean
  /**
   * Button click event if the component is controlled.
   */
  onClick?: () => void
  /**
   * Panel visibility state if the component is controlled.
   */
  isVisible?: boolean
  /**
   * Extra attributes on the button element.
   */
  buttonProps?: HTMLAttributes<HTMLButtonElement>
  /**
   * Extra attributes on the panel element.
   */
  panelProps?: HTMLAttributes<HTMLDivElement>
  headingProps?: HTMLAttributes<HTMLHeadingElement> & {[_key: string]: string}
}

const SulAccordion = ({button, children, headingLevel = "h2", ...props}: Props) => {
  const id = useId()
  const {buttonProps, panelProps, expanded, ref} = useAccordion({buttonId: `${id}-button`})

  const Heading = headingLevel === "h2" ? "h2" : headingLevel === "h3" ? "h3" : "h3"
  return (
    <section
      {...props}
      ref={ref}
      aria-labelledby={`${id}-button`}
      className={twMerge("relative w-full", props.className)}
    >
      <Heading className="type-0 mb-0 font-sans font-semibold" {...props.headingProps}>
        <button
          {...buttonProps}
          className={twMerge(
            "relative flex w-full items-center justify-between rounded-full border border-black-40 px-5 py-9 pl-15 text-left",
            buttonProps?.className
          )}
        >
          {button}
          <span className="grow-1 m-4 font-normal text-black transition">
            {expanded && <ChevronUpIcon height={20} className="ml-auto shrink-0" />}

            {!expanded && <ChevronDownIcon height={20} className="ml-auto shrink-0" />}
          </span>
        </button>
      </Heading>

      <div
        {...panelProps}
        className={twMerge(
          "max-h-[300px] w-full overflow-y-scroll border border-black-20 bg-white shadow-lg",
          panelProps.className
        )}
      >
        <div>{children}</div>
      </div>
    </section>
  )
}
export default SulAccordion
