import StudyPlaceFeatures from "@/components/node/sul-study-place/study-place-features"
import InternalHeaderBanner from "@/components/patterns/internal-header-banner"
import {notFound} from "next/navigation"
import {getNodeByUuid} from "@/lib/gql/gql-queries"
import {NodeUnion} from "@/lib/gql/__generated__/graphql"

export const metadata = {
  title: "Study Place Features",
  robots: {
    index: false,
  },
}

type Props = {params: Promise<{uuid: string}>}

// Params are awaited outside Suspense on purpose, as in [...slug]: each study place renders on its first
// request and is then cached, instead of rendering on every visit.
const Page = async (props: Props) => {
  const params = await props.params

  const {uuid} = params

  const node = await getNodeByUuid<NodeUnion>(uuid)
  if (!node) notFound()
  if (node.__typename !== "NodeSulStudyPlace") notFound()

  // Filter out empty terms and deduplicate terms by their ID.
  const features =
    node.sulStudyFeatures?.filter(
      (term, index, self) => term.name?.length > 0 && index === self.findIndex(t => t.id === term.id)
    ) ?? []

  return (
    <main id="main-content">
      <InternalHeaderBanner>
        <h1 className="relative mx-auto mt-80 mb-50 w-full max-w-[calc(100vw-10rem)] p-0 md:mt-100 md:max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)]">
          {node.title} Features
        </h1>
      </InternalHeaderBanner>
      <div className="centered">
        <StudyPlaceFeatures
          branchHours={node.sulStudyBranch.suLibraryHours}
          branchTitle={node.sulStudyBranch.title}
          branchUrl={node.sulStudyBranch.path}
          capacity={node.sulStudyCapacity?.name}
          contactImageAlt={node.sulStudyBranch.suLibraryContactImg?.mediaImage.alt || ""}
          contactImageUrl={node.sulStudyBranch.suLibraryContactImg?.mediaImage.url}
          features={features.map(feature => ({id: feature.id, name: feature.name}))}
          type={node.sulStudyType.name}
          roomNumber={node.sulStudyRoomNumber}
          roomDonorName={node.sulStudyRoomDonorName}
          roomImageUrl={node.sulStudyImage?.mediaImage?.url}
          roomImageAlt={node.sulStudyImage?.mediaImage.alt}
        />
      </div>
    </main>
  )
}

export default Page

// Cache Components needs one param to validate the route. Real study places render on their first request.
export const generateStaticParams = async () => [{uuid: "00000000-0000-0000-0000-000000000000"}]
