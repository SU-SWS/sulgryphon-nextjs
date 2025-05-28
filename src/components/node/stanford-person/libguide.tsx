"use client"

import Link from "@/components/patterns/elements/drupal-link"
import {HTMLAttributes, useEffect, useId, useRef, useState} from "react"
import {useAutoAnimate} from "@formkit/auto-animate/react"
import {LibGuide} from "@/lib/drupal/drupal"

type Props = HTMLAttributes<HTMLDivElement> & {
  guides: LibGuide[]
  heading?: string
}

const LibGuides = ({heading, guides}: Props) => {
  const firstGuides = guides.slice(0, 5)
  const moreGuides = guides.slice(5)
  const moreGuideRef = useRef<HTMLAnchorElement>(null)
  const buttonRef = useRef(null)
  const [showMore, setShowMore] = useState(true)
  const [parent] = useAutoAnimate()
  const containerId = useId()

  useEffect(() => {
    if (!showMore) {
      moreGuideRef.current?.focus()
    }
  }, [showMore])

  return (
    <>
      <ul ref={parent} id={containerId} className="relative p-0 children:rs-mb-0 last:children:mb-0">
        {firstGuides.map(guide => (
          <li key={guide.id}>
            <Link href={guide.url}>{guide.title}</Link>
          </li>
        ))}

        {moreGuides.length > 0 && !showMore && (
          <>
            {moreGuides.map((guide, i) => (
              <li key={guide.id}>
                <Link href={guide.url} ref={i === 0 ? moreGuideRef : undefined}>
                  {guide.title}
                </Link>
              </li>
            ))}
          </>
        )}
      </ul>

      {moreGuides.length > 0 && (
        <button
          className="button mt-20 block"
          ref={buttonRef}
          onClick={() => setShowMore(!showMore)}
          aria-expanded={!showMore}
          aria-controls={containerId}
        >
          {showMore ? `Show ${moreGuides.length} More` : "Show Less"} <span className="sr-only">{heading}</span>
        </button>
      )}
    </>
  )
}
export default LibGuides
