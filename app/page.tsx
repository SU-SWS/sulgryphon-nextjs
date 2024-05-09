import {Metadata} from "next";
import {getNodeMetadata} from "./[...slug]/metadata";
import HomePageBanner from "@/components/node/stanford-page/home-page/home-page-banner";
import {ParagraphRows} from "@/components/paragraph/rows/rows";
import {notFound} from "next/navigation";
import {getEntityFromPath} from "@/lib/gql/fetcher";
import {NodeStanfordPage} from "@/lib/gql/__generated__/drupal.d";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = false;
export const dynamic = 'force-static';

export const generateMetadata = async (): Promise<Metadata> => {
  const {entity} = await getEntityFromPath<NodeStanfordPage>('/');
  return entity ? getNodeMetadata(entity) : {};
}

const Page = async () => {
  const {entity} = await getEntityFromPath<NodeStanfordPage>('/')
  const updated = entity.changed.time;
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const lastUpdated  = new Date(updated).toLocaleDateString(undefined, options)

  if (!entity) notFound();

  return (
    <main id="main-content" className="mb-50">
      <HomePageBanner/>
      {entity.suPageComponents &&
        <ParagraphRows items={entity.suPageComponents} fullWidth/>
      }
      <div className="centered rs-pb-4">Last updated {lastUpdated}</div>
    </main>
  )
}

export default Page