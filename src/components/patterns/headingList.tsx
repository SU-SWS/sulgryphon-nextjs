"use client"

import React, {useCallback, useEffect, useMemo, useState} from "react"
import {twMerge} from "tailwind-merge"
import {useDebounceCallback, useEventListener} from "usehooks-ts"

type Heading = {
  text: string
  id: string
  isDuplicateLink: boolean
}

type PageLink = {
  text: string
  href: string
  context: string
}

const HeadingList = () => {
  const [headings, setHeadings] = useState<Array<Heading>>([])
  const [activeHeading, setActiveHeading] = useState<string>("")
  const [pageH1, setPageH1] = useState<string>("")

  const getPageContext = (element: Element): string => {
    if (element.closest("nav")) return "navigation"
    if (element.closest("footer")) return "footer"
    if (element.closest("header")) return "header"
    if (element.closest("main")) return "main"
    return "other"
  }

  // Memoized duplicate links detection
  const duplicateLinksMap = useMemo(() => {
    if (typeof document === "undefined") {
      return new Set<string>()
    }

    const linkGroups = new Map<string, PageLink[]>()

    document.querySelectorAll("a").forEach(link => {
      const text = link.textContent?.trim()
      if (text) {
        const pageLink: PageLink = {
          text,
          href: link.getAttribute("href") || "",
          context: getPageContext(link),
        }

        // Group links by text (case-insensitive)
        const key = text.toLowerCase()
        if (!linkGroups.has(key)) {
          linkGroups.set(key, [])
        }
        linkGroups.get(key)!.push(pageLink)
      }
    })

    // Find duplicates (multiple hrefs or contexts)
    const duplicates = new Set<string>()
    linkGroups.forEach((links, text) => {
      if (links.length > 1) {
        const uniqueHrefs = new Set(links.map(l => l.href))
        const uniqueContexts = new Set(links.map(l => l.context))
        if (uniqueHrefs.size > 1 || uniqueContexts.size > 1) {
          duplicates.add(text)
        }
      }
    })

    return duplicates
  }, [])

  const debouncedHandleScroll = useDebounceCallback(() => {
    const firstHeading = document.querySelector("#main-content h2:not([data-skip-heading])")
    if (!firstHeading || !activeHeading) return

    const headingRect = firstHeading.getBoundingClientRect()
    const isHeadingInBottom80 = headingRect.bottom > 0 && headingRect.bottom <= window.innerHeight * 0.8

    if (headingRect.bottom > 0 && (window.scrollY === 0 || !isHeadingInBottom80)) {
      setActiveHeading("")
    }
  }, 100)

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
    // Initialize page data
    const h1 = document.querySelector("h1")
    setPageH1(h1?.textContent?.trim() || "")

    const timeoutId = setTimeout(() => {
      const h2Elements = document.querySelectorAll("#main-content h2:not([data-skip-heading])")
      const allHeadings: Heading[] = []

      h2Elements.forEach(heading => {
        const headingText = heading.textContent
        if (!headingText) return

        const trimmedText = headingText.trim()

        // Ensure heading has an ID
        let id = heading.getAttribute("id")
        if (!id) {
          id = trimmedText.toLowerCase().replace(/\s+/g, "-")
          let newId = id
          let headingIndex = 0

          while (document.getElementById(newId)) {
            newId = `${id}-${headingIndex}`
            headingIndex++
          }
          heading.setAttribute("id", newId)
          id = newId
        }

        allHeadings.push({
          text: headingText,
          id,
          isDuplicateLink: duplicateLinksMap.has(trimmedText.toLowerCase()),
        })
      })

      setHeadings(allHeadings)

      // Set up intersection observer
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveHeading(entry.target.id)
            }
          })
        },
        {
          rootMargin: "0px 0px -80% 0px",
          threshold: 0,
        }
      )

      h2Elements.forEach(heading => observer.observe(heading))
      handleAnchor()

      return () => observer.disconnect()
    }, 250)

    return () => clearTimeout(timeoutId)
  }, [duplicateLinksMap, handleAnchor])

  useEventListener("scroll", debouncedHandleScroll)
  useEventListener("hashchange", handleAnchor)

  return (
    <nav aria-label="on this page menu">
      <h2 data-skip-heading className="type-1 hidden font-sans font-semibold lg:mb-8 lg:block">
        On this page
      </h2>
      <ul className="list-none p-0">
        {headings.map(heading => (
          <li key={heading.id} className="m-0 mb-2 lg:mb-12">
            <a
              href={`#${heading.id}`}
              aria-label={heading.isDuplicateLink && pageH1 ? `${pageH1}: ${heading.text}` : undefined}
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
