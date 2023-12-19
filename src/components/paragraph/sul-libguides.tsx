import formatHtml from "@/lib/format-html";
import {PropsWithoutRef} from "react";
import Libguide from "@/components/node/stanford-person/libguide";
import fetchLibGuides from "@/lib/libguides";

interface Props extends PropsWithoutRef<any> {
  headline?: string;
  description?: string;
  libguideId: number
}

const SulLibguides = async ({headline, description, libguideId, fullWidth, ...props}: Props) => {
  const guides = await fetchLibGuides({subjectId: libguideId})

  return (
    <div className="relative centered lg:max-w-[980px]" {...props}>
      {headline && <h2>{headline}</h2>}
      {description && <div>{formatHtml(description)}</div>}

      {(guides && guides.length > 0) &&
        <Libguide guides={guides} headingLevel={headline ? 3 : 2}/>
      }
    </div>
  )
}
export default SulLibguides