
import {ListParagraph} from "../../../src/types/drupal";

interface ListProps {
  paragraph: ListParagraph
  siblingCount?: number
  className?: string
}

const StanfordLists = ({paragraph, siblingCount, ...props}: ListProps) => {
  return (
    <div>list</div>
  )
}
export default StanfordLists;