import useSWR from "swr";

import formatHtml from "@/lib/format-html";
import {EntityTeaserParagraph} from "../../types/drupal";
import {DrupalLinkButton} from "@/components/simple/link";
import {NodeCardDisplay} from "@/nodes/index";

interface EntityTeaserProps {
  paragraph: EntityTeaserParagraph
  siblingCount?: number
  className?: string
}

export const StanfordEntity = ({paragraph, siblingCount, ...props}: EntityTeaserProps) => {
  const fetcher = (...args) => fetch.apply(null, args).then(res => res.json())

  let entities = paragraph.su_entity_item.map(item => {
    const {data} = useSWR(`/api/node/${item.type}/${item.id}`, fetcher)
    return data ?? item;
  })

  const gridColClasses = {
    1: 'su-grid-cols-1',
    2: 'su-grid-cols-2',
    3: 'su-grid-cols-3',
  }

  const gridCols = paragraph?.su_entity_item?.length >= 3 ? gridColClasses[3] : gridColClasses[paragraph?.su_entity_item?.length];

  return (
    <div {...props} className={'su-max-w-[980px] su-mx-auto' + (props.className ?? '')}>
      {paragraph.su_entity_headline && <h2 className={`su-text-center`}>{paragraph.su_entity_headline}</h2>}
      {paragraph.su_entity_description && <div>{formatHtml(paragraph.su_entity_description.processed)}</div>}

      {paragraph.su_entity_item &&
          <div className={siblingCount > 0 ? "" : `lg:su-grid su-gap-xl ${gridCols}`}>
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