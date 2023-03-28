import {DrupalParagraph} from "next-drupal";

interface SpacerProps {
  paragraph: DrupalParagraph
  siblingCount?: number
}

const StanfordSpacer = ({paragraph, siblingCount, ...props}: SpacerProps) => {
  return (
    <div className="su-min-h-[20px]"/>
  )
}
export default StanfordSpacer;