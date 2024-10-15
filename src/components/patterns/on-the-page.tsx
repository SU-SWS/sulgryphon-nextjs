"use client"

import React, {useState, useEffect} from "react"
import {Link, Maybe} from "@/lib/gql/__generated__/drupal.d"
import {twMerge} from "tailwind-merge"
import DrupalLink from "@/components/patterns/elements/drupal-link"
import Accordion from "./accordion"

interface OnThePageProps {
  relLinkHeading?: Maybe<string>
  relLinks?: Maybe<Link[]>
}

interface Heading {
  text: string
  id: string
}

const OnThePageLink = ({relLinkHeading, relLinks}: OnThePageProps) => {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeHeading, setActiveHeading] = useState<string>("")

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
        if (entry.isIntersecting) {
          setActiveHeading(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "0px 0px -80% 0px",
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
    <div>
      <div className="block w-full md:w-500 lg:hidden">
        <Accordion button="On the page" headingLevel="h3">
          <nav aria-label="on the page menu">
            <ul className="list-none p-0">
              {headings.map(heading => (
                <li key={heading.id} className="m-0 mb-2 cursor-pointer overflow-hidden text-black">
                  <a
                    href={`#${heading.id}`}
                    className="type-0 block px-10 py-2 font-sans font-normal leading-[30px] text-black no-underline hocus:bg-black-10 hocus:underline"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {relLinks && (
            <div>
              <h3 className="type-0 m-0 block px-10 py-2 font-sans font-semibold leading-[30px] text-cardinal-red">
                {relLinkHeading || "Related content"}
              </h3>
              <ul className="list-none p-0">
                {relLinks.map((link, index) => (
                  <li key={index} className="m-0 mb-2 cursor-pointer overflow-hidden text-black">
                    {link.url && (
                      <DrupalLink
                        href={link.url}
                        className="type-0 block px-10 py-2 font-sans font-normal leading-[30px] text-black no-underline hocus:bg-black-10 hocus:underline"
                      >
                        {link.title}
                      </DrupalLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Accordion>
      </div>
      <div className="sticky top-0 hidden h-fit w-300 bg-fog-light px-24 pb-40 pt-16 lg:block">
        <nav aria-label="on the page menu">
          <h3 className="type-1 font-sans font-semibold">On this page</h3>
          <ul className="list-none p-0">
            {headings.map(heading => (
              <li key={heading.id} className="mb-12">
                <a
                  href={`#${heading.id}`}
                  className={twMerge(
                    "type-0 block break-words border-l-4 pl-16 font-sans font-normal leading-[30px] text-black no-underline hocus:underline",
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
            <h3 className="type-1 font-sans font-semibold">{relLinkHeading || "Related content"}</h3>
            <ul className="list-none p-0">
              {relLinks.map((link, index) => (
                <li key={index} className="mb-12">
                  {link.url && (
                    <DrupalLink href={link.url} className="type-0 break-words font-sans font-normal leading-[30px]">
                      {link.title}
                    </DrupalLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default OnThePageLink
