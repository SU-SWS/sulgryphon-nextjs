import {HTMLAttributes} from "react"
import {ParagraphSulLocationHour} from "@/lib/gql/__generated__/graphql"
import {getLibrariesWithHours} from "@/lib/gql/gql-queries"
import SulLocationHoursClient from "@/components/paragraph/sul-location-hour/sul-location-hours.client"

type Props = HTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSulLocationHour
}
const SulLocationHour = async ({paragraph, ...props}: Props) => {
  const libraries = await getLibrariesWithHours()

  return (
    <SulLocationHoursClient
      libraries={libraries}
      alert={paragraph.sulLocHoursAlert}
      icon={paragraph.sulLocAlertIcon}
      {...props}
    />
  )
}
export default SulLocationHour
