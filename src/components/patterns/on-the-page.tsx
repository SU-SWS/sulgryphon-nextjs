"use client"

import React, {useState, useEffect, useMemo} from "react"
import parse from "html-react-parser"
import {NodeStanfordPage} from "@/lib/gql/__generated__/drupal.d"
import {twMerge} from "tailwind-merge"

interface Heading {
  text: string
  id: string
}

const OnThePageLink = ({node}: {node: NodeStanfordPage}) => {
  const [activeHeading, setActiveHeading] = useState<string>("")
  const relLinkHeading = node.sulRelLinksHeading
  const relLinks = node.sulRelLinks

  const headings = useMemo(() => {
    const content =
      node?.suPageComponents &&
      node?.suPageComponents
        .filter(item => item.__typename === "ParagraphStanfordWysiwyg")
        .map(item => item.suWysiwygText.processed)
        .join(" ")

    const parsedContent = parse(content)
    const headingsArr: Heading[] = []

    React.Children.forEach(parsedContent, child => {
      if (React.isValidElement(child) && child.type === "h2") {
        const text = child.props.children
        const id = text.toLowerCase().replace(/\s+/g, "-")
        headingsArr.push({text, id})
      }
    })

    return headingsArr
  }, [node])

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveHeading(entry.target.id)
        }
      })
    }, options)

    headings.forEach(({id}) => {
      const headingElement = document.getElementById(id)
      if (headingElement) {
        observer.observe(headingElement)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [headings])

  return (
    <div className="sticky top-0 h-fit bg-fog-light px-24 pb-40 pt-16">
      <nav>
        <h3 className="font-sans font-semibold">On this page</h3>
        <ul className="list-none p-0">
          {headings.map(heading => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={twMerge(
                  "type-1 border-l-4 pl-16 font-sans font-normal leading-[36px] text-black no-underline",
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
                <a href={link.url} className={twMerge("type-1 font-sans font-normal leading-[36px]")}>
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default OnThePageLink
