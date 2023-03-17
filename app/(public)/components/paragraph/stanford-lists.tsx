"use client";

import dynamic from "next/dynamic";
import {ListParagraph} from "@/lib/drupal/drupal";
import {useEffect, useRef, useState} from "react";
import useOnScreen from "@/lib/hooks/useOnScreen";
import axios from "axios";
import formatHtml from "@/lib/format-html";
import {DrupalActionLink, DrupalLink, DrupalLinkButton, DrupalLinkSecondaryButton} from "../patterns/link";
import {DrupalNode} from "next-drupal";
import {NodeCardDisplay, NodeListDisplay} from "../node";
import AboveHeaderBorder from "@/components/patterns/above-header-border";

const StudyPlaceFilteringList = dynamic(() => import("../views/study-places"));

interface ListProps {
  paragraph: ListParagraph
  siblingCount?: number
  className?: string
}

const StanfordLists = ({paragraph, siblingCount = 1, ...props}: ListProps) => {
  const elemRef = useRef();
  const elemRefValue = useOnScreen(elemRef);
  const [isElemRef, setIsElemRef] = useState(false);

  useEffect(() => {
    if (!isElemRef) setIsElemRef(elemRefValue);
  }, [elemRefValue, isElemRef])

  const [itemsToDisplay, setItemsToDisplay] = useState([])

  useEffect(() => {
    const viewId = paragraph.su_list_view?.resourceIdObjMeta?.drupal_internal__target_id
    const displayId = paragraph.su_list_view?.resourceIdObjMeta?.display_id;
    const args = paragraph.su_list_view.resourceIdObjMeta.arguments;
    const numToDisplay = paragraph.su_list_view.resourceIdObjMeta.items_to_display;

    if (isElemRef) {
      axios.get(`/api/views/${viewId}/${displayId}/${args}:${numToDisplay}`).then(response => {
        const items = (paragraph.su_list_view?.resourceIdObjMeta?.items_to_display ?? 0) >= 1 ? response.data.slice(0, paragraph.su_list_view.resourceIdObjMeta.items_to_display) : response.data;
        setItemsToDisplay(items);
      });
    }
  }, [isElemRef, paragraph.su_list_view])

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

  return (
    // @ts-ignore
    <div ref={elemRef} {...props}
         className={'su-max-w-[980px] su-w-full su-mx-auto su-mb-40 ' + (props.className ?? '')}>
      <div className="su-flex su-gap-2xl">
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
          <div className="su-mb-40">{formatHtml(paragraph.su_list_description.processed)}</div>}

      <List
        itemsToDisplay={itemsToDisplay}
        gridClass={gridClass}
        isList={isList}
        viewId={paragraph.su_list_view.resourceIdObjMeta.drupal_internal__target_id}
        displayId={paragraph.su_list_view.resourceIdObjMeta.display_id}
      />
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
}

const List = ({itemsToDisplay, gridClass, isList, viewId, displayId}) => {

  if (viewId === 'sul_study_places' && displayId === 'study_places') {
    return <StudyPlaceFilteringList items={itemsToDisplay}/>
  }

  return (
    <div className={`su-mt-50 ${isList ? '' : 'lg:su-grid'} su-gap-[50px] su-m-10 ${gridClass}`}>
      {itemsToDisplay.map(item => (
        <div
          className={'su-mb-50 last:su-pb-0 su-border-[#c6c6c6] last:su-border-none ' + (isList ? 'su-border-b su-pb-50' : '')}
          key={item.id}>
          <ListItem
            node={item}
            viewId={viewId}
            displayId={displayId}
          />
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