import {useEffect, useRef, useState} from "react";
import axios from "axios";

import {EntityTeaserParagraph} from "../../types/drupal";
import formatHtml from "@/lib/format-html";
import {DrupalLinkButton} from "@/components/simple/link";
import {NodeCardDisplay} from "@/nodes/index";
import useOnScreen from "@/lib/use-on-screen";

interface EntityTeaserProps {
  paragraph: EntityTeaserParagraph
  siblingCount?: number
  className?: string
}

export const StanfordEntity = ({paragraph, siblingCount, ...props}: EntityTeaserProps) => {
  const elemRef = useRef();
  const elemRefValue = useOnScreen(elemRef);
  const [isElemRef, setIsElemRef] = useState(false);

  useEffect(() => {
    if (!isElemRef) setIsElemRef(elemRefValue);
  }, [elemRefValue, isElemRef])

  const [entities, setEntities] = useState(paragraph.su_entity_item)

  useEffect(() => {
    if (isElemRef) {
      const requests = [];
      entities.map(item => requests.push(axios.get(`/api/node/${item.type}/${item.id}`)))
      Promise.all(requests).then(responses => setEntities(responses.map(response => response.data)));
    }
  }, [isElemRef, paragraph.su_entity_item])

  const gridColClasses = {
    1: 'su-grid-cols-1',
    2: 'lg:su-grid-cols-2',
    3: 'lg:su-grid-cols-3',
  }

  const gridCols = paragraph?.su_entity_item?.length >= 3 ? gridColClasses[3] : gridColClasses[paragraph?.su_entity_item?.length];

  return (
    <div ref={elemRef} {...props} className={'su-max-w-[980px] su-w-full su-mx-auto su-mb-40 ' + (props.className ?? '')}>
      {paragraph.su_entity_headline && <h2 className="su-text-center">{paragraph.su_entity_headline}</h2>}
      {paragraph.su_entity_description && <div className="su-mb-40">{formatHtml(paragraph.su_entity_description.processed)}</div>}

      {paragraph.su_entity_item &&
          <div className={"su-my-40 su-grid su-gap-xl " + (siblingCount > 0 ? "" : gridCols)}>
            {entities.map(item =>
              <NodeCardDisplay node={item} key={item.id}/>
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