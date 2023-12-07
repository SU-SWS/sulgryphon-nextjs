"use client";

import formatHtml from "@/lib/format-html";
import {PropsWithoutRef} from "react";
import Libguide from "@/components/node/stanford-person/libguide";
import {ErrorBoundary} from "react-error-boundary";
import CachedClientFetch from "@/components/utils/cached-client-fetch";
import useDataFetch from "@/lib/hooks/useDataFetch";
import {LibGuide} from "@/lib/drupal/drupal";

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

const Component = ({headline, description, libguideId, fullWidth, ...props}: Props) => {
  const {data: libguides} = useDataFetch<LibGuide[]>(`/api/libguides/subjects/${libguideId}`);

  return (
    <div className="relative centered lg:max-w-[980px]" {...props}>
      {headline && <h2>{headline}</h2>}
      {description && <div>{formatHtml(description)}</div>}

      {(libguides && libguides.length > 0) &&
        <Libguide guides={libguides} headingLevel={headline ? 3 : 2}/>
      }
    </div>
  )
}
export default SulLibguides