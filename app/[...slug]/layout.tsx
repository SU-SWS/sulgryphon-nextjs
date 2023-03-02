import {getPathFromContext} from "../lib/drupal/utils";
import {getResourceByPath} from "../lib/drupal/get-resource";
import {getMenu} from "../lib/drupal/get-menu";
import InternalHeaderBanner from "../components/patterns/internal-header-banner";
import SecondaryMenu from "../components/menu/secondary-menu";
import Conditional from "../components/utils/conditional";

const NodeLayout = async ({children, ...props}) => {
  const path = getPathFromContext(props)
  const node = await getResourceByPath(path)
  const {tree} = await getMenu('main');
  const fullWidth = node.type === 'node--stanford_page' && node.layout_selection?.resourceIdObjMeta?.drupal_internal__target_id === 'stanford_basic_page_full';

  return (
    <div>
      <InternalHeaderBanner>
        <h1 className="su-cc su-pt-[110px] su-pb-50 lg:su-pb-20 su-relative su-text-white">{node.title}</h1>
      </InternalHeaderBanner>

      <Conditional showWhen={fullWidth}>
        <main>
          {children}
        </main>
      </Conditional>

      <Conditional showWhen={!fullWidth}>
        <div className="su-cc su-flex su-justify-between su-gap-2xl">
          <aside>
            <SecondaryMenu menuItems={tree}/>
          </aside>
          <main>
            {children}
          </main>
        </div>
      </Conditional>
    </div>
  )
}

export default NodeLayout;