import Conditional from "../utils/conditional";
import formatHtml from "@/lib/format-html";
import {NodeCardDisplay} from "../node";
import {DrupalLinkButton} from "../patterns/link";
import fetchComponents from "@/lib/fetch-components";
import {DrupalNode} from "next-drupal";

const StanfordEntity = async ({paragraph, siblingCount, ...props}) => {
  let entities: DrupalNode[] = await fetchComponents(paragraph.su_entity_item ?? []) as DrupalNode[]
  entities = entities.filter(entity => entity?.id?.length > 0);

  const gridColClasses = {
    1: 'su-grid-cols-1',
    2: 'lg:su-grid-cols-2',
    3: 'lg:su-grid-cols-3',
  }

  const gridCols = entities.length >= 3 ? gridColClasses[3] : gridColClasses[entities.length];
  const wrapperClasses = paragraph.behavior_settings?.sul_teaser_styles?.background === 'black' ? 'su-text-white su-py-40' : '';

  return (
    // @ts-ignore
    <div {...props}
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


export default StanfordEntity;