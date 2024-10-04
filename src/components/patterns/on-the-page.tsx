"use client"

import React, {useState, useEffect} from "react"
import parse from "html-react-parser"
import {NodeStanfordPage} from "@/lib/gql/__generated__/drupal.d"

interface Heading {
  text: string
  id: string
}

const OnThePageLink = ({node}: {node: NodeStanfordPage}) => {
  const [activeHeading, setActiveHeading] = useState<string>("")
  const headings: Heading[] = []

  const content =
    node.suPageComponents &&
    node.suPageComponents
      .filter(item => item.__typename === "ParagraphStanfordWysiwyg")
      .map(item => item.suWysiwygText.processed)
      .join(" ")

  console.log("CONTENT", content)

  const parsedContent = parse(content)

  React.Children.forEach(parsedContent, child => {
    if (React.isValidElement(child) && child.type === "h2") {
      const text = child.props.children
      const id = text.toLowerCase().replace(/\s+/g, "-")
      headings.push({text, id})
    }
  })

  // Set up Intersection Observer
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
    <nav>
      <h2>Jump to:</h2>
      <ul>
        {headings.map(heading => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              style={{
                fontWeight: activeHeading === heading.id ? "bold" : "normal",
                color: activeHeading === heading.id ? "blue" : "black",
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default OnThePageLink
