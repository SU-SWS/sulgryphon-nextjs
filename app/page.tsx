import {getResourceByPath} from "next-drupal/src/get-resource";
import HomePageNode from "@/components/node/stanford-page/home-page/page-display";
import {BasicPage} from "@/lib/drupal/drupal";

export const revalidate = 60;

const getHomePageNode = async (): Promise<BasicPage> => {
  return await getResourceByPath('/');
}

const Page = async () => {
  const node = await getHomePageNode();

  return (
    <div>
      {/* @ts-ignore */}
      <HomePageNode node={node}/>
    </div>
  )
}

export default Page