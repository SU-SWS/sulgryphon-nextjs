import InterceptionModal from "../../../interception-modal";
import {getResource} from "@/lib/drupal/get-resource";
import StudyPlaceFeatures from "@/components/node/sul-study-place/study-place-features";
import {DrupalTaxonomyTerm} from "next-drupal";

const Page = async ({params: {uuid}}) => {
  const node = await getResource('node--sul_study_place', uuid);
  // Filter out empty terms and deduplicate terms by their ID.
  const features: DrupalTaxonomyTerm[] = node.sul_study__features?.filter((term: DrupalTaxonomyTerm, index, self) =>
      term.name?.length > 0 && index === self.findIndex((t: DrupalTaxonomyTerm) => (
        t.id === term.id
      ))
  ) ?? [];
  return (
    <InterceptionModal>
      <StudyPlaceFeatures
        branchHours={node.sul_study__branch?.su_library__hours}
        branchTitle={node.sul_study__branch.title}
        branchUrl={node.sul_study__branch.path.alias}
        capacity={node.sul_study__capacity?.name}
        contactImageAlt={node.sul_study__branch.su_library__contact_img?.field_media_image?.resourceIdObjMeta?.alt ?? ''}
        contactImageUrl={node.sul_study__branch.su_library__contact_img?.field_media_image?.image_style_uri?.breakpoint_md_2x}
        features={features.map(feature => ({id: feature.id, name: feature.name}))}
        libCal={node.sul_study__libcal_id}
        type={node.sul_study__type.name}
      />
    </InterceptionModal>
  )
}
export default Page;