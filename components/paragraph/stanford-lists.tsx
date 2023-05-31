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
}


const ListParagraph = async ({headline, description, link, view, styles, fullWidth = true}: ListProps) => {
  const viewId: string | undefined = view?.resourceIdObjMeta?.drupal_internal__target_id;
  const displayId: string | undefined = view?.resourceIdObjMeta?.display_id;
  let args: string = view?.resourceIdObjMeta?.arguments ?? '';
  const itemsToDisplay: number = view?.resourceIdObjMeta?.items_to_display ?? -1;

  let viewDisplay;

  if (viewId && displayId) {
    /* @ts-expect-error Async Server Component */
    viewDisplay = <View
      viewId={viewId}
      displayId={displayId}
      itemsToDisplay={itemsToDisplay}
      args={args}
      emptyMessage={styles?.list_paragraph?.empty_message}
    />
  }

  if (styles?.list_paragraph?.hide_empty && (!viewDisplay || viewDisplay.type() === null)) {
    return null;
  }

  return (
    <div className="su-centered su-flex su-flex-col su-gap-xl">
      <div className="su-flex su-justify-between su-items-center su-mb-40">
        {headline &&
          <h2 className="su-m-0">{headline}</h2>
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