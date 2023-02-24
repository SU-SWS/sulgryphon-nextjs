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
  const results = useSiteSearch(query);
  const shownItems = displayedResults.length == 0 && results.length > 0 ? results.slice(0, 10) : displayedResults;

  return (
    <>
      <SearchForm className="su-border su-rounded su-mb-30 su-max-w-500 su-mx-auto" action="/search/website"/>
      <ol ref={animationParent}>
        {shownItems.map(node =>
          <li key={node.id}>
            <ResultItem
              path={node.path}
              title={node.title}
              imageId={node.image}
            />
          </li>
        )}

        <Conditional showWhen={results.length > shownItems.length}>
          <button className="su-button" onClick={() => setDisplayedResults(results.slice(0, shownItems.length + 10))}>
            View More Results
          </button>
        </Conditional>
      </ol>
    </>
  )
}

const ResultItem = ({path, title, imageId}) => {

  return (
    <div>
      <Link href={path}>{title}</Link>
    </div>
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
