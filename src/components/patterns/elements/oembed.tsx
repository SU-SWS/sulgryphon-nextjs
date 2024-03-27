"use client";

import {ArrowPathIcon} from "@heroicons/react/20/solid";
import Embed from "react-tiny-oembed";
import {PropsWithoutRef} from "react";
import {useIntersectionObserver} from "usehooks-ts";

interface Props extends PropsWithoutRef<any> {
  url: string
}

const Oembed = ({url, ...props}: Props) => {
  const {isIntersecting, ref} = useIntersectionObserver({freezeOnceVisible: true})
  return (
    <div ref={ref} {...props}>
      {isIntersecting && <Embed url={url} LoadingFallbackElement={<Loading/>}/>}
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