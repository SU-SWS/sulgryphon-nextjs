"use client";

import {ArrowPathIcon} from "@heroicons/react/20/solid";
import {useInView} from "react-intersection-observer";
import Embed from "react-tiny-oembed";
import {PropsWithoutRef} from "react";

interface Props extends PropsWithoutRef<any> {
  url: string
}

const Oembed = ({url, ...props}: Props) => {
  const {ref, inView} = useInView({triggerOnce: true})
  return (
    <div ref={ref} {...props}>
      {inView && <Embed url={url} LoadingFallbackElement={<Loading/>}/>}
    </div>
  )
}

const Loading = () => {
  return (
    <div className="h-full w-full flex items-baseline">
      <ArrowPathIcon className="mx-auto animate-spin self-center" width={30} height={30}/>
    </div>
  )
}

export default Oembed;