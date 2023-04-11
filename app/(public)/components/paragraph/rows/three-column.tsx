import Paragraph from "@/components/paragraph";
import {DrupalParagraph} from "next-drupal";

interface LayoutProps {
  items: DrupalParagraph[],
  fullWidth?: boolean
  config: {}
}

const ThreeColumn = ({items, config = {}, fullWidth = false}: LayoutProps) => {
  const leftItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'left');
  const mainItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'main');
  const rightItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'right');
  const paddingClass = fullWidth ? "su-px-40 lg:px-0" : "";
  return (
    <div data-rows="three-column" className={"su-max-w-1500 su-w-full su-mx-auto su-grid su-gap-2xl lg:su-grid-cols-3 " + paddingClass}>
      <div className="su-min-w-0 su-grid su-grid-rows-1 su-gap-2xl">
        {leftItems.map(item => <Paragraph key={item.id} paragraph={item} siblingCount={9} className="su-relative"/>)}
      </div>
      <div className="su-min-w-0 su-grid su-grid-rows-1 su-gap-2xl">
        {mainItems.map(item => <Paragraph key={item.id} paragraph={item} siblingCount={9} className="su-relative"/>)}
      </div>
      <div className="su-min-w-0 su-grid su-grid-rows-1 su-gap-2xl">
        {rightItems.map(item => <Paragraph key={item.id} paragraph={item} siblingCount={9} className="su-relative"/>)}
      </div>
    </div>
  )

}
export default ThreeColumn;