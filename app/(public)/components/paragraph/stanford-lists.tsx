"use client";

import dynamic from "next/dynamic";
import {ListParagraph} from "@/lib/drupal/drupal";
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

const StudyPlaceFilteringList = dynamic(() => import("../views/study-places"));

interface ListProps {
  paragraph: ListParagraph
  siblingCount?: number
}

const StanfordLists = ({paragraph, siblingCount = 1, ...props}: ListProps) => {
  return (
    <ErrorBoundary
      fallback={<></>}
      onError={e => console.error(e.message)}
    >
      <CachedClientFetch>
        <StanfordListsComponent paragraph={paragraph} siblingCount={siblingCount} {...props}/>
      </CachedClientFetch>
    </ErrorBoundary>
  )
}


const StanfordListsComponent = ({paragraph, siblingCount = 1, ...props}: ListProps) => {
  const viewId = paragraph.su_list_view?.resourceIdObjMeta?.drupal_internal__target_id
  const displayId = paragraph.su_list_view?.resourceIdObjMeta?.display_id;
  const args = paragraph.su_list_view.resourceIdObjMeta.arguments;
  const numToDisplay = paragraph.su_list_view.resourceIdObjMeta.items_to_display;

  const hideEmpty = paragraph.behavior_settings?.list_paragraph?.hide_empty;
  const emptyMessage = paragraph.behavior_settings?.list_paragraph?.empty_message;

  const {isLoading, data} = useDataFetch(`/api/views/${viewId}/${displayId}/${args}:${numToDisplay}`)
  const itemsToDisplay = isLoading ? [] : data;

  const gridClasses = {
    1: 'su-grid-cols-1',
    2: 'su-grid-cols-2',
    3: 'su-grid-cols-3',
  };

  const gridClass = siblingCount >= 1 ? gridClasses[1] : (itemsToDisplay?.length > 3 ? gridClasses[3] : gridClasses[itemsToDisplay?.length]);

  const displayNotGrid = () => {
    if (paragraph.su_list_view?.resourceIdObjMeta?.display_id !== 'grid_list_all') {
      return paragraph.su_list_view?.resourceIdObjMeta?.display_id;
    }
    return false;
  }

  const isList = useListDisplay(paragraph.su_list_view?.resourceIdObjMeta?.drupal_internal__target_id, displayNotGrid());

  if (hideEmpty && itemsToDisplay.length === 0) {
    return null;
  }

  return (
    <div {...props}>
      <div className="su-flex su-gap-2xl su-max-w-[980px] su-mx-auto">
        {paragraph.su_list_headline &&
          <h2 className="su-text-left su-type-5 su-flex-grow">
            <AboveHeaderBorder/>
            {paragraph.su_list_headline}
          </h2>
        }

        <div>
          <DrupalLink
            url={paragraph.su_list_button?.url}
            title={paragraph.su_list_button?.title}
            style={paragraph.behavior_settings?.sul_list_styles?.link_display_style}
          />
        </div>
      </div>

      {paragraph.su_list_description &&
        <div className="su-mb-40 su-max-w-[980px] su-mx-auto">
          {formatHtml(paragraph.su_list_description.processed)}
        </div>
      }

      {isLoading && <Loading/>}
      {!isLoading &&
        <ErrorBoundary
          fallback={<></>}
          onError={e => console.error(e.message)}
        >

          <List
            emptyMessage={emptyMessage}
            itemsToDisplay={itemsToDisplay}
            gridClass={gridClass}
            isList={isList}
            viewId={paragraph.su_list_view.resourceIdObjMeta.drupal_internal__target_id}
            displayId={paragraph.su_list_view.resourceIdObjMeta.display_id}
          />

        </ErrorBoundary>
      }
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

const List = ({itemsToDisplay, gridClass, isList, viewId, displayId, emptyMessage}) => {

  if (itemsToDisplay.length === 0 && emptyMessage) {
    return <div>{emptyMessage}</div>
  }

  if (viewId === 'sul_study_places' && displayId === 'study_places') {
    return <StudyPlaceFilteringList items={itemsToDisplay}/>
  }

  return (
    <div className={`su-mt-50 ${isList ? '' : 'lg:su-grid'} su-gap-[50px] su-m-10 ${gridClass} su-max-w-[980px] su-mx-auto`}>
      {itemsToDisplay.map(item => (
        <div
          className={'su-mb-50 last:su-pb-0 su-border-[#c6c6c6] last:su-border-none ' + (isList ? 'su-border-b su-pb-50' : '')}
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
        </div>
      ))}
    </div>
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