import Paragraph from "../index";
import {DrupalParagraph} from "next-drupal";

const OneColumn = ({config = {}, items}) => {

  return (
    <div className="su-grid su-grid-col su-gap-2xl">
      {items.map(item => <Paragraph key={item.id} paragraph={item as DrupalParagraph}/>)}
    </div>
  )
}
export default OneColumn;