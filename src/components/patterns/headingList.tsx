"use client"

import React, {useCallback, useEffect, useState} from "react"
import cn from "@/lib/utils/className"
import {useDebounceCallback, useEventListener} from "usehooks-ts"

type Heading = {
  text: string
  id: string
  isDuplicateLink: boolean
}

const isVisible = (el: Element) =>
  el.checkVisibility({contentVisibilityAuto: true, opacityProperty: true, visibilityProperty: true})

const normalizeText = (el: Element) => el.textContent?.trim().replace(/\s+/g, " ") ?? ""

// Cache Components keeps previously visited pages in the DOM (hidden with display: none), each with its own
// #main-content, so only the visible one belongs to the current page.
const getMainContent = () => Array.from(document.querySelectorAll("#main-content")).find(isVisible)

// Visible h2 elements in the main content that are not opted out.
const getHeadingElements = () => {
  const mainContent = getMainContent()
  if (!mainContent) return []
  return Array.from(mainContent.querySelectorAll<HTMLHeadingElement>("h2:not([data-skip-heading])")).filter(
    el => !el.closest(".no-anchor, .sr-only") && isVisible(el)
  )
}

// Find the element for an id on the current page. A hidden page can hold an element with the same id.
const getVisibleElementById = (id: string) =>
  Array.from(document.querySelectorAll(`[id="${CSS.escape(id)}"]`)).find(isVisible)

const HeadingList = () => {
  const [headings, setHeadings] = useState<Array<Heading>>([])
  const [activeHeading, setActiveHeading] = useState<string>("")
  const [pageH1, setPageH1] = useState<string>("")

  const debouncedHandleScroll = useDebounceCallback(() => {
    const firstHeading = getHeadingElements()[0]
    if (!firstHeading || !activeHeading) return

    const headingRect = firstHeading.getBoundingClientRect()
    const isHeadingInBottom80 = headingRect.bottom > 0 && headingRect.bottom <= window.innerHeight * 0.8

    if (headingRect.bottom > 0 && (window.scrollY === 0 || !isHeadingInBottom80)) {
      setActiveHeading("")
    }
  }, 100)

  const handleAnchor = useCallback(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return

    const targetElement = getVisibleElementById(hash)
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({behavior: "smooth", block: "start"})
        setActiveHeading(hash)
      }, 100)
    }
  }, [])

  // Scan the visible page for headings, giving each one a valid, unique id.
  const scanHeadings = useCallback(() => {
    const mainContent = getMainContent()
    const elements = getHeadingElements()

    // Text of every link on the current page, skipping hidden pages. A heading that matches an existing link gets
    // the page title in its label, so the on-this-page link can be told apart.
    const linkTexts = new Set<string>()
    document.querySelectorAll("a").forEach(link => {
      const linkMainContent = link.closest("#main-content")
      if (linkMainContent && linkMainContent !== mainContent) return
      linkTexts.add(normalizeText(link).toLowerCase())
    })

    const existingIds = new Set<string>()
    const items: Heading[] = []

    elements.forEach(heading => {
      const text = normalizeText(heading)
      if (!text) return

      let id = heading.getAttribute("id")
      const hasInvalidId = id && (/^[^a-z]/i.test(id) || /[^a-z0-9-_]/i.test(id))

      if (!id || hasInvalidId) {
        id = text.toLowerCase().replace(/[^a-z0-9]/g, "-")
        if (/^[^a-z]/i.test(id)) id = `heading-${id}`

        let newId = id
        let headingIndex = 0
        while (mainContent?.querySelector(`#${CSS.escape(newId)}`) || existingIds.has(newId)) {
          newId = `${id}-${headingIndex}`
          headingIndex++
        }
        heading.setAttribute("id", newId)
        id = newId
      }

      existingIds.add(id)
      items.push({text, id, isDuplicateLink: linkTexts.has(text.toLowerCase())})
    })

    const h1 = mainContent?.querySelector("h1")
    setPageH1(h1 ? normalizeText(h1) : "")
    setHeadings(items)
    return elements
  }, [])

  useEffect(() => {
    let observer: IntersectionObserver | undefined

    // Give streamed content a moment to arrive before scanning.
    const timeoutId = setTimeout(() => {
      const elements = scanHeadings()

      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) setActiveHeading(entry.target.id)
          })
        },
        {rootMargin: "0px 0px -80% 0px", threshold: 0}
      )
      elements.forEach(heading => observer?.observe(heading))
      handleAnchor()
    }, 250)

    return () => {
      clearTimeout(timeoutId)
      observer?.disconnect()
    }
  }, [scanHeadings, handleAnchor])

  useEventListener("scroll", debouncedHandleScroll)
  useEventListener("hashchange", handleAnchor)

  if (headings.length === 0) return null

  return (
    <nav aria-label="on this page menu">
      <h2 data-skip-heading className="hidden font-sans type-1 font-semibold lg:mb-8 lg:block">
        On this page
      </h2>
      <ul className="list-none p-0">
        {headings.map(heading => (
          <li key={heading.id} className="m-0 mb-2 lg:mb-12">
            <a
              href={`#${heading.id}`}
              aria-label={heading.isDuplicateLink && pageH1 ? `${pageH1}: ${heading.text}` : undefined}
              className={cn(
                "block px-10 py-2 font-sans type-0 leading-normal font-normal wrap-anywhere text-black no-underline lg:border-l-4 lg:p-0 lg:pl-16 hocus:bg-black-10 hocus:underline lg:hocus:bg-transparent",
                {
                  "border-cardinal-red": activeHeading === heading.id,
                  "border-transparent": activeHeading !== heading.id,
                }
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
