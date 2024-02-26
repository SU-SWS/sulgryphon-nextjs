import InterceptionModal from "@/components/patterns/modals/interception-modal";
import StudyPlaceFeatures from "@/components/node/sul-study-place/study-place-features";
import {graphqlClient} from "@/lib/gql/fetcher";
import {NodeUnion} from "@/lib/gql/__generated__/drupal.d";

const Page = async ({params: {uuid}}: { params: { uuid: string } }) => {
  const query = await graphqlClient().Node({uuid})
  const node = query.node as NodeUnion;
  if (!node) return;
  if (node.__typename !== 'NodeSulStudyPlace') return;

  // Filter out empty terms and deduplicate terms by their ID.
  const features = node.sulStudyFeatures?.filter((term, index, self) =>
      term.name?.length > 0 && index === self.findIndex(t => t.id === term.id)
  ) ?? [];

  return (
    <InterceptionModal aria-labelledby={node.id}>
      <StudyPlaceFeatures
        headingId={node.id}
        branchHours={node.sulStudyBranch.suLibraryHours}
        branchTitle={node.sulStudyBranch.title}
        branchUrl={node.sulStudyBranch.path}
        capacity={node.sulStudyCapacity?.name}
        contactImageAlt={node.sulStudyBranch.suLibraryContactImg?.mediaImage.alt|| ''}
        contactImageUrl={node.sulStudyBranch.suLibraryContactImg?.mediaImage.url}
        features={features.map(feature => ({id: feature.id, name: feature.name}))}
        type={node.sulStudyType.name}
      />
    </InterceptionModal>
  )
}
export default Page;