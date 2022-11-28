import {PageLayout} from "@/components/layouts/page-layout";

export default function News({...props}) {
  return (
    <PageLayout {...props}>
      <div className="su-cc">
        <h1>News Page</h1>
      </div>
    </PageLayout>
  )
}

export async function getStaticProps(context) {
  return {props: {}};
}