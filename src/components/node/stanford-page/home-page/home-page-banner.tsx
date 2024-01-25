import Wave from "@/components/patterns/wave";
import SearchForm from "@/components/search/search-form";
import TodayHours from "./today-hours";
import {getResourceCollection} from "@/lib/drupal/get-resource";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import Link from "@/components/patterns/elements/drupal-link";
import {Library} from "@/lib/drupal/drupal";

const HomePageBanner = async () => {
  const params = new DrupalJsonApiParams();

  params.addFilter('su_library__hours', null, 'IS NOT NULL')
    .addInclude(['su_library__contact_img.field_media_image'])
    .addSort('title', 'ASC');

  const libraries = await getResourceCollection<Library>('node--sul_library', {params: params.getQueryObject()});

  // Trim all the fat.
  const trimmedLibraries = libraries.map(library => (
    {
      id: library.id,
      title: library.title,
      su_library__hours: library.su_library__hours,
      su_library__contact_img: library.su_library__contact_img
    }
  ))

  return (
    <header className="bg-black-true mb-100 relative">
      <div className="pb-20 centered relative z-10 top-50 md:top-100 md:px-50 min-h-[350px] md:min-h-[300px]">
        <div className="xl:mx-20 md:flex justify-between">
          <div className="text-white mb-40 md:w-1/3 lg:w-1/2">
            <h2>What can we help you find?</h2>
            <SearchForm action="/all" className="@container mb-20"/>
            <p>
              Search gives results from this site, <Link href="https://searchworks.stanford.edu/" className="text-white hocus:text-white hocus:no-underline">catalog</Link>
              , <Link href="https://searchworks.stanford.edu/articles" className="text-white hocus:text-white hocus:no-underline">articles+</Link>
              , <Link href="https://guides.library.stanford.edu/" className="text-white hocus:text-white hocus:no-underline">guides</Link>
              , <Link href="https://exhibits.stanford.edu/" className="text-white hocus:text-white hocus:no-underline">online exhibits</Link>
              , and <Link href="https://earthworks.stanford.edu/" className="text-white hocus:text-white hocus:no-underline">EarthWorks</Link>.
            </p>
          </div>

          <TodayHours libraries={trimmedLibraries} className="relative z-100 md:min-w-[300px] xl:min-w-[400px]"/>
        </div>
      </div>

      <div
        className="bg-right-bottom lg:bg-home-banner-sprinkles absolute h-2/3 w-3/4 bottom-0 right-0">
        <div className="bg-gradient-to-b from-black-true to-transparent absolute w-full h-full">
          <div className="bg-gradient-to-r from-black-true to-transparent absolute w-full h-full">
            {/*Empty elements. They are absolute positioned to provide visual affects only.*/}
          </div>
        </div>
      </div>

      <div className="relative">
        <Wave/>
      </div>
    </header>
  )
}

export default HomePageBanner;