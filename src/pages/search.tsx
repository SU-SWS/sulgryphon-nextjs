import {GetStaticProps, GetStaticPropsResult} from "next"
import {DrupalMenuLinkContent, getMenu} from "next-drupal"
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import {useId} from "react";

import {PageLayout} from "@/components/layouts/page-layout"
import {AppWrapperProvider} from "../context/state";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import {useExhibits} from "@/lib/hooks/useExhibits";
import {useSiteSearch} from "@/lib/hooks/useSiteSearch";
import Conditional from "@/components/simple/conditional";
import {SearchForm} from "@/components/search/search-form";
import {useLibGuideSearch} from "@/lib/hooks/useLibGuideSearch";

interface SearchPageProps {
  menuItems: DrupalMenuLinkContent[]
}

const Search = ({menuItems, ...props}: SearchPageProps) => {
  return (
    <AppWrapperProvider menuItems={menuItems}>
      <PageLayout {...props}>
        <MainContentLayout pageTitle="Search">
          <SearchResults/>
        </MainContentLayout>
      </PageLayout>
    </AppWrapperProvider>
  )
}
export default Search;

const SearchResults = () => {
  const router = useRouter()
  const query = router.query?.q ?? '';
  const id = useId();

  return (
    <>
      <SearchForm className="su-border su-rounded su-mb-30 su-max-w-500 su-mx-auto"/>

      <div className="su-grid su-grid-cols-2 su-gap-xl">
        <CatalogResults query={query} id={id + '-catalog'}/>
        <ArticlesResults query={query} id={id + '-catalog'}/>
        <GuidesResults query={query} id={id + '-catalog'}/>
        <WebsiteResults query={query} id={id + '-catalog'}/>
        <ExhibitsResults query={query} id={id + '-catalog'}/>
        <EarthWorksResults query={query} id={id + '-catalog'}/>
      </div>
    </>
  )
}

const CatalogResults = ({query, ...props}) => {
  // const results = useSearchWorks(query);
  return (
    <div className="su-border su-p-30 su-border-t-4 su-border-t-cardinal-red" {...props}>
      <h2>Catalog</h2>
      <p>Physical and digital books, media, journals, archives, and databases.</p>
    </div>
  )
}
const ArticlesResults = ({query, ...props}) => {
  // const results = useSearchWorks(query, true);
  return (
    <div className="su-border su-p-30 su-border-t-4 su-border-t-cardinal-red" {...props}>
      <h2>Articles+</h2>
      <p>Journal articles, e-books, and other e-resources.</p>
    </div>
  )
}
const GuidesResults = ({query, ...props}) => {
  const results = useLibGuideSearch(query);
  return (
    <div className="su-border su-p-30 su-border-t-4 su-border-t-cardinal-red" {...props}>
      <h2>Guides</h2>
      <p>Course- and topic-based guides to collections, tools, and services.</p>
      <Conditional showWhen={results.length == 0}>
        <p>No guide results found.</p>
      </Conditional>

      <Conditional showWhen={results.length > 0}>
        <ul className="su-list-unstyled">
          {results.slice(0, 3).map(guide =>
            <li key={guide.id}>
              <Link href={guide.url}>{guide.title}</Link>
            </li>
          )}
        </ul>
      </Conditional>

    </div>
  )
}

const WebsiteResults = ({query, ...props}) => {
  const results = useSiteSearch(query);
  return (
    <div className="su-border su-p-30 su-border-t-4 su-border-t-cardinal-red" {...props}>
      <h2>Library Websites</h2>
      <p>Library info; guides & content by subject specialists</p>

      <Conditional showWhen={results.length == 0}>
        <p>No website results found.</p>
      </Conditional>

      <Conditional showWhen={results.length > 0}>
        <ul className="su-list-unstyled">
          {results.slice(0, 3).map(result =>
            <li key={'exhibits-' + result.id} className="su-grid su-grid-cols-2">
              <Link href={result.path}>{result.title}</Link>
            </li>
          )}
        </ul>
      </Conditional>
    </div>
  )
}
const ExhibitsResults = ({query, ...props}) => {
  const results = useExhibits(query)
  return (
    <div className="su-border su-p-30 su-border-t-4 su-border-t-cardinal-red" {...props}>
      <h2>Exhibits</h2>
      <p>Digital showcases for research and teaching.</p>
      <Conditional showWhen={results.length == 0}>
        <p>No exhibits results found.</p>
      </Conditional>

      <Conditional showWhen={results.length > 0}>
        <ul className="su-list-unstyled">
          {results.slice(0, 3).map(result =>
            <li key={'exhibits-' + result.id} className="su-grid su-grid-cols-2">
              <ResultItem
                title={result.title}
                subtitle={result.subtitle}
                url={`https://exhibits.stanford.edu/${result.id}`}
                image={result.thumbnail_url}
              />
            </li>
          )}
        </ul>
      </Conditional>
    </div>
  )
}
const EarthWorksResults = ({query, ...props}) => {
  // const results = useEarthWorks(query);
  return (
    <div className="su-border su-p-30 su-border-t-4 su-border-t-cardinal-red" {...props}>
      <h2>EarthWorks</h2>
      <p>Geospatial content, including GIS datasets, digitized maps, and census data.</p>
    </div>
  )
}

const ResultItem = ({title, url, subtitle, image}) => {
  return (
    <>
      <div className="su-max-w-200 su-overflow-hidden su-aspect-[4/3] su-relative" aria-hidden="true">
        <Image
          src={image}
          alt=""
          className="su-object-cover su-object-center"
          fill={true}
        />
      </div>
      <div>
        <h3>
          <Link href={url}>
            {title}
          </Link>
        </h3>
        {subtitle}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<{ menuItems: DrupalMenuLinkContent[] }> = async (): Promise<GetStaticPropsResult<SearchPageProps>> => {
  const {items} = await getMenu('main');

  return {
    props: {
      menuItems: items
    },
    revalidate: 60
  }
}
