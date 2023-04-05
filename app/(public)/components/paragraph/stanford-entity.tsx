"use client";

import Conditional from "../utils/conditional";
import formatHtml from "@/lib/format-html";
import NodeCardDisplay from "@/components/node/node-card";
import {DrupalLinkButton} from "../patterns/link";
import {PropsWithoutRef, useEffect, useRef} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {DrupalLink, DrupalWysiwyg} from "@/lib/drupal/drupal";
import useIsCentered from "@/lib/hooks/useIsCentered";
import {useInView} from "react-intersection-observer";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import useDataFetch from "@/lib/hooks/useDataFetch";
import {DrupalNode} from "next-drupal";

interface EntityProps extends PropsWithoutRef<any>{
  headline?: string
  description?: DrupalWysiwyg
  link?: DrupalLink
  entities: DrupalNode[]
  styles?: {
    orientation?: string
    background
  }
  siblingCount?: number
}

const StanfordEntity = (props: EntityProps) => {
  return (
    <ErrorBoundary
      fallback={<></>}
      onError={e => console.error(e.message)}
    >
      <CachedClientFetch>
        <StanfordEntityComponent {...props}/>
      </CachedClientFetch>
    </ErrorBoundary>
  )
}

const StanfordEntityComponent = ({headline,description, link, entities = [], styles, siblingCount = 0, ...props}: EntityProps) => {
  const {ref, inView} = useInView();
  const centeredRef = useRef(null);

  const isCentered = useIsCentered(centeredRef);

  const gridColClasses = {
    1: 'su-grid-cols-1',
    2: 'lg:su-grid-cols-2',
    3: 'lg:su-grid-cols-3',
  }

  const gridCols = entities.length >= 3 ? gridColClasses[3] : gridColClasses[entities.length];
  const wrapperClasses = styles?.background === 'black' ? 'su-text-white su-py-40' : '';

  return (
    // @ts-ignore
    <div ref={ref} {...props}>
      <div ref={centeredRef} className={wrapperClasses}>
        <Conditional showWhen={styles?.background === 'black'}>
          <div
            className={"su-absolute su-z-[-10] su-h-full su-top-0 su-bg-black-true " + (isCentered ? "su-w-screen su-left-[calc(-50vw+50%)]" : "su-w-full")}/>
        </Conditional>

        {headline && <h2 className="su-text-center su-type-5">{headline}</h2>}
        {description?.processed &&
          <div className="su-mb-40">{formatHtml(description.processed)}</div>}

        {entities &&
          <div className={"su-my-40 su-grid su-gap-2xl " + (siblingCount > 0 ? "" : gridCols)}>
            {entities.map((item, i) =>
              <div key={item.id}
                   className={((i + 1 === entities.length || i + 1 % 3 === 0) ? "" : "su-relative before:su-content-[''] before:su-w-1 before:su-absolute before:su-top-0 before:su-h-full before:su-right-[-25px] lg:before:su-bg-black-30")}>
                <TeaserItem node={item} key={item.id} loadData={inView}/>
              </div>
            )}
          </div>
        }
        {link?.url &&
          <DrupalLinkButton href={link?.url} className="su-block su-mx-auto">
            {link.title}
          </DrupalLinkButton>
        }
      </div>
    </div>
  )

}

const TeaserItem = ({node, loadData}) => {
  const {data, refetch} = useDataFetch(`/api/entity/${node.type}/${node.id}`, [], {enabled: false, placeholderData: node})

  useEffect(() => {
    if (loadData) refetch();
  }, [loadData])

  return (
    <NodeCardDisplay node={data}/>
  )
}


export default StanfordEntity;