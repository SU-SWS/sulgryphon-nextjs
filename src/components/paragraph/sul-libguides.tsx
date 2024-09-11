import formatHtml from "@/lib/format-html"
import {HTMLAttributes} from "react"
import Libguide from "@/components/node/stanford-person/libguide"
import fetchLibGuides from "@/lib/libguides"
import {Maybe} from "@/lib/gql/__generated__/drupal.d"

type Props = HTMLAttributes<HTMLDivElement> & {
  headline?: Maybe<string>
  description?: Maybe<string>
  libguideId: number
}

const SulLibguides = async ({headline, description, libguideId, ...props}: Props) => {
  const guides = await fetchLibGuides({subjectId: libguideId})

  return (
    <div className="centered relative lg:max-w-[980px]" {...props}>
      {headline && <h2>{headline}</h2>}
      {description && <div>{formatHtml(description)}</div>}

      {guides && guides.length > 0 && <Libguide guides={guides} headingLevel={headline ? 3 : 2} />}
    </div>
  )
}
export default SulLibguides
