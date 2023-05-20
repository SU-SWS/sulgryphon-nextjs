"use client";

import {DrupalViewField, DrupalLink as DrupalLinkProps} from "@/lib/drupal/drupal";
import formatHtml from "@/lib/format-html";
import {DrupalLink} from "@/components/patterns/link";
import {DrupalNode} from "next-drupal";
import NodeCardDisplay from "@/components/node/node-card";
import NodeListDisplay from "@/components/node/node-list-display";
import AboveHeaderBorder from "@/components/patterns/above-header-border";
import {ErrorBoundary} from "react-error-boundary";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import useDataFetch from "@/lib/hooks/useDataFetch";
import Loading from "@/components/patterns/icons/loading";
import StudyPlaceFilteringList from "@/components/views/study-places";
import {useInView} from "react-intersection-observer";
import {PropsWithoutRef, useEffect} from "react";

interface ListProps extends PropsWithoutRef<any> {
  headline?: string
  description?: string
  link?: DrupalLinkProps
  view?: DrupalViewField
  styles?: {
    list_paragraph: { hide_empty?: boolean, empty_message?: string }
    sul_list_styles: { link_display_style?: string }
  }
  fullWidth?: boolean
}

const StanfordLists = (props: ListProps) => {
  return (
    <ErrorBoundary
      fallback={<></>}
      onError={e => console.error(e.message)}
    >
      <CachedClientFetch>
        <StanfordListsComponent {...props}/>
      </CachedClientFetch>
    </ErrorBoundary>
  )
}


const StanfordListsComponent = ({headline, description, link, view, styles, fullWidth = true, ...props}: ListProps) => {
  const {ref, inView} = useInView()

  const viewId = view?.resourceIdObjMeta.drupal_internal__target_id
  const displayId = view?.resourceIdObjMeta.display_id;
  const args = view?.resourceIdObjMeta.arguments;
  const numToDisplay = view?.resourceIdObjMeta.items_to_display;

  const hideEmpty = styles?.list_paragraph?.hide_empty;
  const emptyMessage = styles?.list_paragraph?.empty_message;

  const apiUrl = args || numToDisplay ? `/api/views/${viewId}/${displayId}/${args}:${numToDisplay}` : `/api/views/${viewId}/${displayId}`;

  const {isLoading, data, isSuccess, isRefetchError, refetch} = useDataFetch(apiUrl, [], {enabled: false})

  useEffect(() => {
    if (inView && viewId && displayId && !isSuccess && !isRefetchError) refetch()
  }, [inView])

  const itemsToDisplay = isLoading ? [] : data;

  const displayNotGrid = () => {
    if (view?.resourceIdObjMeta?.display_id !== 'grid_list_all') {
      return view?.resourceIdObjMeta?.display_id;
    }
    return false;
  }

  const isList = useListDisplay(view?.resourceIdObjMeta?.drupal_internal__target_id, displayNotGrid());

  if (hideEmpty && !isLoading && itemsToDisplay.length === 0) {
    return null;
  }

  return (
    <div className="su-@container su-relative su-centered" ref={ref} {...props}>
      <div
        className="su-flex su-flex-col md:su-flex-row su-gap-xs md:su-gap-2xl su-mb-20 md:su-mb-0 ">

        {headline &&
          <h2 className="su-text-left su-type-5 su-flex-grow su-mb-40">
            <AboveHeaderBorder/>
            {headline}
          </h2>
        }

        {link?.url &&
          <div>
            <DrupalLink
              url={link.url}
              title={link.title}
              style={styles?.sul_list_styles?.link_display_style}
            />
          </div>
        }
      </div>

      {description &&
        <div className="su-mb-40 lg:su-max-w-[980px] su-w-full">
          {formatHtml(description)}
        </div>
      }

      <div aria-live="polite">
        {isLoading && <Loading/>}
        {!isLoading &&
          <ErrorBoundary
            fallback={<></>}
            onError={e => console.error(e.message)}
          >
            <List
              emptyMessage={emptyMessage}
              itemsToDisplay={itemsToDisplay}
              isList={isList}
              viewId={viewId}
              displayId={displayId}
            />

          </ErrorBoundary>
        }
      </div>
    </div>
  )
}

const useListDisplay = (viewId, displayId) => {
  const display = `${viewId}:${displayId}`
  const listDisplays = [
    'stanford_events:list_page',
    'stanford_events:past_events_list_block',
    'stanford_news:block_1',
    'stanford_publications:chicago_list',
    'stanford_publications:apa_list',
    'stanford_basic_pages:basic_page_type_list',
    'stanford_courses:default_list_viewfield_block',
    'stanford_person:grid_list_all',
  ];
  return listDisplays.indexOf(display) > -1;
}

interface ListItemProps {
  node: DrupalNode
  viewId: string
  displayId: string
  emptyMessage?: string
}

const List = ({itemsToDisplay, isList, viewId, displayId, emptyMessage}) => {

  if (itemsToDisplay.length === 0 && emptyMessage) {
    return <div>{emptyMessage}</div>
  }

  if (viewId === 'sul_study_places' && displayId === 'study_places') {
    return <StudyPlaceFilteringList items={itemsToDisplay}/>
  }

  return (
    <ul className="su-list-unstyled su-flex su-flex-wrap su-gap-2xl su-justify-around">
      {itemsToDisplay.map(item => (
        <li
          className={'su-flex-1 su-min-w-[250px] su-max-w-[500px] su-mb-50 last:su-pb-0 su-border-[#c6c6c6] last:su-border-none ' + (isList ? 'su-border-b su-pb-50' : '')}
          key={item.id}>

          <ErrorBoundary
            fallback={<></>}
            onError={e => console.error(e.message)}
          >
            <ListItem
              node={item}
              viewId={viewId}
              displayId={displayId}
            />
          </ErrorBoundary>
        </li>
      ))}
    </ul>
  )
}

const ListItem = ({node, viewId, displayId}: ListItemProps) => {
  const isList = useListDisplay(viewId, displayId);
  if (isList) {
    return <NodeListDisplay node={node}/>
  }
  return <NodeCardDisplay node={node}/>
}

export default StanfordLists;