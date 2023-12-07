import View from "@/components/views/view";
import formatHtml from "@/lib/format-html";
import {DrupalLinkButton} from "@/components/patterns/link";
import {DrupalLinkType, DrupalViewField} from "@/lib/drupal/drupal";
import {PropsWithoutRef} from "react";

interface ListProps extends PropsWithoutRef<any> {
  headline?: string
  description?: string
  link?: DrupalLinkType
  view?: DrupalViewField
  styles?: {
    list_paragraph: { hide_empty?: boolean, empty_message?: string }
    sul_list_styles: { link_display_style?: string }
  }
  fullWidth?: boolean
  headerId?: string
}


const ListParagraph = async ({headerId, headline, description, link, view, styles, fullWidth}: ListProps) => {
  if (headerId && link?.options?.attributes?.['aria-label'] && link?.options?.attributes?.['aria-label'] === headline) {
    link.options.attributes['aria-labelledby'] = headerId;
    delete link?.options?.attributes?.['aria-label'];
  }

  const viewId: string | undefined = view?.resourceIdObjMeta?.drupal_internal__target_id;
  const displayId: string | undefined = view?.resourceIdObjMeta?.display_id;
  let args: string = view?.resourceIdObjMeta?.arguments ?? '';
  const itemsToDisplay: number = view?.resourceIdObjMeta?.items_to_display ?? -1;

  let viewDisplay;
  const viewProps = {
    viewId,
    displayId,
    itemsToDisplay,
    args,
    emptyMessage: styles?.list_paragraph?.empty_message,
    hasHeading: !!headline
  }

  if (viewId && displayId) {
    viewDisplay = <View {...viewProps}/>
  }

  if (styles?.list_paragraph?.hide_empty && (!viewDisplay || viewDisplay.type() === null)) {
    return null;
  }

  return (
    <div className="centered flex flex-col gap-xl">
      <div className="flex justify-between items-center mb-40">
        {headline &&
          <h2 id={headerId} className="m-0">{headline}</h2>
        }

        {link &&
          <DrupalLinkButton href={link.url} {...link.options?.attributes}>
            {link.title}
          </DrupalLinkButton>
        }
      </div>

      {description &&
        <div>{formatHtml(description)}</div>
      }

      {viewDisplay}

    </div>
  )
}


export default ListParagraph;