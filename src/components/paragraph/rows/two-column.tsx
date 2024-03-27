import Paragraph, {getParagraphBehaviors} from "@/components/paragraph";
import {ParagraphUnion} from "@/lib/gql/__generated__/drupal.d";

interface LayoutProps {
  items: ParagraphUnion[],
  fullWidth?: boolean
  config?: Record<string, string>
}

const TwoColumn = ({config, items}: LayoutProps) => {

  const leftItems = items.filter(item => getParagraphBehaviors(item)?.layout_paragraphs?.region === 'left');
  const rightItems = items.filter(item => getParagraphBehaviors(item)?.layout_paragraphs?.region !== 'left');

  let gridClass = 'lg:grid-cols-2';
  if (config?.column_widths === '33-67') {
    gridClass = 'lg:grid-cols-1-2';
  } else if (config?.column_widths === '67-33') {
    gridClass = 'lg:grid-cols-2-1';
  }

  return (
    <div data-rows="two-column" className={`centered grid gap-[90px] ${gridClass}`}>
      <div className="relative min-w-0 flex flex-col gap-2xl">
        {leftItems.map(item => <Paragraph key={item.id} paragraph={item} fullWidth={false}/>)}
      </div>
      <div className="relative min-w-0 flex flex-col gap-2xl">
        {rightItems.map(item => <Paragraph key={item.id} paragraph={item} fullWidth={false}/>)}
      </div>
    </div>
  )
}
export default TwoColumn;