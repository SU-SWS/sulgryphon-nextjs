import {useState} from "react";
import {GetStaticProps, GetStaticPropsResult} from "next"
import {DrupalMenuLinkContent, getMenu} from "next-drupal"
import Link from "next/link";
import {useRouter} from "next/router";

import {PageLayout} from "@/components/layouts/page-layout"
import {AppWrapperProvider} from "../../context/state";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import {useSiteSearch} from "@/lib/hooks/useSiteSearch";
import {SearchForm} from "@/components/search/search-form";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import Conditional from "@/components/simple/conditional";


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
  const [animationParent] = useAutoAnimate()
  const router = useRouter()
  const query = router.query?.q ?? '';
  const [displayedResults, setDisplayedResults] = useState([])
  const results = useSiteSearch(query, 999, items => setDisplayedResults(items.slice(0, 25)));

  return (
    <>
      <SearchForm className="su-border su-rounded su-mb-30 su-max-w-500 su-mx-auto" action="/search/website"/>
      <ul ref={animationParent} className="su-list-unstyled">
        {displayedResults.map(node =>
          <li key={node.id}>
            <Link href={node.path}>{node.title}</Link>
          </li>
        )}

        <Conditional showWhen={results.length > displayedResults.length}>
          <button className="su-button" onClick={() => setDisplayedResults(results.slice(0, displayedResults.length + 10))}>
            View More Results
          </button>
        </Conditional>
      </ul>
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
