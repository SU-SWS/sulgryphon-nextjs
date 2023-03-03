import {getResourceByPath} from "next-drupal/src/get-resource";
import HomePageNode from "./components/node/stanford-page/home-page/page-display";

export const revalidate = 60;

const Page = async () => {
  const node = await getResourceByPath('/');

  return (
    <div>
      <HomePageNode node={node}/>
    </div>
  )
}

export default Page