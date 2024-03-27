"use client";

import VerticalPersonCard from "./vertical-card";
import HorizontalPersonCard from "./horizontal-card";
import {NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d";
import {useDebounceCallback, useResizeObserver} from "usehooks-ts";
import {useRef, useState} from "react";

const StanfordPersonCard = ({node, ...props}: { node: NodeStanfordPerson }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{width}, setSize] = useState<{ width?: number, height?: number }>({width: undefined})

  const onResize = useDebounceCallback(setSize, 200)
  useResizeObserver({ref, onResize})

  const Card = (width && width < 510) ? VerticalPersonCard : HorizontalPersonCard;
  return (
    <div ref={ref}>
      <Card node={node} {...props}/>
    </div>
  )
}
export default StanfordPersonCard;