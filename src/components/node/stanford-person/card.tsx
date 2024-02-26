"use client";

import VerticalPersonCard from "./vertical-card";
import HorizontalPersonCard from "./horizontal-card";
import {useResizeDetector} from "react-resize-detector";
import {NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d";

const StanfordPersonCard = ({node, ...props}: { node: NodeStanfordPerson }) => {
  const {width, ref} = useResizeDetector();
  const Card = (width && width < 510) ? VerticalPersonCard : HorizontalPersonCard;
  return (
    <div ref={ref}>
      <Card node={node} {...props}/>
    </div>
  )
}
export default StanfordPersonCard;