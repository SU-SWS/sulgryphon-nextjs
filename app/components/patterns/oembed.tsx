"use client";

import React, {useEffect, useRef, useState} from "react";
import dynamic from "next/dynamic";

const Embed = dynamic(() => import("react-tiny-oembed"));

import useOnScreen from "@/lib/hooks/useOnScreen";
import {ArrowPathIcon} from "@heroicons/react/20/solid";

const Oembed = ({url, ...props}) => {
  const elemRef = useRef();
  const elemRefValue = useOnScreen(elemRef);
  const [isElemRef, setIsElemRef] = useState(false);

  useEffect(() => {
    if (!isElemRef) setIsElemRef(elemRefValue);
  }, [elemRefValue, isElemRef])

  return (
    // @ts-ignore
    <div ref={elemRef} {...props}>
      {isElemRef && <Embed url={url} LoadingFallbackElement={<Loading/>}/>}
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