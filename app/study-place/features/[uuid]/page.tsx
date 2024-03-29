import StudyPlaceFeatures from "@/components/node/sul-study-place/study-place-features";
import InternalHeaderBanner from "@/components/patterns/internal-header-banner";
import {notFound} from "next/navigation";
import {graphqlClient} from "@/lib/gql/fetcher";
import {NodeUnion} from "@/lib/gql/__generated__/drupal.d";

export const metadata = {
  title: 'Study Place Features',
  robots: {
    index: false
  }
}

export const revalidate = false;
export const dynamic = 'force-static';

const Page = async ({params: {uuid}}: { params: { uuid: string } }) => {
  const query = await graphqlClient().Node({uuid})
  const node = query.node as NodeUnion;
  if (!node) notFound();
  if (node.__typename !== 'NodeSulStudyPlace') notFound();

  // Filter out empty terms and deduplicate terms by their ID.
  const features = node.sulStudyFeatures?.filter((term, index, self) =>
    term.name?.length > 0 && index === self.findIndex(t => t.id === term.id)
  ) ?? [];

  return (
    <main id="main-content">
      <InternalHeaderBanner>
        <h1
          className="w-full max-w-[calc(100vw-10rem)] md::max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)] mx-auto relative text-white mt-80 md:mt-100 mb-50 p-0">
          {node.title} Features
        </h1>
      </InternalHeaderBanner>
      <div className="centered">
        <StudyPlaceFeatures
          branchHours={node.sulStudyBranch.suLibraryHours}
          branchTitle={node.sulStudyBranch.title}
          branchUrl={node.sulStudyBranch.path}
          capacity={node.sulStudyCapacity?.name}
          contactImageAlt={node.sulStudyBranch.suLibraryContactImg?.mediaImage.alt || ''}
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

export default Page;
