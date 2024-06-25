import {NodeSulLibrary} from "@/lib/gql/__generated__/drupal.d"
import BranchLocationFilteringTable, {BranchLocation} from "@/components/views/sul-branch-locations/filtering-table/branch-locations-filtering-table"
import CachedClientFetch from "@/components/utils/cached-client-fetch"

interface Props {
  items: NodeSulLibrary[]
}

const SulBranchLocationTableView = async ({items}: Props) => {
  const trimmedItems: BranchLocation[] = []
  items.map(item => {
    trimmedItems.push({
      id: item.id,
      title: item.title,
      path: item.path,
      imageUrl: item.suLibraryContactImg?.mediaImage.url,
      email: item.suLibraryEmail,
      phone: item.suLibraryPhone,
      address: item.suLibraryAddress,
      mapUrl: item.suLibraryMapLink?.url,
      hoursId: item.suLibraryHours,
    })
  })

  return (
    <CachedClientFetch>
      <BranchLocationFilteringTable items={trimmedItems} />
    </CachedClientFetch>
  )
}
export default SulBranchLocationTableView
