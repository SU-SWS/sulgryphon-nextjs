import Paragraph, {getParagraphBehaviors} from "@/components/paragraph";
import {ParagraphUnion} from "@/lib/gql/__generated__/drupal";

interface LayoutProps {
  items: ParagraphUnion[],
  fullWidth?: boolean
}

const ThreeColumn = ({items}: LayoutProps) => {
  const leftItems = items.filter(item => getParagraphBehaviors(item)?.layout_paragraphs?.region === 'left');
  const mainItems = items.filter(item => getParagraphBehaviors(item)?.layout_paragraphs?.region === 'main');
  const rightItems = items.filter(item => getParagraphBehaviors(item)?.layout_paragraphs?.region === 'right');
  return (
    <div data-rows="three-column" className="centered grid lg:grid-cols-3 gap-[90px]">
      <div className="relative min-w-0 flex flex-col gap-2xll">
        {leftItems.map(item => <Paragraph key={item.id} paragraph={item} fullWidth={false}/>)}
      </div>
      <div className="relative min-w-0 flex flex-col gap-2xl">
        {mainItems.map(item => <Paragraph key={item.id} paragraph={item} fullWidth={false}/>)}
      </div>
      <div className="relative min-w-0 flex flex-col gap-2xl">
        {rightItems.map(item => <Paragraph key={item.id} paragraph={item} fullWidth={false}/>)}
      </div>
    </div>
  )

}
export default ThreeColumn;