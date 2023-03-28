import Paragraph from "@/components/paragraph";
import {DrupalParagraph} from "next-drupal";

interface LayoutProps {
  items: DrupalParagraph[],
  fullWidth?: boolean
  config?: {
    column_widths: string
  }
}

const TwoColumn = ({config, items, fullWidth}: LayoutProps) => {

  const leftItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'left');
  const rightItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'right');

  let gridClass = 'lg:su-grid-cols-2';
  if (config?.column_widths === '33-67') {
    gridClass = 'lg:su-grid-cols-1-2';
  } else if (config?.column_widths === '67-33') {
    gridClass = 'lg:su-grid-cols-2-1';
  }
  const paddingClass = fullWidth ? "su-px-40 lg:px-0" : "";

  return (
    <div className={`su-max-w-1500 su-w-full su-mx-auto su-grid su-gap-2xl ${gridClass} ${paddingClass}`}>
      <div className="su-min-w-0 su-grid su-grid-rows-1 su-gap-2xl">
        {leftItems.map(item => <Paragraph key={item.id} paragraph={item} siblingCount={9} className="su-relative"/>)}
      </div>
      <div className="su-min-w-0 su-grid su-grid-rows-1 su-gap-2xl">
        {rightItems.map(item => <Paragraph key={item.id} paragraph={item} siblingCount={9} className="su-relative"/>)}
      </div>
    </div>
  )
}
export default TwoColumn;