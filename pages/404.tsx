import {PageLayout} from "@/components/layouts/page-layout";
import {DrupalMenuLinkContent} from "next-drupal";

interface Custom404Props {

}

const Custom404 = ({...props}: Custom404Props) => {
  return (
    <PageLayout {...props}>
      <div id="main-content" className="su-cc">
        <h1>404</h1>
        <p>Page not found</p>
      </div>
    </PageLayout>
  )
}

export default Custom404;