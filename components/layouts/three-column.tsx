import {Paragraph} from "@/components/paragraphs";

export const ThreeColumn = ({config, items}) => {
  const leftItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'left');
  const mainItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'main');
  const rightItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'right');

  return (
    <div className="su-grid su-gap-2xl lg:su-grid-cols-3">
      <div className="su-min-w-0">
        {leftItems.map(item => <Paragraph key={item.id} paragraph={item} siblingCount={9}/>)}
      </div>
      <div className="su-min-w-0">
        {mainItems.map(item => <Paragraph key={item.id} paragraph={item} siblingCount={9}/>)}
      </div>
      <div className="su-min-w-0">
        {rightItems.map(item => <Paragraph key={item.id} paragraph={item} siblingCount={9}/>)}
      </div>
    </div>
  )

}
