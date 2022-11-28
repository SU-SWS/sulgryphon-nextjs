import {PageLayout} from "@/components/layouts/page-layout";

export default function Events({...props}) {
  return (
    <PageLayout {...props}>
      <div className="su-cc">
        <h1>Events Page</h1>
      </div>
    </PageLayout>
  )
}

export async function getStaticProps(context) {
  return {props: {}};
}