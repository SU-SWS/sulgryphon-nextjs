import formatHtml from "@/lib/format-html";
import {DrupalLinkButton} from "@/components/patterns/link";
import {HTMLAttributes} from "react";
import {Maybe, Link as LinkType, ViewReference} from "@/lib/gql/__generated__/drupal";
import {ParagraphBehaviors} from "@/lib/drupal/drupal";

type ListProps = HTMLAttributes<HTMLDivElement> & {
  headline?: Maybe<string>
  description?: Maybe<string>
  link?: Maybe<LinkType>
  view?: Maybe<ViewReference>
  behaviors?: ParagraphBehaviors
  headerId?: string
}


const ListParagraph = async ({headerId, headline, description, link, view, behaviors}: ListProps) => {

  const linkAttributes: Record<string, string> = {};
  if (link?.attributes?.ariaLabel) linkAttributes['link-attributes'] = link.attributes.ariaLabel;

  if (headerId && link?.attributes?.ariaLabel && link.attributes.ariaLabel === headline) {
    linkAttributes['aria-labelledby'] = headerId;
    delete linkAttributes['aria-label'];
  }

  const viewId = view?.view;
  const displayId = view?.display;

  let viewItems = viewId && displayId ? await getViewItems(viewId, displayId, view?.contextualFilter) : [];
  // let viewItems = (viewId && displayId) ? await getViewResults<StanfordNode>(viewId, displayId, paragraph.suListView?.contextualFilter) : [];
  if (view?.pageSize) {
    viewItems = viewItems.slice(0, view.pageSize)
  }

  if (behaviors?.list_paragraph?.hide_empty && viewItems.length === 0) return null;

  return (
    <div className="centered flex flex-col gap-xl">
      <div className="flex justify-between items-center mb-40">
        {headline &&
          <h2 id={headerId} className="m-0">{headline}</h2>
        }

        {link?.url &&
          <DrupalLinkButton href={link.url} {...linkAttributes}>
            {link.title}
          </DrupalLinkButton>
        }
      </div>

      {description &&
        <div>{formatHtml(description)}</div>
      }

      View goes here
    </div>
  )
}

const getViewItems = async (view: string, display: string, filters?: ViewReference["contextualFilter"]) => {
  return [];
}


export default ListParagraph;