"use client";

import Conditional from "@/components/utils/conditional";
import Link from "@/components/patterns/elements/drupal-link";
import {PropsWithoutRef, useEffect, useId, useRef, useState} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {LibGuide} from "@/lib/drupal/drupal";
import {ErrorBoundary} from "react-error-boundary";

interface Props extends PropsWithoutRef<any> {
  guides: LibGuide[]
  headingLevel?: number
}

const LibGuides = ({guides, headingLevel = 2, ...props}: Props) => {
  const courseGuides = guides.filter(guide => guide.type === 'Course Guide');
  const genPurposeGuides = guides.filter(guide => guide.type === 'General Purpose Guides');
  const subjectGuides = guides.filter(guides => guide.type === "Subject Guides")
  const topicGuides = guides.filter(guide => guide.type === 'Topic Guide');

  return (
    <div {...props}>
      <ErrorBoundary
        fallback={<></>}
        onError={e => console.error(e.message)}
      >
        <Conditional showWhen={courseGuides.length > 0}>
          <div className="mb-40">
            {headingLevel === 2 && <h2 className="type-1">Course Guides</h2>}
            {headingLevel === 3 && <h3 className="type-1">Course Guides</h3>}
            <LibGuideSection heading="Course Guides" guides={courseGuides}/>
          </div>
        </Conditional>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={<></>}
        onError={e => console.error(e.message)}
      >
        <Conditional showWhen={genPurposeGuides.length > 0}>
          <div className="mb-40">
            {headingLevel === 2 && <h2 className="type-1">General Purpose Guides</h2>}
            {headingLevel === 3 && <h2 className="type-1">General Purpose Guides</h2>}
            <LibGuideSection heading="Course Guides" guides={genPurposeGuides}/>
          </div>
        </Conditional>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={<></>}
        onError={e => console.error(e.message)}
      >
        <Conditional showWhen={subjectGuides.length > 0}>
          <div className="mb-40">
            {headingLevel === 2 && <h2 className="type-1">Topic Guides</h2>}
            {headingLevel === 3 && <h3 className="type-1">Topic Guides</h3>}
            <LibGuideSection heading="Topic Guides" guides={subjectGuides}/>
          </div>
        </Conditional>

      </ErrorBoundary>

      <ErrorBoundary
        fallback={<></>}
        onError={e => console.error(e.message)}
      >
        <Conditional showWhen={topicGuides.length > 0}>
          <div className="mb-40">
            {headingLevel === 2 && <h2 className="type-1">Topic Guides</h2>}
            {headingLevel === 3 && <h3 className="type-1">Topic Guides</h3>}
            <LibGuideSection heading="Topic Guides" guides={topicGuides}/>
          </div>
        </Conditional>
      </ErrorBoundary>
    </div>
  )
}

const LibGuideSection = ({heading, guides}: {heading: string, guides: LibGuide[]}) => {
  const firstGuides = guides.slice(0, 5);
  const moreGuides = guides.slice(5)
  const moreGuideRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef(null);
  const [showMore, setShowMore] = useState(true);
  const [parent] = useAutoAnimate();
  const containerId = useId();

  useEffect(() => {
    if (!showMore) {
      moreGuideRef.current?.focus()
    }
  }, [showMore])

  return (
    <>
      <ul ref={parent} id={containerId} className="list-unstyled relative">
        {firstGuides.map(guide =>
          <li key={guide.id}><Link href={guide.url}>{guide.title}</Link></li>
        )}

        <Conditional showWhen={moreGuides.length > 0}>
          <Conditional showWhen={!showMore}>
            {moreGuides.map((guide, i) =>
              <li key={guide.id}>
                <Link href={guide.url} ref={i === 0 ? moreGuideRef : undefined}>{guide.title}</Link>
              </li>
            )}
          </Conditional>
        </Conditional>
      </ul>

      <Conditional showWhen={moreGuides.length > 0}>
        <button
          className="mt-20 button block"
          ref={buttonRef}
          onClick={() => setShowMore(!showMore)}
          aria-expanded={!showMore}
          aria-controls={containerId}
        >
          {showMore ? `Show ${moreGuides.length} More` : 'Show Less'} <span className="sr-only">{heading}</span>
        </button>
      </Conditional>
    </>
  )
}
export default LibGuides;
