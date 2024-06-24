import {NodeSulStudyPlace, TermUnion} from "@/lib/gql/__generated__/drupal"
import StudyPlaceFilteringTable, {StudyPlaces} from "@/components/views/sul-study-place/filtering-table/study-place-filtering-table"
import CachedClientFetch from "@/components/utils/cached-client-fetch"

type Props = {
  items: NodeSulStudyPlace[]
}
const StudyPlaceTable = ({items}: Props) => {
  const trimmedItems: StudyPlaces[] = []

  const filterFeatures = (features: TermUnion[]) => {
    // Filter out empty terms and deduplicate terms by their ID.
    return features.filter((term, index, self) => term.name?.length > 0 && index === self.findIndex(t => t.id === term.id)) || []
  }

  items.map(item => {
    trimmedItems.push({
      id: item.id,
      title: item.title,
      branchTitle: item.sulStudyBranch.title,
      branchPath: item.sulStudyBranch.path,
      branchImageUrl: item.sulStudyImage?.mediaImage.url,
      features: filterFeatures(item.sulStudyFeatures || []).map(feat => feat.name),
      donorName: item.sulStudyRoomDonorName,
      studyType: item.sulStudyType.name,
      roomNumber: item.sulStudyRoomNumber,
      capacity: item.sulStudyCapacity?.name,
      libCalId: item.sulStudyLibcalId,
      libHours: item.sulStudyBranch.suLibraryHours,
    })
  })
  return (
    <CachedClientFetch>
      <StudyPlaceFilteringTable items={trimmedItems} />
    </CachedClientFetch>
  )
}

export default StudyPlaceTable
