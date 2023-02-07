import Link from "next/link";

import {StudyPlace} from "../../types/drupal";
import {MainContentLayout} from "@/components/layouts/main-content-layout";

interface StudyPlaceNodeProps {
  node: StudyPlace
}

export const NodeStudyPlace = ({node, ...props}: StudyPlaceNodeProps) => {
  return (
    <MainContentLayout pageTitle={node.title}>
      <article {...props}>

      </article>
    </MainContentLayout>
  )
}

export const NodeStudyPlaceListItem = ({node, ...props}: StudyPlaceNodeProps) => {
  return (
    <article {...props}>
      <Link href={node.path.alias}>
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </Link>
    </article>
  )
}

export const NodeStudyPlaceCard = ({node, ...props}: StudyPlaceNodeProps) => {
  return (
    <article className="su-shadow-lg" {...props}>
      <Link href={node.path.alias}
            className="su-no-underline su-text-cardinal-red hover:su-underline hover:su-text-black">
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </Link>
    </article>
  )
}
