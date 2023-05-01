import {getResourceByPath} from "next-drupal/src/get-resource";
import HomePageNode from "@/components/node/stanford-page/home-page/page-display";
import {BasicPage} from "@/lib/drupal/drupal";
import {Metadata} from "next";
import {getNodeMetadata} from "./[...slug]/metadata";
import Header from "@/components/layout/header";
import LibraryFooter from "@/components/layout/library-footer";
import GlobalFooter from "@/components/layout/global-footer";

export const revalidate = 60;

export const generateMetadata = async (): Promise<Metadata> => {
  const node: BasicPage = await getResourceByPath('/');
  return getNodeMetadata(node);
}

const Page = async () => {
  const node: BasicPage = await getResourceByPath('/');
  return (

    <div className="su-grid su-grid-rows-1 su-min-h-screen">
      <div>
        <nav>
          <a className="su-skiplink" href="#main-content">Skip to main content</a>
        </nav>

        {/* @ts-expect-error Async Server Component */}
        <Header/>

        <main id="main-content su-mb-50">
          {/* @ts-expect-error Async Server Component */}
          <HomePageNode node={node}/>
        </main>
      </div>

      <footer className="su-row-start-2 su-row-end-3">
        <LibraryFooter/>
        <GlobalFooter/>
      </footer>
    </div>
  )
}

export default Page