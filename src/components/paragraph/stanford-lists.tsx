import formatHtml from "@/lib/format-html"
import {DrupalLinkButton} from "@/components/patterns/link"
import {HTMLAttributes} from "react"
import {ParagraphStanfordList} from "@/lib/gql/__generated__/drupal.d"
import View from "@/components/views/view"
import {twMerge} from "tailwind-merge"
import {getParagraphBehaviors} from "@/components/paragraph/index"
import {ElementType} from "react"
import {getViewPagedItems, loadViewPage, VIEW_PAGE_SIZE} from "@/lib/gql/gql-views"

type Props = HTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordList
}

const ListParagraph = async ({paragraph}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)
  const viewId = paragraph.suListView?.view || ""
  const displayId = paragraph.suListView?.display || ""

  const limit =
    (viewId === "sul_branch_locations" && displayId === "branch_locations_table") ||
    (viewId === "sul_study_places" && displayId === "study_places_table")
      ? 999
      : paragraph.suListView?.pageSize || VIEW_PAGE_SIZE

  const pagedItems =
    viewId && displayId
      ? await getViewPagedItems(viewId, displayId, paragraph.suListView?.contextualFilter, limit)
      : {items: [], totalItems: 0}

  const {totalItems} = pagedItems
  const viewItems = limit ? pagedItems.items.slice(0, limit) : pagedItems.items

  const addLoadMore = ((limit || 3) >= VIEW_PAGE_SIZE && totalItems > viewItems.length) || displayId === "filtered_list"

  if (behaviors.list_paragraph?.hide_empty && viewItems.length === 0) return null

  const ListWrapper: ElementType =
    paragraph.suListHeadline && behaviors.list_paragraph?.heading_behavior !== "remove" ? "section" : "div"

  return (
    <ListWrapper
      className={twMerge("centered flex flex-col", behaviors.list_paragraph?.heading_behavior == "show" && "gap-xl")}
      aria-labelledby={ListWrapper === "section" ? paragraph.id : undefined}
    >
      {(behaviors.list_paragraph?.heading_behavior !== "remove" || paragraph.suListButton?.url) && (
        <div
          className={twMerge(
            "flex items-center justify-between",
            (behaviors.list_paragraph?.heading_behavior === "show" || paragraph.suListButton?.url) && "mb-20"
          )}
        >
          {paragraph.suListHeadline && behaviors.list_paragraph?.heading_behavior !== "remove" && (
            <h2
              id={paragraph.id}
              className={twMerge("m-0", behaviors.list_paragraph?.heading_behavior === "hide" && "sr-only")}
            >
              {paragraph.suListHeadline}
            </h2>
          )}

          {paragraph.suListButton?.url && (
            <DrupalLinkButton href={paragraph.suListButton.url} {...paragraph.suListButton.attributes}>
              {paragraph.suListButton.title}
            </DrupalLinkButton>
          )}
        </div>
      )}

      {paragraph.suListDescription?.processed && <div>{formatHtml(paragraph.suListDescription.processed)}</div>}

      {viewItems.length === 0 && behaviors.list_paragraph?.empty_message && (
        <p>{behaviors.list_paragraph.empty_message}</p>
      )}

      {viewItems.length > 0 && viewId && displayId && (
        <View
          items={viewItems}
          viewId={viewId}
          displayId={displayId}
          headingLevel={paragraph.suListHeadline ? "h3" : "h2"}
          loadPage={
            addLoadMore
              ? loadViewPage.bind(
                  null,
                  viewId,
                  displayId,
                  paragraph.suListView?.contextualFilter || [],
                  !!paragraph.suListHeadline,
                  VIEW_PAGE_SIZE
                )
              : undefined
          }
          totalItems={addLoadMore ? totalItems : viewItems.length}
        />
      )}
    </ListWrapper>
  )
}

export default ListParagraph
