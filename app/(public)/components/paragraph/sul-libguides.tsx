"use client";

import formatHtml from "@/lib/format-html";
import {PropsWithoutRef, useEffect, useState} from "react";
import {Guide} from "@/lib/libguides";
import Libguide from "@/components/node/stanford-person/libguide";
import {ErrorBoundary} from "react-error-boundary";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import useDataFetch from "@/lib/hooks/useDataFetch";

interface Props extends PropsWithoutRef<any> {
  headline?: string;
  description?: string;
  libguideId: number
}

const SulLibguides = ({...props}: Props) => {
  return (
    <ErrorBoundary fallback={<></>}>
      <CachedClientFetch>
        <Component {...props}/>
      </CachedClientFetch>
    </ErrorBoundary>
  )
}

const Component = ({headline, description, libguideId, ...props}: Props) => {
  const {data: libguides} = useDataFetch(`/api/libguides/subjects/${libguideId}`);

  return (
    <div {...props}>
      {headline && <h2>{headline}</h2>}
      {description && <div>{formatHtml(description)}</div>}

      {libguides && <Libguide guides={libguides satisfies Guide[]} headingLevel={headline ? 3 : 2}/>}
    </div>
  )
}
export default SulLibguides