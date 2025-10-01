import Rows from "@/components/paragraph/rows/rows"
import LibraryAdditionalHours from "@/components/node/sul-library/library-additional-hours"
import formatHtml from "@/lib/format-html"
import {NodeSulLibrary} from "@/lib/gql/__generated__/drupal.d"
import {redirect} from "next/navigation"
import LibraryHeader from "./library-header"
import InteriorPage from "@/components/layout/interior-page"
import NodePageMetadata from "@/components/node/node-page-metadata"
import {getFirstText} from "@/lib/text-tools"

const SulLibrary = async ({node, ...props}: {node: NodeSulLibrary}) => {
  if (node.sulLibraryExtUrl?.url) redirect(node.sulLibraryExtUrl.url)
  const fullWidth = node.layoutSelection?.id === "sul_library_full_width"

  const lastUpdated = new Date(node.changed.time as string).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  })

  return (
    <article {...props} className="mb-50 @container" aria-labelledby={node.id}>
      <NodePageMetadata
        pageTitle={node.title}
        metatags={node.metatag}
        backupDescription={getFirstText(node.suLibraryParagraphs)}
      />
      <LibraryHeader node={node} />

      {!fullWidth && (
        <InteriorPage node={node} currentPath={node.path || "#"}>
          {node.suLibraryHours && (
            <div className="centered mx-auto mb-50 w-full lg:max-w-[980px]">
              <LibraryAdditionalHours hoursId={node.suLibraryHours} />
            </div>
          )}

          {node.suLibraryParagraphs && <Rows components={node.suLibraryParagraphs} />}

          {node.sulLibraryA11y && (
            <div className="centered mx-auto mb-50 w-full py-20 lg:max-w-[980px]">
              <h2 className="type-3">Accessibility</h2>
              {formatHtml(node.sulLibraryA11y.processed)}
            </div>
          )}
        </InteriorPage>
      )}

      {fullWidth && (
        <>
          {node.suLibraryHours && (
            <div className="centered mx-auto mb-50 w-full lg:max-w-[980px]">
              <LibraryAdditionalHours hoursId={node.suLibraryHours} />
            </div>
          )}

          {node.suLibraryParagraphs && <Rows components={node.suLibraryParagraphs} fullWidth />}

          {node.sulLibraryA11y && (
            <div className="centered mx-auto mb-50 w-full py-20 lg:max-w-[980px]">
              <h2 className="type-3">Accessibility</h2>
              {formatHtml(node.sulLibraryA11y.processed)}
            </div>
          )}
        </>
      )}

      <footer className="rs-py-4 centered">Last updated {lastUpdated}</footer>
    </article>
  )
}

export default SulLibrary
