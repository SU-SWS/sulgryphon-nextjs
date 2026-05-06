import HeaderGradientLine from "@/components/patterns/header-gradient-line"
import {Maybe} from "@/lib/gql/__generated__/drupal.d"

type Props = {
  heading: string
  headerTag?: "h2" | "h3" | "h4"
  headingGradient?: Maybe<boolean>
}

const SectionHeading = ({heading, headerTag = "h2", headingGradient}: Props) => (
  <div className="centered mb-40 flex w-full flex-row items-center justify-between gap-16">
    {headerTag === "h2" && <h2 className="mb-0 md:shrink-0">{heading}</h2>}
    {headerTag === "h3" && <h3 className="mb-0 md:shrink-0">{heading}</h3>}
    {headerTag === "h4" && <h4 className="mb-0 md:shrink-0">{heading}</h4>}
    {headingGradient && <HeaderGradientLine />}
  </div>
)

export default SectionHeading
