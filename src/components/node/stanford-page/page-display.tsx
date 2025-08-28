import Rows from "@/components/paragraph/rows/rows"
import {NodeStanfordPage} from "@/lib/gql/__generated__/drupal.d"
import StanfordPageMetadata from "@/components/node/stanford-page/stanford-page-metadata"
import InternalHeaderBanner from "@/components/patterns/internal-header-banner"
import RosetteIcon from "@/components/patterns/icons/RosetteIcon"
import InteriorPage from "@/components/layout/interior-page"

const StanfordPage = async ({node, ...props}: {node: NodeStanfordPage}) => {
  const fullWidth = node.layoutSelection?.id === "stanford_basic_page_full"

  const lastUpdated = new Date(node.changed.time as string).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  })

  return (
    <div {...props}>
      <StanfordPageMetadata node={node} />{" "}
      <InternalHeaderBanner>
        <h1
          id={node.id}
          className="relative mx-auto mb-10 mt-75 flex w-full max-w-[calc(100vw-10rem)] flex-row gap-20 p-0 md:max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)]"
        >
          <RosetteIcon width={60} height={60} />
          {node.title}
        </h1>
      </InternalHeaderBanner>
      {!fullWidth && (
        <InteriorPage node={node} currentPath={node.path || "#"}>
          {node.suPageComponents && <Rows components={node.suPageComponents} fullWidth={fullWidth} />}
          <footer className="rs-py-4 centered">Last updated {lastUpdated}</footer>
        </InteriorPage>
      )}
      {fullWidth && (
        <>
          {node.suPageComponents && <Rows components={node.suPageComponents} fullWidth={fullWidth} />}
          <footer className="rs-py-4 centered">Last updated {lastUpdated}</footer>
        </>
      )}
    </div>
  )
}

export default StanfordPage
