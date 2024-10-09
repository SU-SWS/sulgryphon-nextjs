"use client"

import React, {useState, useEffect} from "react"
import {NodeStanfordNews, NodeStanfordPage, NodeSulLibrary} from "@/lib/gql/__generated__/drupal.d"
import {twMerge} from "tailwind-merge"
import DrupalLink from "./elements/drupal-link"

interface Heading {
  text: string
  id: string
}

const OnThePageLink = ({node}: {node: NodeStanfordPage | NodeStanfordNews | NodeSulLibrary}) => {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeHeading, setActiveHeading] = useState<string>("")

  const relLinkHeading = "sulRelLinksHeading" in node ? node.sulRelLinksHeading : undefined
  const relLinks = "sulRelLinks" in node ? node.sulRelLinks : undefined

  useEffect(() => {
    const wysiwygContainers: NodeListOf<Element> = document.querySelectorAll(".wysiwyg")

    const allHeadings: Heading[] = []

    wysiwygContainers.forEach((container, containerIndex) => {
      const h2Elements: HTMLHeadingElement[] = Array.from(container.querySelectorAll("h2"))

      h2Elements.forEach((heading, headingIndex) => {
        const id = `${heading.textContent?.trim().toLowerCase().replace(/\s+/g, "-")}-${containerIndex}-${headingIndex}`
        heading.setAttribute("id", id)
        allHeadings.push({text: heading.textContent || "", id})
      })
    })

    setHeadings(allHeadings)

    const observerCallback: IntersectionObserverCallback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          setActiveHeading(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-10px 0px 0px 0px",
      threshold: 0,
    })

    wysiwygContainers.forEach(container => {
      const h2Elements = container.querySelectorAll("h2")
      h2Elements.forEach(heading => observer.observe(heading))
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="sticky top-0 h-fit w-300 bg-fog-light px-24 pb-40 pt-16">
      <nav>
        <h3 className="font-sans font-semibold">On this page</h3>
        <ul className="list-none p-0">
          {headings.map(heading => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={twMerge(
                  "type-1 block border-l-4 pl-16 font-sans font-normal leading-[36px] text-black no-underline",
                  activeHeading === heading.id ? "border-cardinal-red" : "border-transparent"
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {relLinks && (
        <div className="mt-40">
          <h3 className="font-sans font-semibold">{relLinkHeading || "Related content"}</h3>
          <ul className="list-none p-0">
            {relLinks.map((link, index) => (
              <li key={index}>
                {link.url && (
                  <DrupalLink href={link.url} className={twMerge("type-1 font-sans font-normal leading-[36px]")}>
                    {link.title}
                  </DrupalLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default OnThePageLink
