"use client";

import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import {DrupalParagraph} from "next-drupal";
import {deserialize} from "@/lib/drupal/deserialize";
import dynamic from "next/dynamic";
import {ArrowPathIcon} from "@heroicons/react/20/solid";

const Paragraph = dynamic(() =>
  import('../../../../../src/components/paragraph/index'), {
  loading: () => <ArrowPathIcon className="mx-auto animate-spin" width={30} height={30}/>
});

const ParagraphPreview = ({}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [paragraph, setParagraph] = useState<DrupalParagraph | null>(null);
  const [iframeId, setIframeId] = useState<string | null>(null);

  const setParagraphData = useCallback(({data}: { data: string }) => {
    try {
      const jsonData = JSON.parse(data);
      setParagraph(deserialize(jsonData) as DrupalParagraph)
    } catch (e) {
      setIframeId(data)
    }
  }, []);

  const emitComponentHeight = useCallback(() => {

    if ((previewRef.current?.clientHeight || 0) < 100) {
      setTimeout(emitComponentHeight, 300);
      return;
    }

    if (iframeId && paragraph) {
      const message = JSON.stringify({
        id: iframeId,
        height: previewRef.current?.clientHeight
      })
      window.parent.postMessage(message, '*');
    }
  }, [iframeId, paragraph]);

  useEffect(() => {
    window.addEventListener('message', setParagraphData);
    window.addEventListener('resize', emitComponentHeight)

    return () => {
      window.removeEventListener('message', setParagraphData);
      window.removeEventListener('resize', emitComponentHeight)
    }
  }, [setParagraphData, emitComponentHeight])

  useEffect(() => {
    if (iframeId && paragraph) return;

    window.parent.postMessage(JSON.stringify({message: 'refresh'}), '*');
  }, [iframeId, paragraph])

  useLayoutEffect(() => emitComponentHeight(), [emitComponentHeight, paragraph]);

  return (
    <div id="main-content" ref={previewRef} className="p-30">
      {paragraph &&
        <Paragraph paragraph={paragraph}/>
      }
    </div>
  )
}
export default ParagraphPreview;
