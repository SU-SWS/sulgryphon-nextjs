import Paragraph from "../index";

const ThreeColumn = ({config, items}) => {
  const leftItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'left');
  const mainItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'main');
  const rightItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'right');

  return (
    <div className="su-max-w-1500 su-mx-auto su-grid su-gap-2xl lg:su-grid-cols-3">
      <div className="su-min-w-0 su-grid su-grid-rows-1 su-gap-2xl">
        {leftItems.map(item => <Paragraph key={item.id} paragraph={item} siblingCount={9}/>)}
      </div>
      <div className="su-min-w-0 su-grid su-grid-rows-1 su-gap-2xl">
        {mainItems.map(item => <Paragraph key={item.id} paragraph={item} />)}
      </div>
      <div className="su-min-w-0 su-grid su-grid-rows-1 su-gap-2xl">
        {rightItems.map(item => <Paragraph key={item.id} paragraph={item} />)}
      </div>
    </div>
  )

}
export default ThreeColumn;