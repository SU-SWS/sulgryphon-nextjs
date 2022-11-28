import {PageLayout} from "@/components/layouts/page-layout";

export default function Custom500({...props}) {
  return (
    <PageLayout {...props}>
      <div className="su-cc">
        <h1>500</h1>
        <p>Internal server error</p>
      </div>
    </PageLayout>
  )
}