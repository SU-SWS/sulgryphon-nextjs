import {Paragraph} from "@/components/paragraphs";

export const ThreeColumn = ({config, items}) => {
  const leftItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'left');
  const mainItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'main');
  const rightItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'right');

  return (
    <div className="su-grid su-grid-cols-3">
      <div>
        {leftItems.map(item => <Paragraph key={item.id} paragraph={item}/>)}
      </div>
      <div>
        {mainItems.map(item => <Paragraph key={item.id} paragraph={item}/>)}
      </div>
      <div>
        {rightItems.map(item => <Paragraph key={item.id} paragraph={item}/>)}
      </div>
    </div>
  )

}
