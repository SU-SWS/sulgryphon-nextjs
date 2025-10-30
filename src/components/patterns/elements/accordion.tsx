"use client"

import {HTMLAttributes, JSX, useId} from "react"
import {useBoolean} from "usehooks-ts"
import {ChevronDownIcon} from "@heroicons/react/20/solid"
import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export type AccordionHeaderChoice = "h2" | "h3" | "h4" | "h5"

type Props = HTMLAttributes<HTMLElement> & {
  /**
   * Button clickable element or string.
   */
  button: JSX.Element | string
  /**
   * Heading level element.
   */
  headingLevel?: AccordionHeaderChoice
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
}

const Accordion = ({
  button,
  children,
  headingLevel = "h2",
  onClick,
  isVisible,
  initiallyVisible = false,
  buttonProps,
  panelProps,
  ...props
}: Props) => {
  const {value: expanded, toggle: toggleExpanded} = useBoolean(initiallyVisible)
  const id = useId()

  const onButtonClick = () => {
    if (onClick) {
      onClick()
    } else {
      toggleExpanded()
    }
  }

  // When the accordion is externally controlled.
  const isExpanded = onClick ? isVisible : expanded
  const Heading = headingLevel ? headingLevel : "h2"

  return (
    <section aria-labelledby={`${id}-button`} {...props}>
      <Heading id={`${id}-button`} className={clsx({"text-28": headingLevel === "h3"})}>
        <button
          {...buttonProps}
          className={twMerge("flex w-full items-center text-left hocus-visible:underline", buttonProps?.className)}
          aria-expanded={isExpanded}
          aria-controls={`${id}-panel`}
          onClick={onButtonClick}
        >
          {button}
          <ChevronDownIcon
            height={30}
            className={twMerge("ml-auto shrink-0 duration-150", clsx({"rotate-180": isExpanded}))}
          />
        </button>
      </Heading>

      <div
        {...panelProps}
        id={`${id}-panel`}
        className={twMerge(isExpanded ? "mb-20 block" : "hidden", panelProps?.className)}
        role="region"
        aria-labelledby={`${id}-button`}
      >
        {children}
      </div>
    </section>
  )
}
export default Accordion
