import Conditional from "@/components/utils/conditional";
import InternalHeaderBanner from "@/components/patterns/internal-header-banner";
import SecondaryMenu from "@/components/menu/secondary-menu";
import dynamic from "next/dynamic";
import {DrupalMenuLinkContent, DrupalNode} from "next-drupal";
import {Library} from "@/lib/drupal/drupal";
import {getMenu} from "@/lib/drupal/get-menu";
import {getResourceFromContext} from "@/lib/drupal/get-resource";
import {notFound} from "next/navigation";
import {translatePathFromContext} from "@/lib/drupal/translate-path";
import {ReactNodeLike} from "prop-types";
import {ExclamationCircleIcon} from "@heroicons/react/20/solid";

const LibraryHeader = dynamic(() => import("../components/node/sul-library/library-header"));

const getNode = async (context): Promise<[DrupalNode, boolean]> => {
  const path = await translatePathFromContext(context);
  if (!path || !path.jsonapi) {
    notFound();
  }
  const node = await getResourceFromContext<DrupalNode>(path.jsonapi.resourceName, context)
  const fullWidth = node.type === 'node--stanford_page' && node.layout_selection?.resourceIdObjMeta?.drupal_internal__target_id === 'stanford_basic_page_full';
  return [node, fullWidth];
}

const Layout = async ({children, ...context}: { children: ReactNodeLike }) => {
  let tree: DrupalMenuLinkContent[] = [];
  try {
    ({tree} = await getMenu('main'));
  } catch (e) {
  }

  let node: DrupalNode, fullWidth: boolean = false;
  try {
    [node, fullWidth] = await getNode(context);
  } catch (e) {
    notFound();
  }

  return (
    <div>
      <Conditional showWhen={node.type === 'node--sul_library'}>
        <LibraryHeader node={node as Library}/>
      </Conditional>

      <Conditional showWhen={node.type != 'node--sul_library'}>
        <InternalHeaderBanner>
          <h1 className="su-max-w-1500 su-mx-auto su-px-40 2xl:su-px-0 su-pt-[110px] su-pb-50 lg:su-pb-20 su-relative su-text-white">{node.title}</h1>
        </InternalHeaderBanner>
      </Conditional>

      <Conditional showWhen={node.status != undefined && !node.status}>
        <div className="su-bg-illuminating-light su-py-30 su-mb-20">
          <div className="su-max-w-1500 su-mx-auto su-px-40 su-text-m2 su-flex su-gap-lg">
            <ExclamationCircleIcon width={40}/>
            Unpublished Page
          </div>
        </div>
      </Conditional>

      <Conditional showWhen={fullWidth}>
        <main id="main-content">
          {children}
        </main>
      </Conditional>

      <Conditional showWhen={!fullWidth}>
        <div className="su-max-w-1500 su-mx-auto su-px-40 2xl:su-px-0 2xl:su-px-0 su-flex su-flex-col lg:su-flex-row su-justify-between su-gap-2xl">
          <SecondaryMenu menuItems={tree}/>
          <main id="main-content" className="su-flex-1">
            {children}
          </main>
        </div>
      </Conditional>
    </div>
  )
}

export default Layout;