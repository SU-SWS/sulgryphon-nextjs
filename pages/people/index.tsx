import {PageLayout} from "@/components/layouts/page-layout";

export default function People({...props}) {
  return (
    <PageLayout {...props}>
      <div className="su-cc">
        <h1>People Page</h1>
      </div>
    </PageLayout>
  )
}

export async function getStaticProps(context) {
  return {props: {}};
}