import Paragraph from "@/components/paragraph";
import {DrupalParagraph} from "next-drupal";

const OneColumn = ({config = {}, items}) => {

  return (
    <div className="su-grid su-grid-col su-gap-2xl">
      {items.map(item => <Paragraph key={item.id} paragraph={item as DrupalParagraph} siblingCount={0}/>)}
    </div>
  )
}
export default OneColumn;