import {getResource} from "@/lib/drupal/get-resource";
import StudyPlaceFeatures from "@/components/node/sul-study-place/study-place-features";
import InternalHeaderBanner from "@/components/patterns/internal-header-banner";
import {StudyPlace} from "@/lib/drupal/drupal";

export const metadata = {
  title: 'Study Place Features',
  robots: {
    index: false
  }
}

const Page = async ({params: {uuid}}: {params: {uuid: string}}) => {
  const node = await getResource<StudyPlace>('node--sul_study_place', uuid);
  // Filter out empty terms and deduplicate terms by their ID.
  const features = node.sul_study__features?.filter((term, index, self) =>
      term.name?.length > 0 && index === self.findIndex((t) => (
        t.id === term.id
      ))
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