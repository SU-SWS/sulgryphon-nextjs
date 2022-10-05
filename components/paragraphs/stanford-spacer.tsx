import {BannerParagraph} from "../../types/drupal";

interface SpacerProps {
  paragraph: BannerParagraph
  siblingCount?: number
  className?: string
}

export const StanfordSpacer = ({paragraph, siblingCount, ...props}: SpacerProps) => {
  return (
    <div/>
  )
}