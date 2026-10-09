import {Suspense} from "react"
import InterceptionModal from "@/components/patterns/modals/interception-modal"
import StudyPlaceFeatures from "@/components/node/sul-study-place/study-place-features"
import {getNodeByUuid} from "@/lib/gql/gql-queries"
import {NodeUnion} from "@/lib/gql/__generated__/graphql"

type Props = {params: Promise<{uuid: string}>}

// The uuid is only known per request, so the content renders inside a Suspense boundary.
const Page = (props: Props) => (
  <Suspense>
    <StudyPlaceFeaturesPage params={props.params} />
  </Suspense>
)

const StudyPlaceFeaturesPage = async (props: Props) => {
  const params = await props.params

  const {uuid} = params

  const node = await getNodeByUuid<NodeUnion>(uuid)
  if (!node) return
  if (node.__typename !== "NodeSulStudyPlace") return

  // Filter out empty terms and deduplicate terms by their ID.
  const features =
    node.sulStudyFeatures?.filter(
      (term, index, self) => term.name?.length > 0 && index === self.findIndex(t => t.uuid === term.uuid)
    ) ?? []

  return (
    <InterceptionModal aria-labelledby={node.uuid}>
      <StudyPlaceFeatures
        headingId={node.uuid}
        branchHours={node.sulStudyBranch.suLibraryHours}
        branchTitle={node.sulStudyBranch.title}
        branchUrl={node.sulStudyBranch.path}
        capacity={node.sulStudyCapacity?.name}
        contactImageAlt={node.sulStudyBranch.suLibraryContactImg?.mediaImage.alt || ""}
        contactImageUrl={node.sulStudyBranch.suLibraryContactImg?.mediaImage.url}
        features={features.map(feature => ({id: feature.uuid, name: feature.name}))}
        type={node.sulStudyType.name}
        roomNumber={node.sulStudyRoomNumber}
        roomDonorName={node.sulStudyRoomDonorName}
        roomImageUrl={node.sulStudyImage?.mediaImage?.url}
        roomImageAlt={node.sulStudyImage?.mediaImage?.alt}
      />
    </InterceptionModal>
  )
}
export default Page
