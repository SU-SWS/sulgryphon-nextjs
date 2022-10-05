import {Paragraph} from "@/components/paragraphs";

export const OneColumn = ({config, items}) => {

  return (
    <div>
      {items.map(item => <Paragraph key={item.id} paragraph={item}/>)}
    </div>
  )
}
