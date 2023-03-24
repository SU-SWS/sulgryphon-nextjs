"use client";

import Conditional from "../utils/conditional";
import formatHtml from "@/lib/format-html";
import NodeCardDisplay from "@/components/node/node-card";
import {DrupalLinkButton} from "../patterns/link";
import {useEffect, useRef, useState} from "react";
import useOnScreen from "@/lib/hooks/useOnScreen";
import axios from "axios";

const StanfordEntity = ({paragraph, siblingCount, ...props}) => {
  const [entities, setEntities] = useState(paragraph.su_entity_item?.filter(entity => entity?.path?.alias) ?? [])

  const elemRef = useRef();
  const elemRefValue = useOnScreen(elemRef);
  const [isElemRef, setIsElemRef] = useState(false);

  useEffect(() => {
    if (!isElemRef) setIsElemRef(elemRefValue);
  }, [elemRefValue, isElemRef])

  useEffect(() => {
    const getFullEntityData = async () => {
      const requests: PromiseLike<any>[] = [];

      paragraph.su_entity_item.map(item => {
        // Deleted items will be uknown. Don't fetch those.
        if (item.type !== 'unknown' && item.id) {
          requests.push(axios.get(`/api/entity/${item.type}/${item.id}`).then(response => response.data));
        }
      })

      Promise.allSettled(requests)
        .then(results => setEntities(results.map(item => item.status == 'fulfilled' && item.value).filter(item => !!item)));
    }

    if (isElemRef) {
      getFullEntityData();
    }
  }, [isElemRef, paragraph.su_entity_item])

  const gridColClasses = {
    1: 'su-grid-cols-1',
    2: 'lg:su-grid-cols-2',
    3: 'lg:su-grid-cols-3',
  }

  const gridCols = entities.length >= 3 ? gridColClasses[3] : gridColClasses[entities.length];
  const wrapperClasses = paragraph.behavior_settings?.sul_teaser_styles?.background === 'black' ? 'su-text-white su-py-40' : '';

  return (
    // @ts-ignore
    <div ref={elemRef} {...props}
         className={'su-relative su-max-w-[980px] su-w-full su-mx-auto su-mb-40 ' + wrapperClasses + ' ' + (props.className ?? '')}>
      <Conditional showWhen={paragraph.behavior_settings?.sul_teaser_styles?.background === 'black'}>
        <div
          className="su-absolute su-z-[-10] su-h-full su-w-screen su-top-0 su-left-[calc(-50vw+50%)] su-bg-black-true">
        </div>
      </Conditional>

      {paragraph.su_entity_headline && <h2 className="su-text-center su-type-5">{paragraph.su_entity_headline}</h2>}
      {paragraph.su_entity_description &&
        <div className="su-mb-40">{formatHtml(paragraph.su_entity_description.processed)}</div>}

      {entities &&
        <div className={"su-my-40 su-grid su-gap-2xl " + (siblingCount > 0 ? "" : gridCols)}>
          {entities.map((item, i) =>
            <div key={item.id}
                 className={((i + 1 === entities.length || i + 1 % 3 === 0) ? "" : "su-relative before:su-content-[''] before:su-w-1 before:su-absolute before:su-top-0 before:su-h-full before:su-right-[-25px] lg:before:su-bg-black-30")}>
                <NodeCardDisplay node={item} key={item.id}/>
            </div>
          )}
        </div>
      }
      {paragraph.su_entity_button &&
        <DrupalLinkButton href={paragraph.su_entity_button.url} className="su-block su-mx-auto">
          {paragraph.su_entity_button.title}
        </DrupalLinkButton>
      }
    </div>
  )

}


export default StanfordEntity;