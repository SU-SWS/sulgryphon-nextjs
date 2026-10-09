import InterceptionModal from "@/components/patterns/modals/interception-modal"
import StudyPlaceFeatures from "@/components/node/sul-study-place/study-place-features"
import {getNodeByUuid} from "@/lib/gql/gql-queries"
import {NodeUnion} from "@/lib/gql/__generated__/graphql"

type Props = {params: Promise<{uuid: string}>}

// Params are awaited outside Suspense on purpose, as in [...slug]: each study place renders on its first
// request and is then cached, instead of rendering on every visit.
const Page = async (props: Props) => {
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

// Cache Components needs one param to validate the route. Real study places render on their first request.
export const generateStaticParams = async () => [{uuid: "00000000-0000-0000-0000-000000000000"}]
