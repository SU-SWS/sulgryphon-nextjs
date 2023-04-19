"use client";

import Conditional from "@/components/utils/conditional";
import Link from "next/link";
import {useEffect, useId, useRef, useState} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {LibGuide} from "@/lib/drupal/drupal";
import {ErrorBoundary} from "react-error-boundary";

const LibGuides = ({guides, headingLevel = 2}: { guides: LibGuide[], headingLevel?: number }) => {
  const courseGuides = guides.filter(guide => guide.type === 'Course Guide');
  const topicGuides = guides.filter(guide => guide.type === 'Topic Guide');

  return (
    <div>
      <ErrorBoundary
        fallback={<></>}
        onError={e => console.error(e.message)}
      >
        <Conditional showWhen={courseGuides.length > 0}>
          {headingLevel === 2 && <h2>Course Guides</h2>}
          {headingLevel === 3 && <h3>Course Guides</h3>}
          <LibGuideSection heading="Course Guides" guides={courseGuides}/>
        </Conditional>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={<></>}
        onError={e => console.error(e.message)}
      >
        <Conditional showWhen={topicGuides.length > 0}>
          {headingLevel === 2 && <h2>Topic Guides</h2>}
          {headingLevel === 3 && <h3>Topic Guides</h3>}
          <LibGuideSection heading="Topic Guides" guides={topicGuides}/>
        </Conditional>
      </ErrorBoundary>
    </div>
  )
}

const LibGuideSection = ({heading, guides}) => {
  const firstGuides = guides.slice(0, 5);
  const moreGuides = guides.slice(5)
  const moreGuideRef = useRef(null);
  const buttonRef = useRef(null);
  const [showMore, setShowMore] = useState(true);
  const [parent] = useAutoAnimate();
  const containerId = useId();

  useEffect(() => {
    if (!showMore) {
      // @ts-ignore
      moreGuideRef?.current?.focus()
    }
  }, [showMore])

  return (
    <>
      <ul ref={parent} id={containerId} className="su-list-unstyled su-relative">
        {firstGuides.map(guide =>
          <li key={guide.id}><Link href={guide.url}>{guide.title}</Link></li>
        )}

        <Conditional showWhen={moreGuides.length > 0}>
          <Conditional showWhen={!showMore}>
            {moreGuides.map((guide, i) =>
              <li key={guide.id}>
                <Link href={guide.url} ref={i === 0 ? moreGuideRef : null}>{guide.title}</Link>
              </li>
            )}
          </Conditional>
        </Conditional>
      </ul>

      <Conditional showWhen={moreGuides.length > 0}>
        <button
          className="su-button su-mx-auto su-block"
          ref={buttonRef}
          onClick={() => setShowMore(!showMore)}
          aria-expanded={!showMore}
          aria-controls={containerId}
        >
          {showMore ? `Show ${moreGuides.length} More` : 'Show Less'} <span className="su-sr-only">{heading}</span>
        </button>
      </Conditional>
    </>
  )
}
export default LibGuides;