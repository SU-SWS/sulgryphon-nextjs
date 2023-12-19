import {Library, StanfordParagraph} from "@/lib/drupal/drupal";
import {ParagraphRows} from "@/components/paragraph/rows/rows";
import fetchComponents from "@/lib/fetch-components";
import LibraryAdditionalHours from "@/components/node/sul-library/library-additional-hours";
import formatHtml from "@/lib/format-html";

const SulLibrary = async ({node, ...props}: { node: Library }) => {
  node.su_library__paragraphs = await fetchComponents<StanfordParagraph>(node.su_library__paragraphs || []);
  node.su_library__paragraphs = node.su_library__paragraphs.filter(item => !!item?.id);
  const fullWidth = node.layout_selection?.resourceIdObjMeta?.drupal_internal__target_id === 'sul_library_full_width'

  return (
    <article className="mb-50 @container" {...props}>

      {(node.sul_library__a11y || node.su_library__hours) &&
        <div
          className="centered mb-50 flex flex-col @6xl:flex-row gap-[90px]">
          {node.sul_library__a11y &&
            <div className="order-last @6xl:order-first flex-1 basis-1/2">
              <div className="shadow-md py-20 px-30 w-fit mx-auto border border-black-10">
                <h2 className="text-m3">Accessibility</h2>
                {formatHtml(node.sul_library__a11y)}
              </div>
            </div>
          }

          {node.su_library__hours &&
            <LibraryAdditionalHours hoursId={node.su_library__hours}/>
          }
        </div>
      }

      <ParagraphRows items={node.su_library__paragraphs} fullWidth={fullWidth}/>
    </article>
  )
}

export default SulLibrary;