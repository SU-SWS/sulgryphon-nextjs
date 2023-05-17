import Paragraph from "@/components/paragraph";
import {DrupalParagraph} from "next-drupal";

interface LayoutProps {
  items: DrupalParagraph[],
  fullWidth?: boolean
  config: {}
}

const ThreeColumn = ({items,fullWidth, config = {}}: LayoutProps) => {
  const leftItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'left');
  const mainItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'main');
  const rightItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'right');
  return (
    <div data-rows="three-column"
         className={"su-max-w-1500 su-w-full su-mx-auto su-grid lg:su-grid-cols-3 su-gap-2xl su-px-50 3xl:su-px-0" + (fullWidth ? " su-px-50 3xl:su-px-0": "")}>
      <div className="su-relative su-min-w-0 su-grid su-grid-rows-1 su-gap-2xl">
        {leftItems.map(item => <Paragraph key={item.id} paragraph={item} fullWidth={false}/>)}
      </div>
      <div className="su-relative su-min-w-0 su-grid su-grid-rows-1 su-gap-2xl">
        {mainItems.map(item => <Paragraph key={item.id} paragraph={item} fullWidth={false}/>)}
      </div>
      <div className="su-relative su-min-w-0 su-grid su-grid-rows-1 su-gap-2xl">
        {rightItems.map(item => <Paragraph key={item.id} paragraph={item} fullWidth={false}/>)}
      </div>
    </div>
  )

}
export default ThreeColumn;