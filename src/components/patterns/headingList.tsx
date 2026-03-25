"use client"

import React, {useCallback, useEffect, useState} from "react"
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
      // First, get all h2 headings
      const h2Elements = document.querySelectorAll("#main-content h2:not([data-skip-heading])")
      const headingTexts = new Set<string>()

      h2Elements.forEach(heading => {
        const text = heading.textContent?.trim().replace(/\s+/g, " ")
        if (text) {
          headingTexts.add(text.toLowerCase())
        }
      })

      // Now scan all links on the page
      const linksByText = new Map<string, PageLink[]>()

      document.querySelectorAll("a").forEach(link => {
        const text = link.textContent?.trim().replace(/\s+/g, " ")
        if (text) {
          const pageLink: PageLink = {
            text,
            href: link.getAttribute("href") || "",
            context: getPageContext(link),
          }

          const key = text.toLowerCase()
          if (!linksByText.has(key)) {
            linksByText.set(key, [])
          }
          linksByText.get(key)!.push(pageLink)
        }
      })

      // A heading is a duplicate if:
      // 1. There's already a link with that text elsewhere on the page
      // 2. OR there are multiple links with that text going to different places
      const duplicateLinksMap = new Set<string>()

      headingTexts.forEach(headingText => {
        const links = linksByText.get(headingText)
        if (links && links.length > 0) {
          // There's at least one other link with this text
          // (The on-this-page link will be added later, so any existing link means duplicate)
          duplicateLinksMap.add(headingText)
          console.log(`Duplicate found (heading matches existing link): "${headingText}"`, links)
        }
      })

      // Also check for same text -> different hrefs
      linksByText.forEach((links, text) => {
        if (links.length > 1) {
          const uniqueHrefs = new Set(links.map(l => l.href))
          if (uniqueHrefs.size > 1) {
            duplicateLinksMap.add(text)
            console.log(`Duplicate found (multiple hrefs): "${text}"`, links)
          }
        }
      })

      const allHeadings: Heading[] = []
      const existingIds = new Set<string>()

      h2Elements.forEach(heading => {
        const headingText = heading.textContent
        if (!headingText) return

        const trimmedText = headingText.trim().replace(/\s+/g, " ")
        const normalizedText = trimmedText.toLowerCase()

        // Get or generate a valid ID
        let id = heading.getAttribute("id")

        const hasInvalidId = id && (/^[^a-z]/i.test(id) || /[^a-z0-9-_]/i.test(id))

        if (!id || hasInvalidId) {
          id = trimmedText.toLowerCase().replace(/[^a-z0-9]/g, "-")

          if (/^[^a-z]/i.test(id)) {
            id = `heading-${id}`
          }

          let newId = id
          let headingIndex = 0

          while (document.getElementById(newId) || existingIds.has(newId)) {
            newId = `${id}-${headingIndex}`
            headingIndex++
          }
          heading.setAttribute("id", newId)
          id = newId
        }

        existingIds.add(id)

        const isDupe = duplicateLinksMap.has(normalizedText)

        allHeadings.push({
          text: headingText,
          id,
          isDuplicateLink: isDupe,
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
  }, [handleAnchor])

  useEventListener("scroll", debouncedHandleScroll)
  useEventListener("hashchange", handleAnchor)

  if (headings.length === 0) {
    return null
  }

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
