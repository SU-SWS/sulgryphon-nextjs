import Wave from "@/components/patterns/wave"
import SearchForm from "@/components/search/search-form"
import TodayHours from "./today-hours"
import Link from "@/components/patterns/elements/drupal-link"
import {graphqlClient} from "@/lib/gql/fetcher"
import {NodeSulLibrary} from "@/lib/gql/__generated__/drupal"

const HomePageBanner = async () => {
  const librariesQuery = await graphqlClient({next: {tags: ["node:sul_library"]}}).Libraries()
  const libraries = librariesQuery.nodeSulLibraries.nodes.filter(node => !!node.suLibraryHours) as NodeSulLibrary[]

  return (
    <header className="relative mb-50 bg-black-true">
      <div className="centered relative top-50 z-10 min-h-[350px] pb-20 md:top-100 md:min-h-[300px] md:px-50">
        <div className="justify-between md:flex xl:mx-20">
          <div className="mb-40 text-white md:w-1/3 lg:w-1/2">
            <h2>What can we help you find?</h2>
            <SearchForm action="/all" className="mb-20 @container" />
            <p>
              Search gives results from this site,{" "}
              <Link href="https://searchworks.stanford.edu/" className="text-white hocus:text-white hocus:no-underline">
                catalog
              </Link>
              ,&nbsp;
              <Link
                href="https://searchworks.stanford.edu/articles"
                className="text-white hocus:text-white hocus:no-underline"
              >
                articles+
              </Link>
              ,&nbsp;
              <Link
                href="https://guides.library.stanford.edu/"
                className="text-white hocus:text-white hocus:no-underline"
              >
                guides
              </Link>
              ,&nbsp;
              <Link href="https://exhibits.stanford.edu/" className="text-white hocus:text-white hocus:no-underline">
                online exhibits
              </Link>
              , and&nbsp;
              <Link href="https://earthworks.stanford.edu/" className="text-white hocus:text-white hocus:no-underline">
                EarthWorks
              </Link>
              .
            </p>
          </div>

          <TodayHours libraries={libraries} className="z-100 relative md:min-w-[300px] xl:min-w-[400px]" />
        </div>
      </div>

      <div className="absolute bottom-0 right-0 h-2/3 w-3/4 bg-right-bottom lg:bg-home-banner-sprinkles">
        <div className="absolute h-full w-full bg-gradient-to-b from-black-true to-transparent">
          <div className="absolute h-full w-full bg-gradient-to-r from-black-true to-transparent">
            {/*Empty elements. They are absolute positioned to provide visual affects only.*/}
          </div>
        </div>
      </div>

      <div className="relative">
        <Wave />
      </div>
    </header>
  )
}

export default HomePageBanner
