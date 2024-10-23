"use client"

import React, {useEffect, useId, useState} from "react"
import {twMerge} from "tailwind-merge"
import {useDebounceCallback, useEventListener} from "usehooks-ts"

type Heading = {
  text: string
  id: string
}

const HeadingList = () => {
  const uuid = useId()
  const [headings, setHeadings] = useState<Array<Heading>>([])
  const [activeHeading, setActiveHeading] = useState<string>("")

  const debouncedHandleScroll = useDebounceCallback(() => {
    const firstHeading = document.querySelector("#main-content h2")

    if (firstHeading) {
      const headingRect = firstHeading.getBoundingClientRect()

      const isHeadingInBottom80 = headingRect.bottom > 0 && headingRect.bottom <= window.innerHeight * 0.8

      // The headingRect.bottom is negative if the element is above the current
      // window position. We only want to check when the user scrolls up.
      if (activeHeading && headingRect.bottom > 0 && (window.scrollY === 0 || !isHeadingInBottom80)) {
        setActiveHeading("")
      }
    }
  }, 100)

  useEventListener("scroll", debouncedHandleScroll)

  useEffect(() => {
    const h2Elements: NodeListOf<HTMLHeadingElement> = document.querySelectorAll("#main-content h2")

    const allHeadings: Heading[] = []

    h2Elements.forEach(heading => {
      const headingText = heading.textContent
      // Make sure the heading has text.
      if (!headingText) return

      let id = heading.getAttribute("id")
      if (!id) {
        id = headingText.trim().toLowerCase().replace(/\s+/g, "-") || uuid
        let newId = id
        let headingIndex = 0

        // Make sure the new id attribute is unique on this page.
        while (document.getElementById(newId)) {
          newId = `${id}-${headingIndex}`
          headingIndex++
        }
        heading.setAttribute("id", id)
      }

      allHeadings.push({text: headingText || "", id})
    })

    setHeadings(allHeadings)

    const observerCallback: IntersectionObserverCallback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveHeading(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 1.0,
    })

    h2Elements.forEach(heading => observer.observe(heading))

    return () => {
      observer.disconnect()
    }
  }, [uuid])

  return (
    <nav aria-label="on this page menu">
      <h3 className="type-1 hidden font-sans font-semibold lg:mb-8 lg:block">On this page</h3>
      <ul className="list-none p-0">
        {headings.map(heading => (
          <li key={heading.id} className="m-0 mb-2 lg:mb-12">
            <a
              href={`#${heading.id}`}
              className={twMerge(
                "type-0 block break-words px-10 py-2 font-sans font-normal leading-[30px] text-black no-underline hocus:bg-black-10 hocus:underline lg:border-l-4 lg:p-0 lg:pl-16 lg:hocus:bg-transparent",
                activeHeading === heading.id ? "border-cardinal-red" : "border-transparent"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default HeadingList
