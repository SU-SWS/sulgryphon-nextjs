
import {ParagraphRows} from "@/components/paragraph/rows/rows";
import LibraryAdditionalHours from "@/components/node/sul-library/library-additional-hours";
import formatHtml from "@/lib/format-html";
import {NodeSulLibrary} from "@/lib/gql/__generated__/drupal.d";

const SulLibrary = async ({node, ...props}: { node: NodeSulLibrary }) => {

  const fullWidth = node.layoutSelection?.id === 'sul_library_full_width'

  return (
    <article className="mb-50 @container" {...props}>

      {node.suLibraryHours &&
        <div className="mb-50 lg:max-w-[980px] w-full mx-auto centered">
          <LibraryAdditionalHours hoursId={node.suLibraryHours}/>
        </div>
      }

      {node.suLibraryParagraphs &&
        <ParagraphRows items={node.suLibraryParagraphs} fullWidth={fullWidth}/>
      }

      {node.sulLibraryA11y &&
        <div  className="mb-50 lg:max-w-[980px] w-full mx-auto centered py-20">
          <h2 className="text-m3">Accessibility</h2>
          {formatHtml(node.sulLibraryA11y.processed)}
        </div>
      }
    </article>
  )
}

export default SulLibrary;
