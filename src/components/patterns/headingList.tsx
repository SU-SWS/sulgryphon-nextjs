import React, {useEffect, useState} from "react"
import {twMerge} from "tailwind-merge"

interface Heading {
  text: string
  id: string
}

const HeadingList = () => {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeHeading, setActiveHeading] = useState<string>("")

  useEffect(() => {
    const wysiwygContainers: NodeListOf<Element> = document.querySelectorAll(".wysiwyg")

    const allHeadings: Heading[] = []

    wysiwygContainers.forEach((container, containerIndex) => {
      const h2Elements: HTMLHeadingElement[] = Array.from(container.querySelectorAll("h2"))

      h2Elements.forEach((heading, headingIndex) => {
        let id = heading.getAttribute("id")
        if (!id) {
          id = `${heading.textContent?.trim().toLowerCase().replace(/\s+/g, "-")}-${containerIndex}-${headingIndex}`
          heading.setAttribute("id", id)
        }

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

    const handleScroll = () => {
      if (window.scrollY === 0) {
        setActiveHeading("")
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav aria-label="on the page menu">
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
