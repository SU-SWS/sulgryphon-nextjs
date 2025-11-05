import {Maybe} from "@/lib/gql/__generated__/drupal.d"
import {clsx} from "clsx"

const StanfordSpacer = ({size}: {size?: Maybe<"spacer-reduced" | "spacer-minimal" | string>}) => {
  return (
    <div
      className={clsx({
        "min-h-40": !size,
        "min-h-20": size === "su-spacer-reduced",
        "min-h-10": size === "su-spacer-minimal",
      })}
    ></div>
  )
}
export default StanfordSpacer
