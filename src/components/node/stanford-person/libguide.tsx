"use client";

import Link from "@/components/patterns/elements/drupal-link";
import {HTMLAttributes, useEffect, useId, useRef, useState} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {LibGuide} from "@/lib/drupal/drupal";

type Props = HTMLAttributes<HTMLDivElement> & {
  guides: LibGuide[]
  headingLevel?: number
}

const LibGuides = ({guides, headingLevel = 2, ...props}: Props) => {
  const courseGuides = guides.filter(guide => guide.type === 'Course Guide');
  const genPurposeGuides = guides.filter(guide => guide.type === 'General Purpose Guide');
  const subjectGuides = guides.filter(guide => guide.type === "Subject Guide")
  const topicGuides = guides.filter(guide => guide.type === 'Topic Guide');

  return (
    <div {...props}>
      {(courseGuides.length > 0) &&
        <div className="mb-40">
          {headingLevel === 2 && <h2 className="type-1">Course Guides</h2>}
          {headingLevel === 3 && <h3 className="type-1">Course Guides</h3>}
          <LibGuideSection heading="Course Guides" guides={courseGuides}/>
        </div>
      }

      {genPurposeGuides.length > 0 &&
        <div className="mb-40">
          {headingLevel === 2 && <h2 className="type-1">General Purpose Guides</h2>}
          {headingLevel === 3 && <h3 className="type-1">General Purpose Guides</h3>}
          <LibGuideSection heading="General Purpose Guides" guides={genPurposeGuides}/>
        </div>
      }

      {subjectGuides.length > 0 &&
        <div className="mb-40">
          {headingLevel === 2 && <h2 className="type-1">Subject Guides</h2>}
          {headingLevel === 3 && <h3 className="type-1">Subject Guides</h3>}
          <LibGuideSection heading="Subject Guides" guides={subjectGuides}/>
        </div>
      }

      {(topicGuides.length > 0) &&
        <div className="mb-40">
          {headingLevel === 2 && <h2 className="type-1">Topic Guides</h2>}
          {headingLevel === 3 && <h3 className="type-1">Topic Guides</h3>}
          <LibGuideSection heading="Topic Guides" guides={topicGuides}/>
        </div>
      }

    </div>
  )
}

const LibGuideSection = ({heading, guides}: { heading: string, guides: LibGuide[] }) => {
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

        {(moreGuides.length > 0 && !showMore) &&
          <>
            {moreGuides.map((guide, i) =>
              <li key={guide.id}>
                <Link href={guide.url} ref={i === 0 ? moreGuideRef : undefined}>{guide.title}</Link>
              </li>
            )}
          </>
        }
      </ul>

      {moreGuides.length > 0 &&
        <button
          className="mt-20 button block"
          ref={buttonRef}
          onClick={() => setShowMore(!showMore)}
          aria-expanded={!showMore}
          aria-controls={containerId}
        >
          {showMore ? `Show ${moreGuides.length} More` : 'Show Less'} <span className="sr-only">{heading}</span>
        </button>
      }
    </>
  )
}
export default LibGuides;
