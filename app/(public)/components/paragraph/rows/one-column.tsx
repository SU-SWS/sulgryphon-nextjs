import Paragraph from "@/components/paragraph";
import {DrupalParagraph} from "next-drupal";

const OneColumn = ({items, fullWidth = false, config = {}}) => {

  return (
    <div className="su-grid su-grid-col su-gap-2xl">
      {items.map(item =>
        <Paragraph key={item.id} paragraph={item as DrupalParagraph} siblingCount={fullWidth ? 0 : 9}/>
      )}
    </div>
  )
}
export default OneColumn;