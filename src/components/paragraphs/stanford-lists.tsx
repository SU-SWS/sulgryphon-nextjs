import useSWR from 'swr';
import {DrupalNode} from "next-drupal";

import {ListParagraph} from "../../types/drupal";
import formatHtml from "@/lib/format-html";
import {DrupalLinkButton} from "@/components/simple/link";
import {NodeCardDisplay, NodeListDisplay} from "@/nodes/index";
import Conditional from "@/components/simple/conditional";

interface ListProps {
  paragraph: ListParagraph
  siblingCount?: number
  className?: string
}

export const StanfordLists = ({paragraph, siblingCount, ...props}: ListProps) => {
  let itemsToDisplay;

  const viewId = paragraph.su_list_view?.resourceIdObjMeta?.drupal_internal__target_id
  const displayId = paragraph.su_list_view?.resourceIdObjMeta?.display_id;
  const args = paragraph.su_list_view.resourceIdObjMeta.arguments;
  const numToDisplay = paragraph.su_list_view.resourceIdObjMeta.items_to_display;

  const fetcher = (...args) => fetch.apply(null, args).then(res => res.json())
  const {data: listItems} = useSWR(`/api/views/${viewId}/${displayId}/${args}:${numToDisplay}`, fetcher)
  const apiReturnedItems = listItems ?? [];

  itemsToDisplay = paragraph.su_list_view.resourceIdObjMeta.items_to_display >= 1 ? apiReturnedItems.slice(0, paragraph.su_list_view.resourceIdObjMeta.items_to_display) : apiReturnedItems;
  const gridClasses = {
    1: 'su-grid-cols-1',
    2: 'su-grid-cols-2',
    3: 'su-grid-cols-3',
  };

  const gridClass = siblingCount >= 1 ? gridClasses[1] : (itemsToDisplay?.length > 3 ? gridClasses[3] : gridClasses[itemsToDisplay?.length]);
  const isList = useListDisplay(paragraph.su_list_view?.resourceIdObjMeta?.drupal_internal__target_id, paragraph.su_list_view?.resourceIdObjMeta?.display_id);

  return (
    <div {...props} className={'su-max-w-[980px] su-mx-auto su-mb-40 ' + (props.className ?? '')}>
      {paragraph.su_list_headline && <h2 className="su-text-center">{paragraph.su_list_headline}</h2>}
      {paragraph.su_list_description && <div className="su-mb-40">{formatHtml(paragraph.su_list_description.processed)}</div>}

      <div className={`su-mt-50 ${isList ? '' : 'lg:su-grid'} su-gap-[50px] su-m-10 ${gridClass}`}>
        {itemsToDisplay.map(item => (
          <div
            className={'su-pb-50 su-mb-50 last:su-pb-0 su-border-[#c6c6c6] last:su-border-none ' + (isList ? 'su-border-b' : '')}
            key={item.id}>
            <ListItem
              node={item}
              viewId={paragraph.su_list_view.resourceIdObjMeta.drupal_internal__target_id}
              displayId={paragraph.su_list_view.resourceIdObjMeta.display_id}
            />
          </div>
        ))}
      </div>

      {paragraph.su_list_button &&
        <DrupalLinkButton href={paragraph.su_list_button.url} className="su-block su-mx-auto">
          {paragraph.su_list_button.title}
        </DrupalLinkButton>}
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
  ];
  return listDisplays.indexOf(display) > -1;
}

interface ListItemProps {
  node: DrupalNode
  viewId: string
  displayId: string
}

const ListItem = ({node, viewId, displayId}: ListItemProps) => {
  const isList = useListDisplay(viewId, displayId);
  if (isList) {
    return <NodeListDisplay node={node}/>
  }
  return <NodeCardDisplay node={node}/>
}