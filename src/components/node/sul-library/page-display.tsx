import {Library, StanfordParagraph} from "@/lib/drupal/drupal";
import {ParagraphRows} from "@/components/paragraph/rows/rows";
import fetchComponents from "@/lib/fetch-components";
import LibraryAdditionalHours from "@/components/node/sul-library/library-additional-hours";
import formatHtml from "@/lib/format-html";

const SulLibrary = async ({node, ...props}: { node: Library }) => {
  node.su_library__paragraphs = await fetchComponents<StanfordParagraph>(node.su_library__paragraphs || []);
  node.su_library__paragraphs = node.su_library__paragraphs.filter(item => !!item?.id);
  const fullWidth = node.layout_selection?.resourceIdObjMeta?.drupal_internal__target_id === 'sul_library_full_width'
  const containerClasses = ["mb-50", "lg:max-w-[980px]", "mx-auto", "centered"];
  const containerStyles = containerClasses.join(' ');

  return (
    <article className="mb-50 @container" {...props}>
      {node.su_library__hours &&
        <div className="mb-50 lg:max-w-[980px] mx-auto centered">
          <LibraryAdditionalHours hoursId={node.su_library__hours}/>
        </div>
      }

      <ParagraphRows items={node.su_library__paragraphs} fullWidth={fullWidth}/>

      {node.sul_library__a11y &&
        <div  className="mb-50 lg:max-w-[980px] mx-auto centered">
          <div className="shadow-md py-20 px-30 w-fit mx-auto border border-black-10">
            <h2 className="text-m3">Accessibility</h2>
            {formatHtml(node.sul_library__a11y)}
          </div>
        </div>
      }

    </article>
  )
}

export default SulLibrary;
