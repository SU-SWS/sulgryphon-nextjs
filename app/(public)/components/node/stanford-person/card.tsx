"use client";

import {Person} from "@/lib/drupal/drupal";

import VerticalPersonCard from "./vertical-card";
import HorizontalPersonCard from "./horizontal-card";
import {useResizeDetector} from "react-resize-detector";

const StanfordPersonCard = ({node, ...props}: { node: Person }) => {
  const {width, ref} = useResizeDetector();
  const Card = (width && width < 510) ? VerticalPersonCard : HorizontalPersonCard;
  return (
    <div ref={ref} {...props}>
      <Card node={node} currentWidth={width ?? 0} {...props}/>
    </div>
  )
}
export default StanfordPersonCard;