import {Paragraph} from "@/components/paragraphs";

export const OneColumn = ({config = {}, items}) => {

  return (
    <div className="su-grid su-grid-col su-gap-2xl">
      {items.map(item => <Paragraph key={item.id} paragraph={item} siblingCount={0}/>)}
    </div>
  )
}
