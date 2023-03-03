import {getResourceFromContext} from "../lib/drupal/get-resource";
import {getMenu} from "../lib/drupal/get-menu";
import InternalHeaderBanner from "../components/patterns/internal-header-banner";
import SecondaryMenu from "../components/menu/secondary-menu";
import Conditional from "../components/utils/conditional";
import {translatePathFromContext} from "../lib/drupal/translate-path";
import {DrupalNode} from "next-drupal";
import dynamic from "next/dynamic";

const LibraryHeader = dynamic(() => import("../components/node/sul-library/library-header"));

const NodeLayout = async ({children, ...context}) => {
  const path = await translatePathFromContext(context);
  const node = await getResourceFromContext<DrupalNode>(path.jsonapi.resourceName, context)

  const {tree} = await getMenu('main');
  const fullWidth = node.type === 'node--stanford_page' && node.layout_selection?.resourceIdObjMeta?.drupal_internal__target_id === 'stanford_basic_page_full';

  return (
    <div>
      <Conditional showWhen={node.type === 'node--sul_library'}>
        <LibraryHeader node={node}/>
      </Conditional>

      <Conditional showWhen={node.type != 'node--sul_library'}>
        <InternalHeaderBanner>
          <h1 className="su-cc su-pt-[110px] su-pb-50 lg:su-pb-20 su-relative su-text-white">{node.title}</h1>
        </InternalHeaderBanner>
      </Conditional>

      <Conditional showWhen={fullWidth}>
        <main>
          {children}
        </main>
      </Conditional>

      <Conditional showWhen={!fullWidth}>
        <div className="su-cc su-flex su-justify-between su-gap-2xl">
          <SecondaryMenu menuItems={tree}/>
          <main className="su-flex-1">
            {children}
          </main>
        </div>
      </Conditional>
    </div>
  )
}

export default NodeLayout;