"use client";

import Conditional from "@/components/utils/conditional";
import formatHtml from "@/lib/format-html";
import NodeCardDisplay from "@/components/node/node-card";
import {DrupalLinkButton} from "@/components/patterns/link";
import {PropsWithoutRef, useEffect, useRef} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {DrupalLink} from "@/lib/drupal/drupal";
import useIsCentered from "@/lib/hooks/useIsCentered";
import {useInView} from "react-intersection-observer";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import useDataFetch from "@/lib/hooks/useDataFetch";
import {DrupalNode} from "next-drupal";
import AboveHeaderBorder from "@/components/patterns/above-header-border";

interface EntityProps extends PropsWithoutRef<any> {
  headline?: string
  description?: string
  link?: DrupalLink
  entities: DrupalNode[]
  styles?: {
    orientation?: string
    background
  }
  fullWidth?: boolean
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

const StanfordEntityComponent = ({headline, description, link, entities = [], styles, fullWidth = true, ...props}: EntityProps) => {
  const {ref, inView} = useInView();
  const centeredRef = useRef(null);
  const isCentered = useIsCentered(centeredRef);
  entities = entities.filter(entity => entity.type !== 'unknown')

  const gridColClasses = {
    1: 'su-grid-cols-1',
    2: '@3xl:su-grid-cols-2',
    3: '@5xl:su-grid-cols-3',
  }

  const gridCols = entities.length >= 3 ? gridColClasses[3] : gridColClasses[entities.length];
  const wrapperClasses = styles?.background === 'black' ? 'su-text-white su-py-40' : '';


  return (
    // @ts-ignore
    <div className={"su-@container su-relative su-max-w-1500 su-w-full su-mx-auto" + (fullWidth ? " su-px-40 3xl:su-px-0" : "")}
         ref={ref} {...props}>
      <div ref={centeredRef} className={wrapperClasses}>
        <Conditional showWhen={styles?.background === 'black'}>
          <div
            className={"su-absolute su-z-[-10] su-h-full su-top-0 su-bg-black-true " + (isCentered ? "su-w-screen su-left-[calc(-50vw+50%)]" : "su-w-full")}/>
        </Conditional>

        {headline &&
          <h2 className="su-text-left su-type-5 su-mb-40">
            <AboveHeaderBorder/>
            {headline}
          </h2>
        }
        {description &&
          <div className="su-mb-40">{formatHtml(description)}</div>
        }

        {entities &&
          <div className={"su-mb-40 su-grid su-gap-2xl " + gridCols} aria-live="polite">
            {entities.map((item, i) =>
              <div key={item.id}
                   className={((i + 1 === entities.length || i + 1 % 3 === 0) ? "su-max-w-[980px] su-mx-auto" : "su-relative before:su-content-[''] before:su-w-1 before:su-absolute before:su-top-0 before:su-h-full before:su-right-[-25px] lg:before:su-bg-black-30")}>
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

  const {data, isRefetchError, isSuccess, refetch} = useDataFetch(`/api/entity/${node.type}/${node.id}`, [], {enabled: false})

  useEffect(() => {
    if (loadData && !isRefetchError && !isSuccess) refetch();
  }, [loadData])

  return (
    <NodeCardDisplay node={data ?? node}/>
  )
}


export default StanfordEntity;