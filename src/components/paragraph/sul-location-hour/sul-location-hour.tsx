import {HTMLAttributes} from "react"
import {NodeSulLibrary, ParagraphSulLocationHour} from "@/lib/gql/__generated__/drupal.d"
import {graphqlClient} from "@/lib/gql/fetcher"
import SulLocationHoursClient from "@/components/paragraph/sul-location-hour/sul-location-hours.client"
import formatHtml from "@/lib/format-html"

type Props = HTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSulLocationHour
}
const SulLocationHour = async ({paragraph, ...props}: Props) => {
  const librariesQuery = await graphqlClient({next: {tags: ["node:sul_library"]}}).Libraries()
  const libraries = librariesQuery.nodeSulLibraries.nodes.filter(node => !!node.suLibraryHours) as NodeSulLibrary[]

  return (
    <SulLocationHoursClient
      libraries={libraries}
      alert={formatHtml(paragraph.sulLocHoursAlert?.processed)}
      {...props}
    />
  )
}
export default SulLocationHour
