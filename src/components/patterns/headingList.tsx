"use client"

import React, {useCallback, useEffect, useId, useState} from "react"
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
    const firstHeading = document.querySelector("#main-content h2:not([data-skip-heading])")

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

  // Handle initial anchor link on page load and handle hash changes with useEventListener
  const handleAnchor = useCallback(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      const targetElement = document.getElementById(hash)
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({behavior: "smooth", block: "start"})
          setActiveHeading(hash)
        }, 100)
      }
    }
  }, [])

  useEffect(() => {
    /**
     * Delays execution to ensure that all dynamically rendered <h2> elements
     * are present in the DOM before assigning IDs. This is necessary because
     * at certain breakpoints, people cards are swapped out conditionally,
     * causing IDs to be removed. The timeout ensures the effect apply after
     * the DOM updates, preventing missing IDs that break anchor links.
     */
    const timeoutId = setTimeout(() => {
      const h2Elements = document.querySelectorAll("#main-content h2:not([data-skip-heading])")

      const allHeadings: Heading[] = []

      h2Elements.forEach(heading => {
        const headingText = heading.textContent
        if (!headingText) return

        let id = heading.getAttribute("id")
        if (!id) {
          id = headingText.trim().toLowerCase().replace(/\s+/g, "-")
          let newId = id
          let headingIndex = 0

          while (document.getElementById(newId)) {
            newId = `${id}-${headingIndex}`
            headingIndex++
          }
          heading.setAttribute("id", newId)
          id = newId
        }

        allHeadings.push({text: headingText, id})
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
        rootMargin: "0px 0px -80% 0px",
        threshold: 0,
      })

      h2Elements.forEach(heading => observer.observe(heading))

      // Check for anchor on initial load
      handleAnchor()

      return () => {
        clearTimeout(timeoutId)
        observer.disconnect()
      }
    }, 250)
  }, [handleAnchor, uuid])

  useEventListener("hashchange", handleAnchor)

  return (
    <nav aria-label="on this page menu">
      <h2 data-skip-heading="true" className="type-1 hidden font-sans font-semibold lg:mb-8 lg:block">
        On this page
      </h2>
      <ul className="list-none p-0">
        {headings.map(heading => (
          <li key={heading.id} className="m-0 mb-2 lg:mb-12">
            <a
              href={`#${heading.id}`}
              className={twMerge(
                "type-0 block break-words px-10 py-2 font-sans font-normal leading text-black no-underline hocus:bg-black-10 hocus:underline lg:border-l-4 lg:p-0 lg:pl-16 lg:hocus:bg-transparent",
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
