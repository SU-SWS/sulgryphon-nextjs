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
    // @ts-ignore
    <div ref={ref} {...props}>
      {inView && <Embed url={url} LoadingFallbackElement={<Loading/>}/>}
    </div>
  )
}

const Loading = () => {
  return (
    <div className="su-h-full su-w-full su-flex su-items-baseline">
      <ArrowPathIcon className="su-mx-auto su-animate-spin su-self-center" width={30} height={30}/>
    </div>
  )
}

export default Oembed;