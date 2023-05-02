import {Library} from "@/lib/drupal/drupal";
import {ParagraphRows} from "@/components/paragraph/rows/rows";
import fetchComponents from "@/lib/fetch-components";
import LibraryAdditionalHours from "@/components/node/sul-library/library-additional-hours";
import {DrupalParagraph} from "next-drupal";
import formatHtml from "@/lib/format-html";

const SulLibrary = async ({node, ...props}: { node: Library }) => {
  node.su_library__paragraphs = await fetchComponents(node.su_library__paragraphs ?? []) as DrupalParagraph[];
  node.su_library__paragraphs = node.su_library__paragraphs.filter(item => item?.id?.length > 0);
  const fullWidth = node.layout_selection?.resourceIdObjMeta?.drupal_internal__target_id === 'sul_library_full_width'

  return (
    <article className="su-mb-50 su-@container" {...props}>

      {(node.sul_library__a11y || node.su_library__hours) &&
        <div
          className={"su-max-w-1500 su-w-full su-mx-auto su-mb-50 su-flex su-flex-col @6xl:su-flex-row su-gap-2xl" + (fullWidth ? " su-px-40 3xl:su-px-0" : "")}>
          {node.sul_library__a11y &&
            <div className="su-order-last lg:su-order-first su-flex-1">
              <h2 className="su-text-m3">Accessibility</h2>
              {formatHtml(node.sul_library__a11y)}
            </div>
          }

          <LibraryAdditionalHours hoursId={node.su_library__hours}/>
        </div>
      }

      <ParagraphRows items={node.su_library__paragraphs} fullWidth={fullWidth}/>
    </article>
  )
}

export default SulLibrary;