import {getResource} from "@/lib/drupal/get-resource";
import StudyPlaceFeatures from "@/components/node/sul-study-place/study-place-features";
import {DrupalTaxonomyTerm} from "next-drupal";
import InternalHeaderBanner from "@/components/patterns/internal-header-banner";

export const metadata = {
  title: 'Study Place Features',
  robots: {
    index: false
  }
}

const Page = async ({params: {uuid}}, ...context) => {
  const node = await getResource('node--sul_study_place', uuid);
  // Filter out empty terms and deduplicate terms by their ID.
  const features: DrupalTaxonomyTerm[] = node.sul_study__features?.filter((term: DrupalTaxonomyTerm, index, self) =>
      term.name?.length > 0 && index === self.findIndex((t: DrupalTaxonomyTerm) => (
        t.id === term.id
      ))
  ) ?? [];

  return (
    <main id="main-content">
      <InternalHeaderBanner>
        <h1 className="su-max-w-1500 su-mx-auto su-px-50 3xl:su-px-0 su-pt-[110px] su-pb-50 lg:su-pb-20 su-relative su-text-white">{node.title} Features</h1>
      </InternalHeaderBanner>
      <div className="su-max-w-1500 su-px-50 3xl:su-px-0 su-mx-auto">
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
      </div>
    </main>
  )
}

export default Page;