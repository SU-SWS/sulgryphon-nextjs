import {PageLayout} from "@/components/layouts/page-layout";

export default function Custom404({...props}) {
  return (
    <PageLayout {...props}>
      <div className="su-cc">
        <h1>404</h1>
        <p>Page not found</p>
      </div>
    </PageLayout>
  )
}