import {Paragraph} from "@/components/paragraphs";

export const TwoColumn = ({config, items}) => {

  const leftItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'left');
  const rightItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'right');

  let gridClass = 'lg:su-grid-cols-2';
  if (config?.column_widths === '33-67') {
    gridClass = 'lg:su-grid-cols-1-2';
  } else if (config?.column_widths === '67-33') {
    gridClass = 'lg:su-grid-cols-2-1';
  }

  return (
    <div className={`su-grid ${gridClass}`}>
      <div>
        {leftItems.map(item => <Paragraph key={item.id} paragraph={item}/>)}
      </div>
      <div>
        {rightItems.map(item => <Paragraph key={item.id} paragraph={item}/>)}
      </div>
    </div>
  )
}
