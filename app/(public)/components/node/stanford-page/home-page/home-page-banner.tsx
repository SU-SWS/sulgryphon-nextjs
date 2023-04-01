import Wave from "@/components/patterns/wave";
import SearchForm from "@/components/search/search-form";
import TodayHours from "./today-hours";
import {getResourceCollection} from "@/lib/drupal/get-resource";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import Link from "next/link";

const HomePageBanner = async () => {
  const params = new DrupalJsonApiParams();
  params.addFilter('su_library__hours', null, 'IS NOT NULL');
  const libraries = await getResourceCollection('node--sul_library', {params: params.getQueryObject()});
  const libraryItems = libraries.map(node => ({
    id: node.id,
    title: node.title,
    su_library__hours: node.su_library__hours,
    su_library__contact_img: node.su_library__contact_img
  }))

  return (
    <div className="su-bg-black-true su-mb-100 su-relative">
      <div className="su-cc su-relative su-z-10 su-top-50 md:su-top-100 md:su-mx-40 md:su-min-h-[300px]">
        <div className="xl:su-mx-20 md:su-flex su-justify-between">
          <div className="su-text-white su-mb-40 md:su-w-1/3 lg:su-w-1/2">
            <h2>What can we help you find?</h2>
            <SearchForm action="https://library.stanford.edu/all" className="su-mb-20"/>
            <p>
              Search gives results from this site, <Link href="https://searchworks.stanford.edu/" className="su-text-white hocus:su-text-white hocus:su-no-underline">catalog</Link>
              , <Link href="https://searchworks.stanford.edu/articles" className="su-text-white hocus:su-text-white hocus:su-no-underline">articles+</Link>
              , <Link href="https://guides.library.stanford.edu/" className="su-text-white hocus:su-text-white hocus:su-no-underline">guides</Link>
              , <Link href="https://exhibits.stanford.edu/" className="su-text-white hocus:su-text-white hocus:su-no-underline">online exhibits</Link>
              , and <Link href="https://earthworks.stanford.edu/" className="su-text-white hocus:su-text-white hocus:su-no-underline">EarthWorks</Link>.
            </p>
          </div>

          <TodayHours libraries={libraryItems} className="su-relative su-z-100 su-min-w-[300px] xl:su-min-w-[400px]"/>
        </div>
      </div>

      <div
        className="su-bg-right-bottom lg:su-bg-home-banner-sprinkles su-absolute su-h-2/3 su-w-3/4 su-bottom-0 su-right-0">
        <div className="su-bg-gradient-to-b su-from-black-true su-to-transparent su-absolute su-w-full su-h-full">
          <div className="su-bg-gradient-to-r su-from-black-true su-to-transparent su-absolute su-w-full su-h-full">
            {/*Empty elements. They are absolute positioned to provide visual affects only.*/}
          </div>
        </div>
      </div>

      <div className="su-relative">
        <Wave/>
      </div>
    </div>
  )
}


export default HomePageBanner;