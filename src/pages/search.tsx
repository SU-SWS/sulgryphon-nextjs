import {GetStaticProps, GetStaticPropsResult} from "next"
import {DrupalMenuLinkContent, getMenu} from "next-drupal"

import {PageLayout} from "@/components/layouts/page-layout"
import {AppWrapperProvider} from "../context/state";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import {useRouter} from "next/router";
import {useSearchWorks} from "@/lib/hooks/useSearchWorks";
import {useExhibits} from "@/lib/hooks/useExhibits";
import Image from "next/image";
import Link from "next/link";
import {useEarthWorks} from "@/lib/hooks/useEarthWorks";

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
  const query = router.query?.q;
  if (!query) {
    return null;
  }
  return (
    <div className="su-grid su-grid-cols-2">
      <CatalogResults query={query}/>
      <ArticlesResults query={query}/>
      <GuidesResults query={query}/>
      <WebsiteResults query={query}/>
      <ExhibitsResults query={query}/>
      <EarthWorksResults query={query}/>
    </div>
  )
}

const CatalogResults = ({query}) => {
  // const results = useSearchWorks(query);
  return (
    <div>Catalog</div>
  )
}
const ArticlesResults = ({query}) => {
  // const results = useSearchWorks(query, true);
  return (
    <div>ArticlesResults</div>
  )
}
const GuidesResults = ({query}) => {
  return (
    <div>GuidesResults</div>
  )
}
const WebsiteResults = ({query}) => {
  return (
    <div>WebsiteResults</div>
  )
}
const ExhibitsResults = ({query}) => {
  const results = useExhibits(query)
  return (
    <div>
      <h2>Exhibits</h2>
      <p>Digital showcases for research and teaching.</p>
      <ul className="su-list-unstyled">
        {results.map(result =>
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
    </div>
  )
}
const EarthWorksResults = ({query}) => {
  // const results = useEarthWorks(query);
  return (
    <div>EarthworksResults</div>
  )
}

const ResultItem = ({title, subtitle, image, url}) => {
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
