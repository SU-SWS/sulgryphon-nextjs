
import {ParagraphRows} from "@/components/paragraph/rows/rows";
import LibraryAdditionalHours from "@/components/node/sul-library/library-additional-hours";
import formatHtml from "@/lib/format-html";
import {NodeSulLibrary} from "@/lib/gql/__generated__/drupal.d";

const SulLibrary = async ({node, ...props}: { node: NodeSulLibrary }) => {

  const fullWidth = node.layoutSelection?.id === 'sul_library_full_width'

  return (
    <article className="mb-50 @container" {...props}>

      {(node.sulLibraryA11y || node.suLibraryHours) &&
        <div
          className="centered mb-50 flex flex-col @6xl:flex-row gap-[90px]">
          {node.sulLibraryA11y &&
            <div className="order-last @6xl:order-first flex-1 basis-1/2">
              <div className="shadow-md py-20 px-30 w-fit mx-auto border border-black-10">
                <h2 className="text-m3">Accessibility</h2>
                {formatHtml(node.sulLibraryA11y.processed)}
              </div>
            </div>
          }

          {node.suLibraryHours &&
            <LibraryAdditionalHours hoursId={node.suLibraryHours}/>
          }
        </div>
      }
      {node.suLibraryParagraphs &&
        <ParagraphRows items={node.suLibraryParagraphs} fullWidth={fullWidth}/>
      }
    </article>
  )
}

export default SulLibrary;